import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { eq, and, gt } from "drizzle-orm";
import { db } from "@/lib/db";
import { sessions, users } from "@/lib/db/schema";

const SESSION_COOKIE = "session_token";
const SESSION_DURATION_DAYS = 30;

/**
 * Create a new session for the given user and set the session cookie.
 * Returns the raw token (useful for testing, but the cookie is the
 * primary transport mechanism).
 */
export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);

  await db.insert(sessions).values({
    userId,
    token,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60,
  });

  return token;
}

/**
 * Read the session cookie, look up the session + user in the database,
 * and return the authenticated user info or null.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const result = await db
    .select({
      sessionId: sessions.id,
      userId: users.id,
      email: users.email,
      role: users.role,
      isActive: users.isActive,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())))
    .limit(1);

  if (result.length === 0) return null;

  const user = result[0];
  if (!user.isActive) return null;

  return {
    sessionId: user.sessionId,
    userId: user.userId,
    email: user.email,
    role: user.role as "admin" | "pro" | "standard",
  };
}

/**
 * Delete the current session from the database and clear the cookie.
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await db.delete(sessions).where(eq(sessions.token, token));
    cookieStore.delete(SESSION_COOKIE);
  }
}

/**
 * Helper for API routes / server actions that require authentication.
 * Throws if no valid session exists.
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

/**
 * Helper for admin-only routes / server actions.
 * Throws if no valid session or if the user is not an admin.
 */
export async function requireAdmin() {
  const session = await requireAuth();
  if (session.role !== "admin") {
    throw new Error("Forbidden");
  }
  return session;
}
