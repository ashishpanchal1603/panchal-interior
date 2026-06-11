export type CalculatorType = "full" | "kitchen" | "wardrobe" | null;

export interface FullHomeState {
  bhk: string;
  packageTier: "essentials" | "premium" | "elite";
  scope: string[];
}

export interface KitchenState {
  layout: "l-shape" | "straight" | "u-shape" | "parallel";
  lengthA: number; // in feet
  lengthB: number; // in feet
  lengthC?: number; // in feet (for U-shape/C-type)
  finish: "laminate" | "acrylic" | "glass";
}

export interface WardrobeState {
  type: "swing" | "sliding" | "walk-in";
  width: number; // in feet
  height: number; // in feet
  finish: "laminate" | "acrylic" | "glass";
}

export const BHK_PRICES: Record<string, number> = {
  "1bhk": 180000,
  "2bhk-small": 260000,
  "2bhk-large": 320000,
  "3bhk-small": 390000,
  "3bhk-large": 450000,
  "4bhk": 580000,
  "5bhk": 750000,
};

export const PACKAGE_MULTIPLIERS = {
  essentials: 1.0,
  premium: 1.45,
  elite: 2.1,
};

export const SCOPE_PERCENTAGES: Record<string, number> = {
  living: 0.25,
  master: 0.25,
  kids: 0.20,
  kitchen: 0.20,
  dining: 0.10,
};

export function getAvailableScopes(bhk: string): string[] {
  if (bhk === "1bhk") {
    return ["living", "master", "kitchen"];
  }
  if (bhk === "2bhk-small" || bhk === "2bhk-large") {
    return ["living", "master", "kids", "kitchen"];
  }
  return ["living", "master", "kids", "kitchen", "dining"];
}

export function calculateFullHomePrice(state: FullHomeState) {
  const base = BHK_PRICES[state.bhk] || 250000;
  const mult = PACKAGE_MULTIPLIERS[state.packageTier];
  const allowed = getAvailableScopes(state.bhk);
  const activeScope = state.scope.filter(s => allowed.includes(s));
  const scopeSum = activeScope.reduce((acc, curr) => acc + (SCOPE_PERCENTAGES[curr] || 0), 0);
  const scopeAdjustment = scopeSum === 0 ? 0.1 : scopeSum; // minimum 10% if nothing is checked

  const calculated = base * mult * scopeAdjustment;
  const low = Math.round(calculated * 0.9);
  const high = Math.round(calculated * 1.1);
  return { low, high };
}

export function calculateKitchenPrice(state: KitchenState) {
  const layoutMultiplier = {
    "straight": 1.0,
    "l-shape": 1.4,
    "parallel": 1.6,
    "u-shape": 2.0,
  }[state.layout];

  const finishRate = {
    laminate: 1800,
    acrylic: 2900,
    glass: 4200,
  }[state.finish];

  let totalLength = state.lengthA;
  if (state.layout === "l-shape" || state.layout === "parallel") {
    totalLength = state.lengthA + state.lengthB;
  } else if (state.layout === "u-shape") {
    totalLength = state.lengthA + state.lengthB + (state.lengthC || 8);
  }

  const baseCost = totalLength * finishRate * layoutMultiplier;
  const installationAndCarcass = 35000;
  const calculated = baseCost + installationAndCarcass;

  const low = Math.round(calculated * 0.95);
  const high = Math.round(calculated * 1.15); // kitchen fitting buffer
  return { low, high };
}

export function calculateWardrobePrice(state: WardrobeState) {
  const typeFactor = {
    swing: 1.0,
    sliding: 1.2,
    "walk-in": 1.5,
  }[state.type];

  const finishRate = {
    laminate: 450,
    acrylic: 680,
    glass: 950,
  }[state.finish];

  const sqft = state.width * state.height;
  const baseCost = sqft * finishRate * typeFactor;
  const installAndHardware = 15000;
  const calculated = baseCost + installAndHardware;

  const low = Math.round(calculated * 0.9);
  const high = Math.round(calculated * 1.1);
  return { low, high };
}

export function formatPrice(num: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}
