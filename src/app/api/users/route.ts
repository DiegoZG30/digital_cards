import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, subscriptions, profiles } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    await requireAdmin();

    const result = await db
      .select({
        id: users.id,
        email: users.email,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
        plan: subscriptions.plan,
        slug: profiles.slug,
        fullName: profiles.fullName,
      })
      .from(users)
      .leftJoin(subscriptions, eq(users.id, subscriptions.userId))
      .leftJoin(profiles, eq(users.id, profiles.userId));

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
    console.error("Users GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
