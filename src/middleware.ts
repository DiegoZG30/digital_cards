import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedPaths = ["/my-card", "/my-analytics", "/admin"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (pathname === "/login" && sessionToken) {
    return NextResponse.redirect(new URL("/my-card", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my-card/:path*",
    "/my-analytics/:path*",
    "/admin/:path*",
    "/login",
  ],
};
