import { NextResponse } from "next/server";
import { getPrices, savePrices, isAuthorized } from "@/lib/admin";

// 1. GET - Fetch the price master table
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const prices = await getPrices();
    return NextResponse.json(prices);
  } catch (error) {
    const err = error as Error;
    console.error("GET prices error:", err);
    return NextResponse.json({ error: "Failed to fetch pricing lists", message: err.message }, { status: 500 });
  }
}

// 2. PUT - Update the price master list (bulk save)
export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const priceList = await request.json();
    
    if (!Array.isArray(priceList)) {
      return NextResponse.json({ error: "Invalid price list payload, array expected" }, { status: 400 });
    }

    await savePrices(priceList);
    return NextResponse.json({ success: true, prices: priceList });
  } catch (error) {
    const err = error as Error;
    console.error("PUT prices error:", err);
    return NextResponse.json({ error: "Failed to save pricing master updates", message: err.message }, { status: 500 });
  }
}
