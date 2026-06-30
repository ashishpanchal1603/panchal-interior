import fs from "fs/promises";
import path from "path";

// Types
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface EstimateItem {
  itemId?: string;
  itemName: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
  length?: number;
  width?: number;
  multiplier?: number;
}

export interface Estimate {
  id: string;
  estimateNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  siteAddress: string;
  date: string;
  estimateType: "material" | "labour"; // 'material' = With Material, 'labour' = Labour Work
  status: "draft" | "saved";
  items: EstimateItem[];
  subtotal: number;
  discount: number; // percentage
  gst: number; // percentage
  grandTotal: number;
  language: "en" | "gu";
  termsAndConditions: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PriceItem {
  id: string;
  name: string;
  unit: string;
  materialRate: number;
  labourRate: number;
}

export interface CompanyDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface AdminSettings {
  nextEstimateNumber: number;
  estimatePrefix: string;
  gstRate: number;
  defaultDiscount: number;
  companyDetails: CompanyDetails;
  defaultTerms: string[];
}

import os from "os";

// File Path Helpers
const isVercel = !!process.env.VERCEL;

// JSON Reading/Writing Helpers
export async function readJsonFile<T>(fileName: string, defaultValue: T): Promise<T> {
  const seedPath = path.join(process.cwd(), "data", fileName);
  const tempPath = path.join(os.tmpdir(), fileName);
  try {
    if (isVercel) {
      try {
        const content = await fs.readFile(tempPath, "utf-8");
        return JSON.parse(content) as T;
      } catch {
        // Fallback to read from seed folder if temp doesn't exist yet
        const content = await fs.readFile(seedPath, "utf-8");
        return JSON.parse(content) as T;
      }
    } else {
      const content = await fs.readFile(seedPath, "utf-8");
      return JSON.parse(content) as T;
    }
  } catch (err) {
    console.error(`Error reading ${fileName}:`, err);
    return defaultValue;
  }
}

export async function writeJsonFile<T>(fileName: string, data: T): Promise<void> {
  const filePath = isVercel
    ? path.join(os.tmpdir(), fileName)
    : path.join(process.cwd(), "data", fileName);
  const dirPath = path.dirname(filePath);
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Core Operations wrappers
export const getCustomers = () => readJsonFile<Customer[]>("customers.json", []);
export const saveCustomers = (customers: Customer[]) => writeJsonFile<Customer[]>("customers.json", customers);

export const getEstimates = () => readJsonFile<Estimate[]>("estimates.json", []);
export const saveEstimates = (estimates: Estimate[]) => writeJsonFile<Estimate[]>("estimates.json", estimates);

export const getPrices = () => readJsonFile<PriceItem[]>("prices.json", []);
export const savePrices = (prices: PriceItem[]) => writeJsonFile<PriceItem[]>("prices.json", prices);

export const getSettings = () => readJsonFile<AdminSettings>("settings.json", {
  nextEstimateNumber: 1,
  estimatePrefix: "PI-2026-",
  gstRate: 18,
  defaultDiscount: 0,
  companyDetails: {
    name: "Panchal Interior",
    phone: "+91 96649 56491",
    email: "info@panchalinterior.com",
    address: "Panchal Complex, Near Gota Bridge, Gota, Ahmedabad"
  },
  defaultTerms: []
});
export const saveSettings = (settings: AdminSettings) => writeJsonFile<AdminSettings>("settings.json", settings);

// Auth Helper
export function isAuthorized(request: Request): boolean {
  const usernameHeader = request.headers.get("x-admin-username");
  const passwordHeader = request.headers.get("x-admin-password");
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "panchal2026";
  return usernameHeader === adminUsername && passwordHeader === adminPassword;
}

// Generate Next Estimate Number
export async function getAndIncrementNextEstimateNumber(): Promise<string> {
  const settings = await getSettings();
  const nextNum = settings.nextEstimateNumber;
  const prefix = settings.estimatePrefix;

  // Format with padStart: PI-2026-001
  const formattedNumber = `${prefix}${String(nextNum).padStart(3, "0")}`;

  // Increment settings
  settings.nextEstimateNumber = nextNum + 1;
  await saveSettings(settings);

  return formattedNumber;
}
