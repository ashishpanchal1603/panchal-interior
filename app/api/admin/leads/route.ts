import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const getLeadsFilePath = () => path.join(process.cwd(), "data", "leads.json");

// Helper to read leads safely
async function readLeads() {
  const filePath = getLeadsFilePath();
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Helper to write leads safely
async function writeLeads(leads: any[]) {
  const filePath = getLeadsFilePath();
  const dirPath = path.dirname(filePath);
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(leads, null, 2), "utf-8");
}

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
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json(sortedLeads);
  } catch (error: any) {
    console.error("GET leads error:", error);
    return NextResponse.json({ error: "Failed to fetch leads", message: error.message }, { status: 500 });
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
    const leadIndex = leads.findIndex((l: any) => l.id === id);

    if (leadIndex === -1) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    // Update status
    leads[leadIndex].status = status;
    await writeLeads(leads);

    return NextResponse.json({ success: true, lead: leads[leadIndex] });
  } catch (error: any) {
    console.error("PUT lead status error:", error);
    return NextResponse.json({ error: "Failed to update status", message: error.message }, { status: 500 });
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
    const filteredLeads = leads.filter((l: any) => l.id !== id);

    if (leads.length === filteredLeads.length) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    await writeLeads(filteredLeads);
    return NextResponse.json({ success: true, message: "Lead deleted successfully." });
  } catch (error: any) {
    console.error("DELETE lead error:", error);
    return NextResponse.json({ error: "Failed to delete lead", message: error.message }, { status: 500 });
  }
}
