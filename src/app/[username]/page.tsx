import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import {
  profiles,
  templates,
  testimonials,
  certificates,
  galleryImages,
} from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { PublicCardClient } from "./client";
import {
  processTemplateFull,
  type ProcessableCardData,
} from "@/lib/processTemplate";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  const [profile] = await db
    .select({
      fullName: profiles.fullName,
      title: profiles.title,
      company: profiles.company,
      profileImageUrl: profiles.profileImageUrl,
      bio: profiles.bio,
    })
    .from(profiles)
    .where(and(eq(profiles.slug, username), eq(profiles.isPublished, true)))
    .limit(1);

  if (!profile) {
    return { title: "Tarjeta no encontrada - Biztec" };
  }

  const title = `${profile.fullName || username} - Biztec`;
  const description =
    profile.bio ||
    `${profile.title || ""} ${profile.company ? `en ${profile.company}` : ""}`.trim() ||
    "Tarjeta digital profesional";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: profile.profileImageUrl ? [profile.profileImageUrl] : [],
    },
  };
}

export default async function PublicCardPage({ params }: Props) {
  const { username } = await params;

  // Fetch profile by slug
  const [profile] = await db
    .select()
    .from(profiles)
    .where(and(eq(profiles.slug, username), eq(profiles.isPublished, true)))
    .limit(1);

  if (!profile) {
    notFound();
  }

  // Use published snapshot if available, otherwise fallback to live data
  const publishedSnapshot = profile.publishedData as Record<string, unknown> | null;

  // ─── Fetch related data + template ──────────────────────────────────────────
  let profileTestimonials: Array<{
    id: string;
    name: string;
    content: string;
    rating: number;
    videoUrl: string | null;
    imageUrl?: string | null;
    licenseNumber?: string | null;
    sortOrder?: number | null;
  }>;
  let profileCertificates: Array<{
    id: string;
    name: string;
    imageUrl: string | null;
    licenseNumber: string | null;
    sortOrder?: number | null;
  }>;
  let profileGallery: Array<{
    id: string;
    imageUrl: string;
    caption: string | null;
    sortOrder?: number | null;
  }>;
  let templateRow: { htmlContent: string; sector: string | null } | null;

  if (publishedSnapshot) {
    // Extract related data directly from the snapshot
    profileTestimonials = (
      (publishedSnapshot.testimonials as Array<Record<string, unknown>>) || []
    ).map((t) => ({
      id: (t.id as string) || crypto.randomUUID(),
      name: (t.name as string) || "",
      content: (t.content as string) || "",
      rating: (t.rating as number) ?? 5,
      videoUrl: (t.videoUrl as string | null) || null,
    }));

    profileCertificates = (
      (publishedSnapshot.certificates as Array<Record<string, unknown>>) || []
    ).map((c) => ({
      id: (c.id as string) || crypto.randomUUID(),
      name: (c.name as string) || "",
      imageUrl: (c.imageUrl as string | null) || null,
      licenseNumber: (c.licenseNumber as string | null) || null,
    }));

    profileGallery = (
      (publishedSnapshot.gallery_images as Array<Record<string, unknown>>) || []
    ).map((g) => ({
      id: (g.id as string) || crypto.randomUUID(),
      imageUrl: (g.imageUrl as string) || "",
      caption: (g.caption as string | null) || null,
    }));

    // Only fetch the template HTML (not stored in snapshot)
    const snapshotTemplateId = publishedSnapshot.selectedTemplateId as string | null;
    templateRow = snapshotTemplateId
      ? await db
          .select({
            htmlContent: templates.htmlContent,
            sector: templates.sector,
          })
          .from(templates)
          .where(eq(templates.id, snapshotTemplateId))
          .limit(1)
          .then((rows) => rows[0] ?? null)
      : null;
  } else {
    // Backward compatibility: fetch from related tables
    const [dbTestimonials, dbCertificates, dbGallery, dbTemplate] =
      await Promise.all([
        db
          .select()
          .from(testimonials)
          .where(eq(testimonials.profileId, profile.id))
          .orderBy(testimonials.sortOrder),
        db
          .select()
          .from(certificates)
          .where(eq(certificates.profileId, profile.id))
          .orderBy(certificates.sortOrder),
        db
          .select()
          .from(galleryImages)
          .where(eq(galleryImages.profileId, profile.id))
          .orderBy(galleryImages.sortOrder),
        profile.selectedTemplateId
          ? db
              .select({
                htmlContent: templates.htmlContent,
                sector: templates.sector,
              })
              .from(templates)
              .where(eq(templates.id, profile.selectedTemplateId))
              .limit(1)
              .then((rows) => rows[0] ?? null)
          : Promise.resolve(null),
      ]);

    profileTestimonials = dbTestimonials;
    profileCertificates = dbCertificates;
    profileGallery = dbGallery;
    templateRow = dbTemplate;
  }

  // ─── Data source: snapshot fields (camelCase) or live profile ──────────────
  const src: Record<string, unknown> = publishedSnapshot || (profile as unknown as Record<string, unknown>);

  // Map data to component-expected types
  const socialLinksData =
    ((src.socialLinks ?? src.social_links ?? {}) as Record<string, string>);
  const socialLinksArray = Object.entries(socialLinksData)
    .filter(([_, url]) => url && (url as string).trim() !== "")
    .map(([network, url]) => ({ network, url: url as string }));

  const mappedTestimonials = profileTestimonials.map((t) => ({
    id: t.id,
    quote: t.content,
    author: t.name,
    rating: t.rating,
  }));

  const mappedCertificates = profileCertificates.map((c) => ({
    id: c.id,
    title: c.name,
    imageUrl: c.imageUrl || "",
  }));

  const mappedGallery = profileGallery.map((g) => ({
    id: g.id,
    url: g.imageUrl,
  }));

  const customStyles =
    ((src.customStyles ?? src.custom_styles ?? {}) as Record<string, string>);
  const customData =
    ((src.customData ?? src.custom_data ?? {}) as Record<string, unknown>);

  const srcVideoUrl = (src.videoUrl ?? src.video_url ?? null) as string | null;
  const isPro = !!(
    srcVideoUrl ||
    mappedGallery.length > 0 ||
    mappedTestimonials.length > 0 ||
    mappedCertificates.length > 0
  );
  const theme = customStyles?.theme || "dark";
  const themeClass =
    theme === "light"
      ? "theme-light"
      : theme === "dark-blue"
        ? "theme-dark-blue"
        : "";

  // ─── Helper to read from src with camelCase (snapshot) or live profile ─────
  const str = (camel: string): string | null =>
    (src[camel] as string | null) ?? null;

  // ─── Process template server-side if available ────────────────────────────
  let processedHtml: string | null = null;

  if (templateRow?.htmlContent) {
    // Build the CardData shape expected by processTemplateFull
    const cardData: ProcessableCardData = {
      profile: {
        fullName: str("fullName") || "",
        title: str("title") || "",
        company: str("company") || "",
        profileImage: str("profileImageUrl") || undefined,
      },
      slug: profile.slug || undefined,
      contact: {
        phone: str("phone") || undefined,
        whatsapp: str("whatsapp") || undefined,
        email: str("email") || undefined,
      },
      social: {
        facebook: socialLinksData.facebook || undefined,
        instagram: socialLinksData.instagram || undefined,
        linkedin: socialLinksData.linkedin || undefined,
        twitter: socialLinksData.twitter || undefined,
        tiktok: socialLinksData.tiktok || undefined,
        youtube: socialLinksData.youtube || undefined,
      },
      bio: str("bio") || undefined,
      videoUrl: str("videoUrl") || undefined,
      testimonials: profileTestimonials.map((t) => ({
        name: t.name,
        content: t.content,
        rating: t.rating,
        videoUrl: t.videoUrl || undefined,
      })),
      certificates: profileCertificates.map((c) => ({
        name: c.name,
        imageUrl: c.imageUrl || undefined,
        licenseNumber: c.licenseNumber || undefined,
      })),
      gallery: profileGallery.map((g) => ({
        imageUrl: g.imageUrl,
        caption: g.caption || undefined,
      })),
      cta:
        str("ctaText") && str("ctaUrl")
          ? { text: str("ctaText")!, url: str("ctaUrl")! }
          : undefined,
      bookingUrl: str("bookingUrl") || undefined,
      bookingType: (str("bookingType") as "popup" | "external") || undefined,
      websiteUrl: str("websiteUrl") || undefined,
      reviewUrl: str("reviewUrl") || undefined,
      backgroundImage: str("backgroundImageUrl") || undefined,
      sectionTitle: str("sectionTitle") || undefined,
      services: (src.services as Array<{ icon: string; name: string }>) || undefined,
      ctaButtonText: str("ctaButtonText") || undefined,
      // Spread custom_data so any extra fields (referBtnUrl, hours, etc.) are available
      ...customData,
    };

    // Use the template's own sector (more accurate than profile.sector)
    const srcSector = (src.sector as string | null) || null;
    const sector = templateRow.sector || srcSector || "general";

    processedHtml = processTemplateFull({
      htmlContent: templateRow.htmlContent,
      cardData,
      sector,
      isPro,
      customStyles: {
        primaryColor: customStyles.primaryColor,
        secondaryColor: customStyles.secondaryColor,
      },
    });
  }

  return (
    <PublicCardClient
      profile={{
        id: profile.id,
        full_name: str("fullName"),
        title: str("title"),
        company: str("company"),
        bio: str("bio"),
        profile_image_url: str("profileImageUrl"),
        cover_image_url: str("coverImageUrl"),
        phone: str("phone"),
        email: str("email"),
        whatsapp: str("whatsapp"),
        video_url: str("videoUrl"),
        slug: profile.slug,
        sector: (src.sector as string | null) ?? null,
        services: (src.services as Array<{
          icon: string;
          name: string;
        }>) || null,
        custom_data: customData,
        custom_styles: customStyles,
      }}
      socialLinks={socialLinksArray}
      testimonials={mappedTestimonials}
      certificates={mappedCertificates}
      gallery={mappedGallery}
      isPro={isPro}
      themeClass={themeClass}
      username={username}
      processedTemplateHtml={processedHtml}
    />
  );
}
