import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { analyticsEvents } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  try {
    const { profile_id, event_type, button_name } = await request.json();

    if (!profile_id || !event_type) {
      return NextResponse.json(
        { error: "profile_id and event_type required" },
        { status: 400 }
      );
    }

    await db.insert(analyticsEvents).values({
      profileId: profile_id,
      eventType: event_type,
      buttonName: button_name ?? null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
