import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, subscriptions, profiles } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { eq, sql, desc, count } from "drizzle-orm";

export async function GET() {
  try {
    await requireAdmin();

    // Count users by plan
    const usersByPlan = await db
      .select({
        plan: subscriptions.plan,
        count: count(),
      })
      .from(users)
      .leftJoin(subscriptions, eq(users.id, subscriptions.userId))
      .groupBy(subscriptions.plan);

    const totalUsers = usersByPlan.reduce((sum, row) => sum + row.count, 0);
    const proUsers = usersByPlan.find((r) => r.plan === "pro")?.count || 0;
    const standardUsers =
      usersByPlan.find((r) => r.plan === "standard")?.count || 0;
    const trialUsers =
      usersByPlan.find((r) => r.plan === null)?.count || 0;

    // Published cards
    const [publishedResult] = await db
      .select({ count: count() })
      .from(profiles)
      .where(eq(profiles.isPublished, true));
    const publishedCards = publishedResult?.count || 0;

    // MRR calculation
    const paidProUsers = proUsers;
    const paidStandardUsers = standardUsers;
    const proMRR = paidProUsers * 49;
    const standardMRR = paidStandardUsers * 29;
    const totalMRR = proMRR + standardMRR;

    // Recent signups
    const recentSignups = await db
      .select({
        id: users.id,
        email: users.email,
        created_at: users.createdAt,
        plan: subscriptions.plan,
      })
      .from(users)
      .leftJoin(subscriptions, eq(users.id, subscriptions.userId))
      .orderBy(desc(users.createdAt))
      .limit(10);

    return NextResponse.json({
      totalUsers,
      proUsers,
      standardUsers,
      trialUsers,
      paidProUsers,
      paidStandardUsers,
      publishedCards,
      totalMRR,
      proMRR,
      standardMRR,
      recentSignups: recentSignups.map((s) => ({
        id: s.id,
        email: s.email,
        created_at: s.created_at?.toISOString() || "",
        plan: s.plan || "trial",
      })),
    });
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
    console.error("Admin stats GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
