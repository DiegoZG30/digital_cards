import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscriptions, users } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    await requireAdmin();

    const result = await db
      .select({
        id: subscriptions.id,
        userId: subscriptions.userId,
        email: users.email,
        plan: subscriptions.plan,
        expiresAt: subscriptions.expiresAt,
        createdAt: subscriptions.createdAt,
      })
      .from(subscriptions)
      .innerJoin(users, eq(subscriptions.userId, users.id));

    return NextResponse.json(result);
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
    console.error("Admin subscriptions GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscriptions" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const { user_id, plan, expires_at } = await request.json();

    if (!user_id || !plan) {
      return NextResponse.json(
        { error: "user_id and plan required" },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(subscriptions)
      .set({
        plan,
        expiresAt: expires_at ? new Date(expires_at) : null,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.userId, user_id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Subscription not found" },
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
    console.error("Admin subscription PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
