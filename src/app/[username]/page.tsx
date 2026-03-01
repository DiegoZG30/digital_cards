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

  // Fetch related data + template in parallel
  const [profileTestimonials, profileCertificates, profileGallery, templateRow] =
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
      // Fetch the selected template if it exists
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

  // Map data to component-expected types
  const socialLinksData =
    (profile.socialLinks as Record<string, string>) || {};
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
    (profile.customStyles as Record<string, string>) || {};
  const customData =
    (profile.customData as Record<string, unknown>) || {};
  const isPro = !!(
    profile.videoUrl ||
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

  // ─── Process template server-side if available ────────────────────────────
  let processedHtml: string | null = null;

  if (templateRow?.htmlContent) {
    // Build the CardData shape expected by processTemplateFull
    const cardData: ProcessableCardData = {
      profile: {
        fullName: profile.fullName || "",
        title: profile.title || "",
        company: profile.company || "",
        profileImage: profile.profileImageUrl || undefined,
      },
      slug: profile.slug || undefined,
      contact: {
        phone: profile.phone || undefined,
        whatsapp: profile.whatsapp || undefined,
        email: profile.email || undefined,
      },
      social: {
        facebook: socialLinksData.facebook || undefined,
        instagram: socialLinksData.instagram || undefined,
        linkedin: socialLinksData.linkedin || undefined,
        twitter: socialLinksData.twitter || undefined,
        tiktok: socialLinksData.tiktok || undefined,
        youtube: socialLinksData.youtube || undefined,
      },
      bio: profile.bio || undefined,
      videoUrl: profile.videoUrl || undefined,
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
        profile.ctaText && profile.ctaUrl
          ? { text: profile.ctaText, url: profile.ctaUrl }
          : undefined,
      bookingUrl: profile.bookingUrl || undefined,
      bookingType: (profile.bookingType as "popup" | "external") || undefined,
      websiteUrl: profile.websiteUrl || undefined,
      reviewUrl: profile.reviewUrl || undefined,
      backgroundImage: profile.backgroundImageUrl || undefined,
      sectionTitle: profile.sectionTitle || undefined,
      services: (profile.services as Array<{ icon: string; name: string }>) || undefined,
      ctaButtonText: profile.ctaButtonText || undefined,
      // Spread custom_data so any extra fields (referBtnUrl, hours, etc.) are available
      ...customData,
    };

    // Use the template's own sector (more accurate than profile.sector)
    const sector = templateRow.sector || profile.sector || "general";

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
        full_name: profile.fullName,
        title: profile.title,
        company: profile.company,
        bio: profile.bio,
        profile_image_url: profile.profileImageUrl,
        cover_image_url: profile.coverImageUrl,
        phone: profile.phone,
        email: profile.email,
        whatsapp: profile.whatsapp,
        video_url: profile.videoUrl,
        slug: profile.slug,
        sector: profile.sector,
        services: profile.services as Array<{
          icon: string;
          name: string;
        }> | null,
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
