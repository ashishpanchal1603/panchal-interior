"use client";

import { motion } from "framer-motion";
import { ArrowRight, Ruler, Info } from "lucide-react";
import { KitchenState } from "./types";

interface KitchenFlowProps {
  step: number;
  kitchenState: KitchenState;
  onChange: (state: KitchenState) => void;
  nextStep: () => void;
  setHoveredItem: (item: string | null) => void;
}

export default function KitchenFlow({
  step,
  kitchenState,
  onChange,
  nextStep,
  setHoveredItem,
}: KitchenFlowProps) {
  // Handle layout selection and make sure lengthC is initialized if needed
  const handleLayoutSelect = (layoutId: KitchenState["layout"]) => {
    onChange({
      ...kitchenState,
      layout: layoutId,
      lengthC: layoutId === "u-shape" ? (kitchenState.lengthC || 8) : undefined,
    });
  };

  return (
    <div>
      {/* STEP 1: LAYOUT SELECTION */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-stone-900">Select Kitchen Layout</h3>
            <p className="text-stone-500 text-sm mt-1">
              Please select the layout configuration of your counter space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                id: "straight",
                title: "Straight Kitchen",
                desc: "Compact single counter (needs Side A)",
                diagram: (
                  <div className="w-full h-12 bg-stone-100 rounded-lg flex items-center px-4">
                    <div className="h-4 w-full bg-primary/70 rounded border border-primary-hover" />
                  </div>
                ),
              },
              {
                id: "l-shape",
                title: "L-Shaped Kitchen",
                desc: "Fits corners perfectly (needs Sides A & B)",
                diagram: (
                  <div className="w-full h-12 bg-stone-100 rounded-lg relative">
                    <div className="absolute left-4 bottom-2 top-2 w-4 bg-primary/70 rounded border border-primary-hover" />
                    <div className="absolute left-4 bottom-2 right-4 h-4 bg-primary/70 rounded border border-primary-hover" />
                  </div>
                ),
              },
              {
                id: "parallel",
                title: "Parallel Kitchen",
                desc: "Dual counter efficiency (needs Sides A & B)",
                diagram: (
                  <div className="w-full h-12 bg-stone-100 rounded-lg relative flex flex-col justify-between py-2 px-4">
                    <div className="h-3 w-full bg-primary/70 rounded border border-primary-hover" />
                    <div className="h-3 w-full bg-primary/70 rounded border border-primary-hover" />
                  </div>
                ),
              },
              {
                id: "u-shape",
                title: "U-Shaped / C-Type",
                desc: "Maximum workspace (needs Sides A, B & C)",
                diagram: (
                  <div className="w-full h-12 bg-stone-100 rounded-lg relative">
                    <div className="absolute left-4 top-2 bottom-2 w-4 bg-primary/70 rounded border border-primary-hover" />
                    <div className="absolute left-4 right-4 top-2 h-4 bg-primary/70 rounded border border-primary-hover" />
                    <div className="absolute right-4 top-2 bottom-2 w-4 bg-primary/70 rounded border border-primary-hover" />
                  </div>
                ),
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLayoutSelect(item.id as KitchenState["layout"])}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`p-4 sm:p-5 text-left border rounded-xl flex flex-col justify-between transition h-auto min-h-[170px] md:min-h-[200px] cursor-pointer ${
                  kitchenState.layout === item.id
                    ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                    : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                }`}
              >
                <div>
                  <span className="block font-bold text-stone-900 text-sm sm:text-base leading-tight">
                    {item.title}
                  </span>
                  <span className="block text-stone-400 text-[11px] mt-1 leading-relaxed">
                    {item.desc}
                  </span>
                </div>
                <div className="mt-3">{item.diagram}</div>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={nextStep}
              className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-5 shadow-md transition flex items-center gap-1 cursor-pointer font-sans text-sm"
            >
              Next Step <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: MEASUREMENTS */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-stone-900">Define Kitchen Dimensions</h3>
            <p className="text-stone-500 text-sm mt-1">
              Specify counter lengths for accurate estimation calculations (in feet).
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-stone-50/50 border border-stone-100 rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Counter Length A Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Counter Side A: <span className="text-primary text-base font-extrabold">{kitchenState.lengthA} ft</span>
                </label>
                <span className="text-stone-400 text-xs">(6 ft to 15 ft)</span>
              </div>
              <input
                type="range"
                min="6"
                max="15"
                value={kitchenState.lengthA}
                onChange={(e) => onChange({ ...kitchenState, lengthA: parseInt(e.target.value) })}
                className="w-full accent-primary h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Counter Length B Slider (Shown if layout needs side B) */}
            {kitchenState.layout !== "straight" && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Counter Side B: <span className="text-primary text-base font-extrabold">{kitchenState.lengthB} ft</span>
                  </label>
                  <span className="text-stone-400 text-xs">(6 ft to 15 ft)</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="15"
                  value={kitchenState.lengthB}
                  onChange={(e) => onChange({ ...kitchenState, lengthB: parseInt(e.target.value) })}
                  className="w-full accent-primary h-2 bg-stone-200 rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* Counter Length C Slider (Shown if layout is U-Shape/C-Type) */}
            {kitchenState.layout === "u-shape" && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Counter Side C (Bridging Counter):{" "}
                    <span className="text-primary text-base font-extrabold">{kitchenState.lengthC || 8} ft</span>
                  </label>
                  <span className="text-stone-400 text-xs">(6 ft to 15 ft)</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="15"
                  value={kitchenState.lengthC || 8}
                  onChange={(e) => onChange({ ...kitchenState, lengthC: parseInt(e.target.value) })}
                  className="w-full accent-primary h-2 bg-stone-200 rounded-lg cursor-pointer"
                />
              </div>
            )}

            <div className="bg-white border border-stone-200 rounded-xl p-4 flex gap-3 items-center">
              <Ruler className="h-5 w-5 text-primary shrink-0" />
              <div className="text-xs text-stone-500 leading-relaxed">
                {kitchenState.layout === "u-shape" ? (
                  <p>
                    💡 <strong>C-Type Configuration:</strong> Displays counter length inputs for Side A, Side B, and Side C respectively. We calculate pricing based on total cumulative counter footage.
                  </p>
                ) : (
                  <p>
                    💡 <strong>Ahmedabad Standard Sizing:</strong> Typical counters have a 2-foot depth and a 34-inch height. We assume standard base cabinets and top hydraulic wall cupboards.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={nextStep}
              className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition flex items-center gap-1 cursor-pointer font-sans"
            >
              Next Step <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: FINISHES */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-5"
        >
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">Choose Shutter Materials & Finish</h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Select the look and longevity tier of your modular kitchen doors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {/* Laminate */}
            <button
              type="button"
              onClick={() => onChange({ ...kitchenState, finish: "laminate" })}
              onMouseEnter={() => setHoveredItem("laminate")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`p-4 sm:p-5 text-left border rounded-xl flex flex-col justify-between transition h-auto min-h-[220px] md:min-h-[250px] cursor-pointer ${
                kitchenState.finish === "laminate"
                  ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                  : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
              }`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 mb-2">
                  Essentials
                </span>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base">Matte Laminate</h4>
                <p className="text-stone-500 text-[11px] mt-1 leading-relaxed">
                  0.8mm Merinolam/Century laminates. Scratch-proof, heat-proof, and budget-friendly. Excellent for heavy daily Indian cooking.
                </p>
              </div>
              <span className="text-xs text-primary font-bold mt-3 border-t border-stone-100 pt-2">₹1,800 / running ft</span>
            </button>

            {/* Acrylic */}
            <button
              type="button"
              onClick={() => onChange({ ...kitchenState, finish: "acrylic" })}
              onMouseEnter={() => setHoveredItem("acrylic")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`p-4 sm:p-5 text-left border rounded-xl flex flex-col justify-between transition h-auto min-h-[220px] md:min-h-[250px] cursor-pointer ${
                kitchenState.finish === "acrylic"
                  ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                  : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
              }`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-primary-light text-primary mb-2">
                  Premium Choice
                </span>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base">High-Gloss Acrylic</h4>
                <p className="text-stone-500 text-[11px] mt-1 leading-relaxed">
                  1.2mm anti-scratch German acrylic doors. Sleek reflective mirror finish that makes compact kitchens look spacious and upscale.
                </p>
              </div>
              <span className="text-xs text-primary font-bold mt-3 border-t border-stone-100 pt-2">₹2,900 / running ft</span>
            </button>

            {/* Glass */}
            <button
              type="button"
              onClick={() => onChange({ ...kitchenState, finish: "glass" })}
              onMouseEnter={() => setHoveredItem("glass")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`p-4 sm:p-5 text-left border rounded-xl flex flex-col justify-between transition h-auto min-h-[220px] md:min-h-[250px] cursor-pointer ${
                kitchenState.finish === "glass"
                  ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                  : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
              }`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 mb-2">
                  Elite Luxury
                </span>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base">Glass Profile Shutters</h4>
                <p className="text-stone-500 text-[11px] mt-1 leading-relaxed">
                  Premium dark-tinted or frosted glass panes mounted in sleek matte black aluminum profile frames. Includes interior shelf sensor lights.
                </p>
              </div>
              <span className="text-xs text-primary font-bold mt-3 border-t border-stone-100 pt-2">₹4,200 / running ft</span>
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={nextStep}
              className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-5 shadow-md transition flex items-center gap-1 cursor-pointer font-sans text-sm"
            >
              Get Estimate <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
