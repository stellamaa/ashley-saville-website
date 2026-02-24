import { NextRequest, NextResponse } from "next/server";

const ARTLOGIC_ACCOUNT_ID = process.env.ARTLOGIC_ACCOUNT_ID?.trim();
const ARTLOGIC_API_KEY = process.env.ARTLOGIC_API_KEY;

function getSignupUrl(): string | null {
  if (!ARTLOGIC_ACCOUNT_ID) return null;
  return `https://app.artlogic.net/${ARTLOGIC_ACCOUNT_ID}/public/api/mailings/signup`;
}

export async function POST(request: NextRequest) {
  const signupUrl = getSignupUrl();
  const missing: string[] = [];
  if (!ARTLOGIC_API_KEY) missing.push("ARTLOGIC_API_KEY");
  if (!ARTLOGIC_ACCOUNT_ID) missing.push("ARTLOGIC_ACCOUNT_ID");
  if (missing.length > 0 || !signupUrl) {
    console.error("Missing env:", missing.join(", "));
    return NextResponse.json(
      {
        error: "Newsletter signup is not configured.",
        hint:
          "Set ARTLOGIC_API_KEY and ARTLOGIC_ACCOUNT_ID (letters only, e.g. ashleysaville) in your deployment environment variables, then redeploy.",
      },
      { status: 503 }
    );
  }

  const apiKey = ARTLOGIC_API_KEY as string;
  const signupUrlFinal = signupUrl as string;

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
  params.set("api_key", apiKey);
  params.set("email", email);
  if (firstname) params.set("firstname", firstname);
  if (lastname) params.set("lastname", lastname);

  try {
    const res = await fetch(signupUrlFinal, {
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
