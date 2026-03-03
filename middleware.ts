import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "site-auth";
const AUTH_VALUE = "unlocked";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to unlock page and admin (Sanity Studio) without auth
  if (pathname.startsWith("/admin") || pathname === "/unlock") {
    return NextResponse.next();
  }

  // Allow static assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(AUTH_COOKIE)?.value;
  if (authCookie === AUTH_VALUE) {
    return NextResponse.next();
  }

  const unlockUrl = new URL("/unlock", request.url);
  unlockUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(unlockUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|icon.png|favicon.ico).*)"],
};
