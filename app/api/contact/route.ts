"use server";
import { sendDiscordMessage } from "@/lib/server/discord-messenger";
import { checkRateLimitStatus } from "@/lib/server/rate-limitter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const rateLimitResult = checkRateLimitStatus(request);
  if (rateLimitResult.errorResponse) {
    return rateLimitResult.errorResponse;
  }

  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 },
    );
  }
  const discordMessageResponse = await sendDiscordMessage({
    name,
    email,
    message,
  });
  if (discordMessageResponse.errorResponse) {
    return discordMessageResponse.errorResponse;
  }
  return NextResponse.json({ success: true });
}
