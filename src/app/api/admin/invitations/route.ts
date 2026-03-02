import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { users, profiles, subscriptions } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const { email, password, role } = await request.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        { error: "Email y password (min 6 chars) requeridos" },
        { status: 400 }
      );
    }

    if (!["pro", "standard"].includes(role)) {
      return NextResponse.json(
        { error: "Role debe ser 'pro' o 'standard'" },
        { status: 400 }
      );
    }

    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email ya registrado" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const [user] = await db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        passwordHash,
        role,
      })
      .returning({ id: users.id });

    const slug = email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");

    await db.insert(profiles).values({ userId: user.id, slug });
    await db.insert(subscriptions).values({ userId: user.id, plan: role });

    return NextResponse.json({ success: true, userId: user.id });
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
    console.error("Create user error:", error);
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await requireAdmin();
    const allUsers = await db
      .select({
        id: users.id,
        email: users.email,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(users.createdAt);

    return NextResponse.json({ users: allUsers });
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
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
