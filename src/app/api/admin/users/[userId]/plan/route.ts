import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscriptions, users } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await requireAdmin();

    const { userId } = await params;
    const body = await request.json();

    // Accept either { role } or { plan } - normalize to a single value
    const value = body.role || body.plan;

    if (!value || !["standard", "pro"].includes(value)) {
      return NextResponse.json(
        { error: "Invalid role/plan. Must be 'standard' or 'pro'" },
        { status: 400 }
      );
    }

    // Update the user's role in the users table
    await db
      .update(users)
      .set({ role: value, updatedAt: new Date() })
      .where(eq(users.id, userId));

    // Also upsert the subscription plan to keep them in sync
    const existing = await db
      .select({ id: subscriptions.id })
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(subscriptions)
        .set({ plan: value, updatedAt: new Date() })
        .where(eq(subscriptions.userId, userId));
    } else {
      await db.insert(subscriptions).values({
        userId,
        plan: value,
      });
    }

    return NextResponse.json({ success: true, role: value, plan: value });
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
    console.error("Admin update role/plan error:", error);
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 }
    );
  }
}
