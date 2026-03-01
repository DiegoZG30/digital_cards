import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  profiles,
  testimonials,
  certificates,
  galleryImages,
} from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [profile] = await db
      .select()
      .from(profiles)
      .where(and(eq(profiles.slug, slug), eq(profiles.isPublished, true)))
      .limit(1);

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

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

    return NextResponse.json({
      ...profile,
      testimonials: profileTestimonials,
      certificates: profileCertificates,
      gallery_images: profileGallery,
    });
  } catch (error) {
    console.error("Public profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
