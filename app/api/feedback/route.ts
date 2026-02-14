import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { feedback } from "@/db/schema";

const validCategories = ["bug", "feature", "general"];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, category, message, appVersion } = body as {
      email?: string;
      category?: string;
      message?: string;
      appVersion?: string;
    };

    if (!category || !validCategories.includes(category)) {
      return NextResponse.json(
        { error: "category is required and must be one of: bug, feature, general" },
        { status: 400 },
      );
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 },
      );
    }

    await db.insert(feedback).values({
      id: crypto.randomUUID(),
      email: email || null,
      category,
      message: message.trim(),
      appVersion: appVersion || null,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
