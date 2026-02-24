import { NextRequest, NextResponse } from "next/server";

const ARTLOGIC_SIGNUP_URL = process.env.ARTLOGIC_SIGNUP_URL;
const ARTLOGIC_API_KEY = process.env.ARTLOGIC_API_KEY;

export async function POST(request: NextRequest) {
  if (!ARTLOGIC_API_KEY || !ARTLOGIC_SIGNUP_URL) {
    console.error("Missing ARTLOGIC_API_KEY or ARTLOGIC_SIGNUP_URL");
    return NextResponse.json(
      { error: "Newsletter signup is not configured." },
      { status: 503 }
    );
  }

  let body: { email?: string; firstname?: string; lastname?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) {
    return NextResponse.json(
      { error: "Email is required." },
      { status: 400 }
    );
  }

  const firstname = typeof body.firstname === "string" ? body.firstname.trim() : "";
  const lastname = typeof body.lastname === "string" ? body.lastname.trim() : "";

  const params = new URLSearchParams();
  params.set("api_key", ARTLOGIC_API_KEY);
  params.set("email", email);
  if (firstname) params.set("firstname", firstname);
  if (lastname) params.set("lastname", lastname);

  try {
    const res = await fetch(ARTLOGIC_SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Artlogic signup error:", res.status, text);
      return NextResponse.json(
        { error: "Could not subscribe. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Artlogic signup request failed:", err);
    return NextResponse.json(
      { error: "Could not subscribe. Please try again later." },
      { status: 502 }
    );
  }
}
