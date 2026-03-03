import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "site-auth";
const AUTH_VALUE = "unlocked";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const PASSWORD = "ArtLover";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password, redirect } = body;

  if (password !== PASSWORD) {
    return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  }

  const redirectTo = typeof redirect === "string" && redirect.startsWith("/") ? redirect : "/";
  const response = NextResponse.json({ ok: true, redirect: redirectTo });
  response.cookies.set(AUTH_COOKIE, AUTH_VALUE, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return response;
}
