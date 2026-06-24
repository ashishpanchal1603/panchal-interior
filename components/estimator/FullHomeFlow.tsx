"use client";

import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { FullHomeState, getAvailableScopes } from "./types";

interface FullHomeFlowProps {
  step: number;
  fullState: FullHomeState;
  onChange: (state: FullHomeState) => void;
  nextStep: () => void;
  setHoveredItem: (item: string | null) => void;
}

export default function FullHomeFlow({
  step,
  fullState,
  onChange,
  nextStep,
  setHoveredItem,
}: FullHomeFlowProps) {
  // 1. Handle BHK selection and adjust scope accordingly
  const handleBhkSelect = (bhkId: string) => {
    const allowedScopes = getAvailableScopes(bhkId);
    // Filter active scopes to only keep allowed ones
    const filteredScope = fullState.scope.filter((s) => allowedScopes.includes(s));

    // Ensure at least one valid scope is selected by default if previous selection was cleared
    const finalScope = filteredScope.length > 0 ? filteredScope : [allowedScopes[0]];

    onChange({
      ...fullState,
      bhk: bhkId,
      scope: finalScope,
    });
  };

  // 2. Handle Scope Selection toggle
  const toggleScope = (scopeId: string) => {
    const isSelected = fullState.scope.includes(scopeId);
    let updatedScope = [...fullState.scope];

    if (isSelected) {
      updatedScope = updatedScope.filter((s) => s !== scopeId);
      // Don't let them have empty scope
      if (updatedScope.length === 0) {
        return;
      }
    } else {
      updatedScope.push(scopeId);
    }

    onChange({
      ...fullState,
      scope: updatedScope,
    });
  };

  return (
    <div>
      {/* STEP 1: BHK SELECT */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div className="text-center md:text-left">
            <h3 className=" text-2xl font-bold text-stone-900">Select your BHK Type</h3>
            <p className="text-stone-500 text-sm mt-1">
              Please select the overall size configuration of your property.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { id: "1bhk", title: "1 BHK", desc: "Cozy layout (3 main areas)" },
              { id: "2bhk-small", title: "2 BHK (Small)", desc: "Below 1000 sq.ft. (4 areas)" },
              { id: "2bhk-large", title: "2 BHK (Large)", desc: "Above 1000 sq.ft. (4 areas)" },
              { id: "3bhk-small", title: "3 BHK (Small)", desc: "Below 1500 sq.ft. (5 areas)" },
              { id: "3bhk-large", title: "3 BHK (Large)", desc: "Above 1500 sq.ft. (5 areas)" },
              { id: "4bhk", title: "4 BHK", desc: "Premium layout (5 areas)" },
              { id: "5bhk", title: "5 BHK+", desc: "Luxury duplex/villa (5 areas)" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleBhkSelect(item.id)}
                className={`p-5 text-left border rounded-xl transition duration-200 cursor-pointer ${fullState.bhk === item.id
                  ? "border-primary bg-primary-light/35 shadow-sm ring-1 ring-primary"
                  : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                  }`}
              >
                <span className="block font-bold text-stone-900">{item.title}</span>
                <span className="block text-stone-400 text-xs mt-1">{item.desc}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={nextStep}
              className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition flex items-center gap-1 cursor-pointer font-sans"
            >
              Next Step <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: QUALITY / PACKAGE TIER */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-5"
        >
          <div className="text-center md:text-left">
            <h3 className="font-outfit text-xl sm:text-2xl font-bold text-stone-900">Choose Quality & Package</h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Select structural materials, hardware finishes, and custom styling budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {/* Essentials */}
            <button
              type="button"
              onClick={() => onChange({ ...fullState, packageTier: "essentials" })}
              className={`p-4 sm:p-5 text-left border rounded-xl flex flex-col justify-between transition h-auto min-h-[260px] md:min-h-[290px] cursor-pointer ${fullState.packageTier === "essentials"
                ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                }`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 mb-2">
                  Essentials
                </span>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base">Value & Durability</h4>
                <p className="text-stone-500 text-[11px] mt-1 leading-relaxed">
                  Standard Commercial MR Plywood, durable matte laminates, and reliable local brand hardware. Focuses on high utility and functional budgeting.
                </p>
              </div>
              <ul className="text-[10px] text-stone-600 space-y-1 mt-3 border-t border-stone-100 pt-2.5">
                <li className="flex items-center gap-1.5">✓ Standard Laminates</li>
                <li className="flex items-center gap-1.5">✓ High Durability</li>
                <li className="flex items-center gap-1.5">✓ 5 Years Warranty</li>
              </ul>
            </button>

            {/* Premium */}
            <button
              type="button"
              onClick={() => onChange({ ...fullState, packageTier: "premium" })}
              className={`p-4 sm:p-5 text-left border rounded-xl flex flex-col justify-between transition h-auto min-h-[260px] md:min-h-[290px] relative cursor-pointer ${fullState.packageTier === "premium"
                ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                }`}
            >
              <span className="absolute -top-2.5 left-4 inline-block bg-primary text-white px-2.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider shadow-sm">
                Most Popular
              </span>
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-primary-light text-primary mb-2 mt-0.5">
                  Premium
                </span>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base">Sleek & Stylized</h4>
                <p className="text-stone-500 text-[11px] mt-1 leading-relaxed">
                  BWR/BWP Marine Plywood, soft-close hardware (Hettich/Hafele), high-gloss acrylic shutters, false ceiling with cove lighting and premium wall paints.
                </p>
              </div>
              <ul className="text-[10px] text-stone-600 space-y-1 mt-3 border-t border-stone-100 pt-2.5">
                <li className="flex items-center gap-1.5">✓ High Gloss Acrylics</li>
                <li className="flex items-center gap-1.5">✓ Soft-Close German Hardware</li>
                <li className="flex items-center gap-1.5">✓ False Ceiling + Cove Lights</li>
              </ul>
            </button>

            {/* Elite */}
            <button
              type="button"
              onClick={() => onChange({ ...fullState, packageTier: "elite" })}
              className={`p-4 sm:p-5 text-left border rounded-xl flex flex-col justify-between transition h-auto min-h-[260px] md:min-h-[290px] cursor-pointer ${fullState.packageTier === "elite"
                ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                }`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 mb-2">
                  Elite Luxury
                </span>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base">Bespoke Architectural</h4>
                <p className="text-stone-500 text-[11px] mt-1 leading-relaxed">
                  BWP Marine Ply, customized natural veneers, metallic profile smoked glass doors, designer quartz stone, integrated smart lighting profiles, and premium PU polish.
                </p>
              </div>
              <ul className="text-[10px] text-stone-600 space-y-1 mt-3 border-t border-stone-100 pt-2.5">
                <li className="flex items-center gap-1.5">✓ Veneers & PU Polish</li>
                <li className="flex items-center gap-1.5">✓ Glass Profile Shutters</li>
                <li className="flex items-center gap-1.5">✓ End-to-End Turnkey</li>
              </ul>
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={nextStep}
              className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-5 shadow-md transition flex items-center gap-1 cursor-pointer font-sans text-sm"
            >
              Next Step <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: SCOPE OF WORK */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div className="text-center md:text-left">
            <h3 className="font-outfit text-2xl font-bold text-stone-900">Select Scope of Work</h3>
            <p className="text-stone-500 text-sm mt-1">
              Check the rooms you want to design. Pricing adjusts dynamically based on selected rooms.
            </p>
          </div>

          {/* Alert indicating scope filters */}
          {getAvailableScopes(fullState.bhk).length < 5 && (
            <div className="bg-primary-light border border-primary/20 rounded-xl p-3 flex gap-2 items-center text-xs text-stone-600">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>
                Based on your <strong>{fullState.bhk.replace("-", " ").toUpperCase()}</strong> configuration, room options are dynamically filtered to match layout feasibility.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { id: "living", title: "Living Home Design", desc: "TV Panel, Sofa Set, Wallpaper, Ceiling", pct: "25%" },
              { id: "master", title: "Master Bedroom", desc: "Teak Bed, Hydraulic Storage, Sliding Wardrobe", pct: "25%" },
              { id: "kids", title: "Kids Bedroom", desc: "Bed, Wardrobe, Integrated Study Console", pct: "20%" },
              { id: "kitchen", title: "Modular Kitchen", desc: "Soft-Close Cabinets, Baskets, Chimney", pct: "20%" },
              { id: "dining", title: "Dining & Crockery Area", desc: "Dining Table, Glass Crockery Unit", pct: "10%" },
            ]
              .filter((item) => getAvailableScopes(fullState.bhk).includes(item.id))
              .map((item) => {
                const isSelected = fullState.scope.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleScope(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`p-5 text-left border rounded-xl flex justify-between items-start transition duration-200 cursor-pointer ${isSelected
                      ? "border-primary bg-primary-light/35 shadow-sm ring-1 ring-primary"
                      : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                      }`}
                  >
                    <div>
                      <span className="block font-bold text-stone-900 text-sm sm:text-base">{item.title}</span>
                      <span className="block text-stone-400 text-xs mt-1 leading-relaxed">{item.desc}</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-primary-light border border-primary/20 px-2 py-0.5 rounded-full shrink-0">
                      {item.pct}
                    </span>
                  </button>
                );
              })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={nextStep}
              className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition flex items-center gap-1 cursor-pointer font-sans"
            >
              Get Estimate <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
