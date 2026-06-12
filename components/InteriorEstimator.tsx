"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  CookingPot,
  DoorClosed,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { useQuoteModal } from "./QuoteModalContext";

// Modular Estimator Imports
import {
  CalculatorType,
  FullHomeState,
  KitchenState,
  WardrobeState,
} from "./estimator/types";
import PreviewPanel from "./estimator/PreviewPanel";
import FullHomeFlow from "./estimator/FullHomeFlow";
import KitchenFlow from "./estimator/KitchenFlow";
import WardrobeFlow from "./estimator/WardrobeFlow";
import LeadForm from "./estimator/LeadForm";
import SuccessState from "./estimator/SuccessState";

export default function InteriorEstimator() {
  const { openQuoteModal } = useQuoteModal();
  const [calcType, setCalcType] = useState<CalculatorType>(null);
  const [step, setStep] = useState(1);

  // Lead Contact Form State
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic Hover states for Preview Panel
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // 1. Full Home State
  const [fullState, setFullState] = useState<FullHomeState>({
    bhk: "2bhk-small",
    packageTier: "premium",
    scope: ["living", "master", "kitchen", "dining"],
  });

  // 2. Kitchen State
  const [kitchenState, setKitchenState] = useState<KitchenState>({
    layout: "l-shape",
    lengthA: 10,
    lengthB: 8,
    lengthC: 8, // Initialized for C-Type/U-Shape
    finish: "acrylic",
  });

  // 3. Wardrobe State
  const [wardrobeState, setWardrobeState] = useState<WardrobeState>({
    type: "sliding",
    width: 6,
    height: 9.5,
    finish: "acrylic",
  });

  // Navigation handlers
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));
  const resetEstimator = () => {
    setCalcType(null);
    setStep(1);
    setIsSubmitted(false);
    setLeadName("");
    setLeadPhone("");
    setLeadEmail("");
    setLeadMessage("");
    setHoveredItem(null);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      alert("Please fill in your name and phone number.");
      return;
    }
    setIsSubmitting(true);

    try {
      const details =
        calcType === "full"
          ? fullState
          : calcType === "kitchen"
            ? kitchenState
            : wardrobeState;

      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadName,
          leadPhone,
          leadEmail,
          leadMessage,
          calcType,
          details,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Lead submission failed:", error);
      alert("Failed to submit inquiry. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cost-estimator" className="py-24 bg-stone-50 border-y border-stone-200/50">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light px-3 py-1 rounded-full border border-primary/20">
            Design Budget Planner
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 mt-4 leading-tight">
            Estimate Your Interior Cost
          </h2>
          <p className="text-stone-500 text-sm sm:text-base mt-4">
            Get an instant estimate for your modular kitchen, custom wardrobe, or full home interiors matching your specifications.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className=" mx-auto bg-white rounded-3xl border border-stone-100 shadow-xl overflow-hidden min-h-[520px] md:min-h-[620px] flex flex-col">

          {/* Progress Bar (Visible inside active wizard flows) */}
          {calcType && !isSubmitted && (
            <div className="bg-stone-50 border-b border-stone-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4 select-none">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-primary transition disabled:opacity-30 disabled:hover:text-stone-600 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              {/* Progress Steps Circles */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step === s
                        ? "bg-primary text-white scale-110 shadow-sm"
                        : step > s
                          ? "bg-primary-cream text-primary border border-primary/20"
                          : "bg-stone-100 text-stone-400"
                        }`}
                    >
                      {s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`w-6 sm:w-12 h-0.5 transition-colors duration-300 ${step > s ? "bg-primary/50" : "bg-stone-100"
                          }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Step {step} of 4
              </div>
            </div>
          )}

          {/* Main Wizard Content Area */}
          <div className="flex-grow flex flex-col justify-center p-0">
            <AnimatePresence mode="wait">

              {/* STEP 0: Select Calculator Type */}
              {calcType === null && (
                <motion.div
                  key="calc-select"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-10 p-6 sm:p-10"
                >
                  <div className="text-center">
                    <h3 className="font-serif text-2xl font-bold text-stone-900">
                      What would you like to design?
                    </h3>
                    <p className="text-stone-500 text-sm mt-2">
                      Choose one option below to start your budget estimation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Option 1: Full Home */}
                    <button
                      type="button"
                      onClick={() => { setCalcType("full"); setStep(1); }}
                      onMouseEnter={() => setHoveredItem("full")}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="group p-8 text-left border border-stone-200/80 hover:border-primary rounded-2xl bg-white hover:bg-stone-50/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer h-72"
                    >
                      <div className="h-14 w-14 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition duration-300">
                        <Home className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-primary transition">
                          Full Home Interiors
                        </h4>
                        <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                          Get an approximate costing for your complete apartment or villa woodworks, ceiling, paints & modular fittings.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                        Calculate <ChevronRight className="h-3 w-3" />
                      </span>
                    </button>

                    {/* Option 2: Modular Kitchen */}
                    <button
                      type="button"
                      onClick={() => { setCalcType("kitchen"); setStep(1); }}
                      onMouseEnter={() => setHoveredItem("kitchen")}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="group p-8 text-left border border-stone-200/80 hover:border-primary rounded-2xl bg-white hover:bg-stone-50/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer h-72"
                    >
                      <div className="h-14 w-14 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition duration-300">
                        <CookingPot className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-primary transition">
                          Modular Kitchen
                        </h4>
                        <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                          Calculate structural modular kitchen pricing based on Layout types (L, U, Straight, Parallel), running foot length and finishes.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                        Calculate <ChevronRight className="h-3 w-3" />
                      </span>
                    </button>

                    {/* Option 3: Custom Wardrobe */}
                    <button
                      type="button"
                      onClick={() => { setCalcType("wardrobe"); setStep(1); }}
                      onMouseEnter={() => setHoveredItem("wardrobe")}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="group p-8 text-left border border-stone-200/80 hover:border-primary rounded-2xl bg-white hover:bg-stone-50/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer h-72"
                    >
                      <div className="h-14 w-14 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition duration-300">
                        <DoorClosed className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-primary transition">
                          Custom Wardrobes
                        </h4>
                        <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                          Plan wardrobe budgeting by specifying sliding or swing styles, width, height, and laminated, acrylic, or glass doors.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                        Calculate <ChevronRight className="h-3 w-3" />
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* FLOW 1-3 active wizard steps (showing Split Layout with PreviewPanel) */}
              {calcType && !isSubmitted && step < 4 && (
                <div key={`${calcType}-flow-split`} className="grid grid-cols-1 md:grid-cols-10 h-full flex-grow items-stretch">
                  {/* Left Column: Visual dynamic preview panel */}
                  <div className="col-span-1 md:col-span-4 h-full">
                    <PreviewPanel
                      calcType={calcType}
                      step={step}
                      fullState={fullState}
                      kitchenState={kitchenState}
                      wardrobeState={wardrobeState}
                      hoveredItem={hoveredItem}
                    />
                  </div>

                  {/* Right Column: interactive step content */}
                  <div className="col-span-1 md:col-span-6 p-6 sm:p-8 flex flex-col justify-center bg-white">
                    {calcType === "full" && (
                      <FullHomeFlow
                        step={step}
                        fullState={fullState}
                        onChange={setFullState}
                        nextStep={nextStep}
                        setHoveredItem={setHoveredItem}
                      />
                    )}
                    {calcType === "kitchen" && (
                      <KitchenFlow
                        step={step}
                        kitchenState={kitchenState}
                        onChange={setKitchenState}
                        nextStep={nextStep}
                        setHoveredItem={setHoveredItem}
                      />
                    )}
                    {calcType === "wardrobe" && (
                      <WardrobeFlow
                        step={step}
                        wardrobeState={wardrobeState}
                        onChange={setWardrobeState}
                        nextStep={nextStep}
                        setHoveredItem={setHoveredItem}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: LEAD CONTACT & DETAILED QUOTE PANEL */}
              {calcType && step === 4 && !isSubmitted && (
                <div key="lead-form-wrapper" className="p-6 sm:p-10 flex flex-col items-center">
                  <LeadForm
                    calcType={calcType}
                    fullState={fullState}
                    kitchenState={kitchenState}
                    wardrobeState={wardrobeState}
                    leadName={leadName}
                    leadPhone={leadPhone}
                    leadEmail={leadEmail}
                    leadMessage={leadMessage}
                    isSubmitting={isSubmitting}
                    onChangeName={setLeadName}
                    onChangePhone={setLeadPhone}
                    onChangeEmail={setLeadEmail}
                    onChangeMessage={setLeadMessage}
                    onSubmit={handleLeadSubmit}
                  />
                </div>
              )}

              {/* SUCCESS STATE */}
              {isSubmitted && (
                <div key="success-state-wrapper" className="p-6 sm:p-10 flex flex-col justify-center">
                  <SuccessState
                    leadName={leadName}
                    leadPhone={leadPhone}
                    calcType={calcType!}
                    fullState={fullState}
                    kitchenState={kitchenState}
                    wardrobeState={wardrobeState}
                    onReset={resetEstimator}
                    openQuoteModal={openQuoteModal}
                  />
                </div>
              )}

            </AnimatePresence>
          </div>

          {/* Reset footer bar */}
          {calcType && !isSubmitted && (
            <div className="bg-stone-50 border-t border-stone-100 px-8 py-4 flex items-center justify-between text-xs text-stone-500 font-medium select-none">
              <span>*Submit your specifications to get a customized estimate based on Gota, Ahmedabad factory rates.</span>
              <button
                type="button"
                onClick={resetEstimator}
                className="text-primary hover:underline font-bold bg-transparent border-0 cursor-pointer"
              >
                Reset & Choose Layout
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
