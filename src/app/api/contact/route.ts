import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  business?: string;
  siteUrl?: string;
  need?: string;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, business, siteUrl, need } = body;

  if (!name?.trim() || !business?.trim() || !need?.trim()) {
    return NextResponse.json(
      { success: false, error: "Name, business and project details are required." },
      { status: 400 }
    );
  }

  // Stub: log the lead. In production, wire this to Resend / SendGrid.
  console.log("New lead:", {
    name,
    business,
    siteUrl: siteUrl || "(none)",
    need,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
