import { NextResponse } from "next/server";
import { getSettings, saveSettings, isAuthorized } from "@/lib/admin";

// 1. GET - Fetch system settings
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    const err = error as Error;
    console.error("GET settings error:", err);
    return NextResponse.json({ error: "Failed to fetch settings configuration", message: err.message }, { status: 500 });
  }
}

// 2. PUT - Update system settings
export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedSettings = await request.json();
    
    // Read old settings first to preserve nextEstimateNumber if not explicit
    const currentSettings = await getSettings();

    const mergedSettings = {
      ...currentSettings,
      ...updatedSettings,
    };

    await saveSettings(mergedSettings);
    return NextResponse.json({ success: true, settings: mergedSettings });
  } catch (error) {
    const err = error as Error;
    console.error("PUT settings error:", err);
    return NextResponse.json({ error: "Failed to save settings", message: err.message }, { status: 500 });
  }
}
