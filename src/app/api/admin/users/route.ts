import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, subscriptions } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    await requireAdmin();

    const result = await db
      .select({
        id: users.id,
        email: users.email,
        created_at: users.createdAt,
        plan: subscriptions.plan,
        expires_at: subscriptions.expiresAt,
      })
      .from(users)
      .leftJoin(subscriptions, eq(users.id, subscriptions.userId))
      .orderBy(desc(users.createdAt));

    // Format as nested subscription object (what the frontend expects)
    const formatted = result.map((row) => ({
      id: row.id,
      email: row.email,
      created_at: row.created_at?.toISOString() || "",
      subscription: row.plan
        ? {
            plan: row.plan,
            expires_at: row.expires_at?.toISOString() || null,
          }
        : undefined,
    }));

    return NextResponse.json(formatted);
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
    console.error("Admin users GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
