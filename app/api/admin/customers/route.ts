import { NextResponse } from "next/server";
import {
  getCustomers,
  saveCustomers,
  isAuthorized,
  Customer,
} from "@/lib/admin";

// 1. GET - Fetch all customers
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const customers = await getCustomers();
    // Sort alphabetically by name
    const sortedCustomers = customers.sort((a, b) => a.name.localeCompare(b.name));
    return NextResponse.json(sortedCustomers);
  } catch (error) {
    const err = error as Error;
    console.error("GET customers error:", err);
    return NextResponse.json({ error: "Failed to fetch customers", message: err.message }, { status: 500 });
  }
}

// 2. POST - Add new customer
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const customerData = await request.json();
    const customers = await getCustomers();

    // Check if phone already registered to avoid duplicates
    const phoneExists = customers.some(
      (c) => c.phone.trim().replace(/\s+/g, "") === customerData.phone.trim().replace(/\s+/g, "")
    );

    if (phoneExists) {
      return NextResponse.json(
        { error: "A customer with this phone number already exists." },
        { status: 400 }
      );
    }

    const id = `CUST-${Date.now()}`;
    const newCustomer: Customer = {
      ...customerData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    customers.push(newCustomer);
    await saveCustomers(customers);

    return NextResponse.json({ success: true, customer: newCustomer });
  } catch (error) {
    const err = error as Error;
    console.error("POST customer error:", err);
    return NextResponse.json({ error: "Failed to create customer", message: err.message }, { status: 500 });
  }
}

// 3. PUT - Edit customer profile
export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedData = await request.json();
    const { id } = updatedData;

    if (!id) {
      return NextResponse.json({ error: "Customer ID is required." }, { status: 400 });
    }

    const customers = await getCustomers();
    const index = customers.findIndex((c) => c.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Customer not found." }, { status: 404 });
    }

    const updatedCustomer: Customer = {
      ...customers[index],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };

    customers[index] = updatedCustomer;
    await saveCustomers(customers);

    return NextResponse.json({ success: true, customer: updatedCustomer });
  } catch (error) {
    const err = error as Error;
    console.error("PUT customer error:", err);
    return NextResponse.json({ error: "Failed to update customer", message: err.message }, { status: 500 });
  }
}

// 4. DELETE - Remove customer
export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Customer ID is required." }, { status: 400 });
    }

    const customers = await getCustomers();
    const filteredCustomers = customers.filter((c) => c.id !== id);

    if (customers.length === filteredCustomers.length) {
      return NextResponse.json({ error: "Customer not found." }, { status: 404 });
    }

    await saveCustomers(filteredCustomers);
    return NextResponse.json({ success: true, message: "Customer deleted successfully." });
  } catch (error) {
    const err = error as Error;
    console.error("DELETE customer error:", err);
    return NextResponse.json({ error: "Failed to delete customer", message: err.message }, { status: 500 });
  }
}
