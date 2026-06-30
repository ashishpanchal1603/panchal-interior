import { NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/admin";

interface Lead {
  id: string;
  status: string;
  createdAt: string;
  leadName: string;
  leadPhone: string;
  leadEmail?: string;
  leadMessage?: string;
  calcType?: string | null;
  details?: unknown;
}

// Helper to read leads safely
const readLeads = () => readJsonFile<Lead[]>("leads.json", []);

// Helper to write leads safely
const writeLeads = (leads: Lead[]) => writeJsonFile<Lead[]>("leads.json", leads);

function isAuthorized(request: Request): boolean {
  const usernameHeader = request.headers.get("x-admin-username");
  const passwordHeader = request.headers.get("x-admin-password");
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "panchal2026";
  return usernameHeader === adminUsername && passwordHeader === adminPassword;
}

// 1. GET - Fetch all inquiries
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await readLeads();
    // Sort leads by date descending (newest first)
    const sortedLeads = leads.sort(
      (a: Lead, b: Lead) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json(sortedLeads);
  } catch (error) {
    const err = error as Error;
    console.error("GET leads error:", err);
    return NextResponse.json({ error: "Failed to fetch leads", message: err.message }, { status: 500 });
  }
}

// 2. PUT - Update lead status
export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Lead ID and status are required." }, { status: 400 });
    }

    const leads = await readLeads();
    const leadIndex = leads.findIndex((l: Lead) => l.id === id);

    if (leadIndex === -1) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    // Update status
    leads[leadIndex].status = status;
    await writeLeads(leads);

    return NextResponse.json({ success: true, lead: leads[leadIndex] });
  } catch (error) {
    const err = error as Error;
    console.error("PUT lead status error:", err);
    return NextResponse.json({ error: "Failed to update status", message: err.message }, { status: 500 });
  }
}

// 3. DELETE - Remove a lead
export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required." }, { status: 400 });
    }

    const leads = await readLeads();
    const filteredLeads = leads.filter((l: Lead) => l.id !== id);

    if (leads.length === filteredLeads.length) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    await writeLeads(filteredLeads);
    return NextResponse.json({ success: true, message: "Lead deleted successfully." });
  } catch (error) {
    const err = error as Error;
    console.error("DELETE lead error:", err);
    return NextResponse.json({ error: "Failed to delete lead", message: err.message }, { status: 500 });
  }
}
