import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, profiles, subscriptions } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        { error: "Email and password (min 6 chars) required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Create user
    const [user] = await db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        passwordHash,
      })
      .returning({ id: users.id });

    // Create empty profile with slug derived from email
    const slug = email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");

    await db.insert(profiles).values({
      userId: user.id,
      slug,
    });

    // Create default subscription
    await db.insert(subscriptions).values({
      userId: user.id,
      plan: "standard",
    });

    // Create session (sets cookie)
    await createSession(user.id);

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
