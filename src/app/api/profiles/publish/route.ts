import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  profiles,
  testimonials,
  certificates,
  galleryImages,
} from "@/lib/db/schema";
import { requireAuth } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

export async function POST() {
  try {
    const session = await requireAuth();

    // Fetch current profile
    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, session.userId))
      .limit(1);

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
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

    // Build the published snapshot with all profile fields
    const snapshot = {
      fullName: profile.fullName,
      title: profile.title,
      company: profile.company,
      profileImageUrl: profile.profileImageUrl,
      coverImageUrl: profile.coverImageUrl,
      phone: profile.phone,
      whatsapp: profile.whatsapp,
      email: profile.email,
      bio: profile.bio,
      videoUrl: profile.videoUrl,
      ctaText: profile.ctaText,
      ctaUrl: profile.ctaUrl,
      bookingUrl: profile.bookingUrl,
      bookingType: profile.bookingType,
      websiteUrl: profile.websiteUrl,
      reviewUrl: profile.reviewUrl,
      backgroundImageUrl: profile.backgroundImageUrl,
      sectionTitle: profile.sectionTitle,
      ctaButtonText: profile.ctaButtonText,
      slug: profile.slug,
      sector: profile.sector,
      selectedTemplateId: profile.selectedTemplateId,
      services: profile.services,
      socialLinks: profile.socialLinks,
      customStyles: profile.customStyles,
      customData: profile.customData,
      testimonials: profileTestimonials,
      certificates: profileCertificates,
      gallery_images: profileGallery,
    };

    const now = new Date();

    // Save snapshot, set published flag and timestamp
    await db
      .update(profiles)
      .set({
        publishedData: snapshot,
        isPublished: true,
        publishedAt: now,
        updatedAt: now,
      })
      .where(eq(profiles.id, profile.id));

    return NextResponse.json({
      success: true,
      publishedAt: now.toISOString(),
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Profile publish error:", error);
    return NextResponse.json(
      { error: "Error al publicar" },
      { status: 500 }
    );
  }
}
