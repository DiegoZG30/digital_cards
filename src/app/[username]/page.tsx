import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import {
  profiles,
  testimonials,
  certificates,
  galleryImages,
} from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { PublicCardClient } from "./client";

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

  // Fetch related data in parallel
  const [profileTestimonials, profileCertificates, profileGallery] =
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
    />
  );
}
