"use client";

import { motion } from "framer-motion";
import { ArrowRight, Ruler } from "lucide-react";
import { WardrobeState } from "./types";

interface WardrobeFlowProps {
  step: number;
  wardrobeState: WardrobeState;
  onChange: (state: WardrobeState) => void;
  nextStep: () => void;
  setHoveredItem: (item: string | null) => void;
}

export default function WardrobeFlow({
  step,
  wardrobeState,
  onChange,
  nextStep,
  setHoveredItem,
}: WardrobeFlowProps) {
  return (
    <div>
      {/* STEP 1: WARDROBE STYLE */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-5"
        >
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">Select Wardrobe Style</h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Please select the structural opening doors configuration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {[
              {
                id: "swing",
                title: "Swing Door Wardrobe",
                desc: "Classic hinges, full cabinet accessibility. Most customizable inside.",
              },
              {
                id: "sliding",
                title: "Sliding Door Wardrobe",
                desc: "Sleek sliding doors. Space-saving layout ideal for tight bedroom clearance.",
              },
              {
                id: "walk-in",
                title: "Premium Walk-In Closet",
                desc: "Open partition cabinetry layout, dedicated modular dressing shelves.",
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ ...wardrobeState, type: item.id as WardrobeState["type"] })}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`p-4 sm:p-5 text-left border rounded-xl flex flex-col justify-between transition h-auto min-h-[150px] md:min-h-[180px] cursor-pointer ${wardrobeState.type === item.id
                  ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                  : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                  }`}
              >
                <div>
                  <span className="block font-bold text-stone-900 text-sm sm:text-base leading-tight">
                    {item.title}
                  </span>
                  <p className="text-stone-500 text-[11px] mt-2 leading-relaxed">{item.desc}</p>
                </div>
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
            <h3 className="font-serif text-2xl font-bold text-stone-900">Define Wardrobe Sizing</h3>
            <p className="text-stone-500 text-sm mt-1">
              Specify custom width and height requirements (in feet).
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-stone-50/50 border border-stone-100 rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Width Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Cabinet Width: <span className="text-primary text-base font-extrabold">{wardrobeState.width} ft</span>
                </label>
                <span className="text-stone-400 text-xs">(4 ft to 12 ft)</span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                value={wardrobeState.width}
                onChange={(e) => onChange({ ...wardrobeState, width: parseInt(e.target.value) })}
                className="w-full accent-primary h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Height Select Buttons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Cabinet Height:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "7 ft (Standard)", val: 7 },
                  { label: "8 ft (Semi-Loft)", val: 8 },
                  { label: "9.5 ft (Ceiling Loft)", val: 9.5 },
                ].map((hOpt) => (
                  <button
                    key={hOpt.val}
                    type="button"
                    onClick={() => onChange({ ...wardrobeState, height: hOpt.val })}
                    className={`py-2.5 px-2 text-center text-xs font-semibold rounded-lg border transition cursor-pointer ${wardrobeState.height === hOpt.val
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                      }`}
                  >
                    {hOpt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-4 flex gap-3 items-center">
              <Ruler className="h-5 w-5 text-primary shrink-0" />
              <p className="text-xs text-stone-500 leading-relaxed">
                💡 <strong>Panchal Craftsmanship:</strong> Height above 8.5 feet usually includes a structural loft bridge division to prevent door panel warping and maximize overhead suitcase storage space.
              </p>
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
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">Choose Door Finish</h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Select outer surfacing materials for design aesthetics and durability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {/* Laminate */}
            <button
              type="button"
              onClick={() => onChange({ ...wardrobeState, finish: "laminate" })}
              onMouseEnter={() => setHoveredItem("laminate")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`p-4 sm:p-5 text-left border rounded-xl flex flex-col justify-between transition h-auto min-h-[220px] md:min-h-[250px] cursor-pointer ${wardrobeState.finish === "laminate"
                ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                }`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 mb-2">
                  Matte Laminate
                </span>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base">Textured Laminates</h4>
                <p className="text-stone-500 text-[11px] mt-1 leading-relaxed">
                  0.8mm Century woodgrain or linen textured laminates. Highly scratch resistant and easy to clean. Perfect for standard wardrobes.
                </p>
              </div>
              {/* <span className="text-xs text-primary font-bold mt-3 border-t border-stone-100 pt-2">₹450 / sq.ft</span> */}
            </button>

            {/* Acrylic */}
            <button
              type="button"
              onClick={() => onChange({ ...wardrobeState, finish: "acrylic" })}
              onMouseEnter={() => setHoveredItem("acrylic")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`p-4 sm:p-5 text-left border rounded-xl flex flex-col justify-between transition h-auto min-h-[220px] md:min-h-[250px] cursor-pointer ${wardrobeState.finish === "acrylic"
                ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                }`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-primary-light text-primary mb-2">
                  Premium Choice
                </span>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base">Glossy Acrylic Panels</h4>
                <p className="text-stone-500 text-[11px] mt-1 leading-relaxed">
                  1.2mm acrylic sheets with mirror-like luster. Gives bedrooms a luxurious, shiny reflective surface that enhances visual space.
                </p>
              </div>
              {/* <span className="text-xs text-primary font-bold mt-3 border-t border-stone-100 pt-2">₹680 / sq.ft</span> */}
            </button>

            {/* Glass */}
            <button
              type="button"
              onClick={() => onChange({ ...wardrobeState, finish: "glass" })}
              onMouseEnter={() => setHoveredItem("glass")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`p-4 sm:p-5 text-left border rounded-xl flex flex-col justify-between transition h-auto min-h-[220px] md:min-h-[250px] cursor-pointer ${wardrobeState.finish === "glass"
                ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                }`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 mb-2">
                  Elite Luxury
                </span>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base">Profile Smoked Glass</h4>
                <p className="text-stone-500 text-[11px] mt-1 leading-relaxed">
                  Toughened smoked, black glass shutters in champagne gold or black aluminum frames. Includes sensor interior LED hanger rod lights.
                </p>
              </div>
              {/* <span className="text-xs text-primary font-bold mt-3 border-t border-stone-100 pt-2">₹950 / sq.ft</span> */}
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
