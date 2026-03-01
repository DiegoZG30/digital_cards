import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  profiles,
  testimonials,
  certificates,
  galleryImages,
} from "@/lib/db/schema";
import { requireAuth } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await requireAuth();

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
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Profile GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await request.json();

    const [profile] = await db
      .select({ id: profiles.id })
      .from(profiles)
      .where(eq(profiles.userId, session.userId))
      .limit(1);

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    // Extract related data from body
    const {
      testimonials: newTestimonials,
      certificates: newCertificates,
      gallery_images: newGallery,
      ...profileData
    } = body;

    // Update profile fields
    await db
      .update(profiles)
      .set({
        ...profileData,
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, profile.id));

    // Batch update related tables (delete all + re-insert)
    if (newTestimonials !== undefined) {
      await db
        .delete(testimonials)
        .where(eq(testimonials.profileId, profile.id));
      if (newTestimonials.length > 0) {
        await db.insert(testimonials).values(
          newTestimonials.map((t: Record<string, unknown>, i: number) => ({
            profileId: profile.id,
            name: t.name as string,
            content: t.content as string,
            rating: (t.rating as number) ?? 5,
            videoUrl: (t.video_url ?? t.videoUrl ?? null) as string | null,
            sortOrder: i,
          }))
        );
      }
    }

    if (newCertificates !== undefined) {
      await db
        .delete(certificates)
        .where(eq(certificates.profileId, profile.id));
      if (newCertificates.length > 0) {
        await db.insert(certificates).values(
          newCertificates.map((c: Record<string, unknown>, i: number) => ({
            profileId: profile.id,
            name: c.name as string,
            imageUrl: (c.image_url ?? c.imageUrl ?? null) as string | null,
            licenseNumber: (c.license_number ?? c.licenseNumber ?? null) as
              | string
              | null,
            sortOrder: i,
          }))
        );
      }
    }

    if (newGallery !== undefined) {
      await db
        .delete(galleryImages)
        .where(eq(galleryImages.profileId, profile.id));
      if (newGallery.length > 0) {
        await db.insert(galleryImages).values(
          newGallery.map((g: Record<string, unknown>, i: number) => ({
            profileId: profile.id,
            imageUrl: (g.image_url ?? g.imageUrl) as string,
            caption: (g.caption ?? null) as string | null,
            sortOrder: i,
          }))
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Profile PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
