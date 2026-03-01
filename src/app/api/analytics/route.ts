import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { profiles, analyticsEvents } from "@/lib/db/schema";
import { requireAuth } from "@/lib/auth/session";
import { eq, sql, desc, and, gte } from "drizzle-orm";

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

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Total views (all time)
    const [totalViewsResult] = await db
      .select({ count: sql<number>`COUNT(*)`.as("count") })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.profileId, profile.id),
          eq(analyticsEvents.eventType, "view")
        )
      );
    const totalViews = totalViewsResult?.count || 0;

    // Monthly views (last 30 days)
    const [monthlyViewsResult] = await db
      .select({ count: sql<number>`COUNT(*)`.as("count") })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.profileId, profile.id),
          eq(analyticsEvents.eventType, "view"),
          gte(analyticsEvents.createdAt, thirtyDaysAgo)
        )
      );
    const monthlyViews = monthlyViewsResult?.count || 0;

    // Monthly clicks (last 30 days)
    const [monthlyClicksResult] = await db
      .select({ count: sql<number>`COUNT(*)`.as("count") })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.profileId, profile.id),
          eq(analyticsEvents.eventType, "click"),
          gte(analyticsEvents.createdAt, thirtyDaysAgo)
        )
      );
    const monthlyClicks = monthlyClicksResult?.count || 0;

    // Daily views (last 30 days) formatted as [{date: "01 feb", views: N}]
    const dailyViewsRaw = await db
      .select({
        date: sql<string>`TO_CHAR(${analyticsEvents.createdAt}, 'DD Mon')`.as(
          "date"
        ),
        views: sql<number>`COUNT(*)`.as("views"),
      })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.profileId, profile.id),
          eq(analyticsEvents.eventType, "view"),
          gte(analyticsEvents.createdAt, thirtyDaysAgo)
        )
      )
      .groupBy(
        sql`DATE(${analyticsEvents.createdAt})`,
        sql`TO_CHAR(${analyticsEvents.createdAt}, 'DD Mon')`
      )
      .orderBy(sql`DATE(${analyticsEvents.createdAt})`);

    const dailyViews = dailyViewsRaw.map((d) => ({
      date: d.date.toLowerCase(),
      views: Number(d.views),
    }));

    // Clicks by button formatted as [{button: "WhatsApp", clicks: N}]
    const buttonClicksRaw = await db
      .select({
        button: analyticsEvents.buttonName,
        clicks: sql<number>`COUNT(*)`.as("clicks"),
      })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.profileId, profile.id),
          eq(analyticsEvents.eventType, "click")
        )
      )
      .groupBy(analyticsEvents.buttonName)
      .orderBy(desc(sql`COUNT(*)`));

    const clicksByButton = buttonClicksRaw
      .filter((b) => b.button !== null)
      .map((b) => ({
        button: b.button as string,
        clicks: Number(b.clicks),
      }));

    // Top button
    const topButton = clicksByButton.length > 0 ? clicksByButton[0].button : "-";

    return NextResponse.json({
      totalViews,
      monthlyViews,
      monthlyClicks,
      topButton,
      dailyViews,
      clicksByButton,
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
