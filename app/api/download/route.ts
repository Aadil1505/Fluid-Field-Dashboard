import { db } from "@/db/drizzle";
import { downloadEvent } from "@/db/schema";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL;
const DOWNLOAD_PATH = process.env.DOWNLOAD_PATH ?? "/downloads/MotionDesk.dmg";
const BOT_UA_PATTERN =
  /bot|crawler|spider|crawling|headless|preview|lighthouse/i;

function sanitize(value: string | null, fallback: string, max = 64) {
  if (!value) return fallback;
  return value.trim().slice(0, max) || fallback;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? null;
  return request.headers.get("x-real-ip");
}

export async function GET(request: Request) {
  const redirectTarget = DOWNLOAD_URL ?? DOWNLOAD_PATH;
  const { searchParams } = new URL(request.url);
  const source = sanitize(searchParams.get("source"), "unknown");
  const platform = sanitize(searchParams.get("platform"), "macos");
  const releaseChannel = sanitize(searchParams.get("channel"), "stable");
  const appVersion = sanitize(searchParams.get("version"), "", 32) || null;
  const userAgent = request.headers.get("user-agent");
  const referrer = request.headers.get("referer");
  const ipAddress = getClientIp(request);
  const isBot = userAgent ? BOT_UA_PATTERN.test(userAgent) : false;

  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    await db.insert(downloadEvent).values({
      id: crypto.randomUUID(),
      userId: session?.user.id ?? null,
      email: session?.user.email ?? null,
      source,
      platform,
      releaseChannel,
      appVersion,
      ipAddress,
      userAgent,
      referrer,
      isBot,
    });
  } catch (error) {
    console.error("Failed to record download event", error);
  }

  return NextResponse.redirect(new URL(redirectTarget, request.url), {
    status: 307,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
