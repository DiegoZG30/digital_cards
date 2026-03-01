import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { profiles, analyticsEvents } from "@/lib/db/schema";
import { requireAuth } from "@/lib/auth/session";
import { eq, sql, desc } from "drizzle-orm";

export async function GET() {
  try {
    const session = await requireAuth();

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

    // Get recent events for this profile
    const events = await db
      .select()
      .from(analyticsEvents)
      .where(eq(analyticsEvents.profileId, profile.id))
      .orderBy(desc(analyticsEvents.createdAt))
      .limit(1000);

    // Aggregate stats
    const totalViews = events.filter((e) => e.eventType === "view").length;
    const totalClicks = events.filter((e) => e.eventType === "click").length;

    // Group by day for chart data
    const dailyStats = await db
      .select({
        date: sql<string>`DATE(${analyticsEvents.createdAt})`.as("date"),
        views:
          sql<number>`COUNT(*) FILTER (WHERE ${analyticsEvents.eventType} = 'view')`.as(
            "views"
          ),
        clicks:
          sql<number>`COUNT(*) FILTER (WHERE ${analyticsEvents.eventType} = 'click')`.as(
            "clicks"
          ),
      })
      .from(analyticsEvents)
      .where(eq(analyticsEvents.profileId, profile.id))
      .groupBy(sql`DATE(${analyticsEvents.createdAt})`)
      .orderBy(sql`DATE(${analyticsEvents.createdAt})`);

    // Button click breakdown
    const buttonClicks = await db
      .select({
        buttonName: analyticsEvents.buttonName,
        count: sql<number>`COUNT(*)`.as("count"),
      })
      .from(analyticsEvents)
      .where(eq(analyticsEvents.profileId, profile.id))
      .groupBy(analyticsEvents.buttonName)
      .orderBy(desc(sql`COUNT(*)`));

    return NextResponse.json({
      total_views: totalViews,
      total_clicks: totalClicks,
      daily_stats: dailyStats,
      button_clicks: buttonClicks,
      recent_events: events.slice(0, 50),
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Analytics GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
