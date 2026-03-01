import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { templates } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    const [updated] = await db
      .update(templates)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(templates.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }
    console.error("Template PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update template" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const [deleted] = await db
      .delete(templates)
      .where(eq(templates.id, id))
      .returning({ id: templates.id });

    if (!deleted) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }
    console.error("Template DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete template" },
      { status: 500 }
    );
  }
}
