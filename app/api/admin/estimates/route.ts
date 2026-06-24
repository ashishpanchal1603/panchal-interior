import { NextResponse } from "next/server";
import {
  getEstimates,
  saveEstimates,
  isAuthorized,
  getAndIncrementNextEstimateNumber,
  Estimate,
} from "@/lib/admin";

// 1. GET - Fetch all estimates or a single one by ID
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const estimates = await getEstimates();

    if (id) {
      const estimate = estimates.find((e) => e.id === id);
      if (!estimate) {
        return NextResponse.json({ error: "Estimate not found" }, { status: 404 });
      }
      return NextResponse.json(estimate);
    }

    // Sort estimates by date descending (newest first)
    const sortedEstimates = estimates.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(sortedEstimates);
  } catch (error) {
    const err = error as Error;
    console.error("GET estimates error:", err);
    return NextResponse.json({ error: "Failed to fetch estimates", message: err.message }, { status: 500 });
  }
}

// 2. POST - Create new estimate
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const estimateData = await request.json();
    const estimates = await getEstimates();

    // Auto-generate estimate number
    const estimateNumber = await getAndIncrementNextEstimateNumber();
    const id = estimateNumber; // Using estimateNumber as ID for uniqueness and easy route params

    const newEstimate: Estimate = {
      ...estimateData,
      id,
      estimateNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    estimates.push(newEstimate);
    await saveEstimates(estimates);

    return NextResponse.json({ success: true, estimate: newEstimate });
  } catch (error) {
    const err = error as Error;
    console.error("POST estimate error:", err);
    return NextResponse.json({ error: "Failed to create estimate", message: err.message }, { status: 500 });
  }
}

// 3. PUT - Update estimate details
export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedData = await request.json();
    const { id } = updatedData;

    if (!id) {
      return NextResponse.json({ error: "Estimate ID is required for update." }, { status: 400 });
    }

    const estimates = await getEstimates();
    const index = estimates.findIndex((e) => e.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Estimate not found." }, { status: 404 });
    }

    // Keep original estimate number and createdAt, update other fields
    const updatedEstimate: Estimate = {
      ...estimates[index],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };

    estimates[index] = updatedEstimate;
    await saveEstimates(estimates);

    return NextResponse.json({ success: true, estimate: updatedEstimate });
  } catch (error) {
    const err = error as Error;
    console.error("PUT estimate error:", err);
    return NextResponse.json({ error: "Failed to update estimate", message: err.message }, { status: 500 });
  }
}

// 4. DELETE - Delete estimate
export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Estimate ID is required." }, { status: 400 });
    }

    const estimates = await getEstimates();
    const filteredEstimates = estimates.filter((e) => e.id !== id);

    if (estimates.length === filteredEstimates.length) {
      return NextResponse.json({ error: "Estimate not found." }, { status: 404 });
    }

    await saveEstimates(filteredEstimates);
    return NextResponse.json({ success: true, message: "Estimate deleted successfully." });
  } catch (error) {
    const err = error as Error;
    console.error("DELETE estimate error:", err);
    return NextResponse.json({ error: "Failed to delete estimate", message: err.message }, { status: 500 });
  }
}
