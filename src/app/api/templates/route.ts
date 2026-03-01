import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { templates } from "@/lib/db/schema";
import { getSession, requireAdmin } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await getSession();
    const isAdmin = session?.role === "admin";

    const result = isAdmin
      ? await db.select().from(templates).orderBy(templates.name)
      : await db
          .select()
          .from(templates)
          .where(eq(templates.isActive, true))
          .orderBy(templates.name);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Templates GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();

    const [template] = await db
      .insert(templates)
      .values({
        name: body.name,
        sector: body.sector ?? "general",
        description: body.description,
        htmlContent: body.html_content ?? body.htmlContent,
        thumbnailUrl: body.thumbnail_url ?? body.thumbnailUrl,
        editorSchema: body.editor_schema ?? body.editorSchema,
      })
      .returning();

    return NextResponse.json(template, { status: 201 });
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
    console.error("Templates POST error:", error);
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}
