import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { requireAuth } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await requireAuth();

    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, session.userId))
      .limit(1);

    return NextResponse.json(sub ?? { plan: "standard", expires_at: null });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Subscription GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}
