  "use client";

  import { useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import {
    Home,
    CookingPot,
    DoorClosed,
    Ruler,
    Sparkles,
    Phone,
    User,
    Mail,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    HelpCircle,
    TrendingUp,
    Layout,
    Calculator,
    MessageSquare,
    ChevronRight,
  } from "lucide-react";
  import { useQuoteModal } from "./QuoteModalContext";

  type CalculatorType = "full" | "kitchen" | "wardrobe" | null;

  interface FullHomeState {
    bhk: string;
    packageTier: "essentials" | "premium" | "elite";
    scope: string[];
  }

  interface KitchenState {
    layout: "l-shape" | "straight" | "u-shape" | "parallel";
    lengthA: number; // in feet
    lengthB: number; // in feet
    finish: "laminate" | "acrylic" | "glass";
  }

  interface WardrobeState {
    type: "swing" | "sliding" | "walk-in";
    width: number; // in feet
    height: number; // in feet
    finish: "laminate" | "acrylic" | "glass";
  }

  export default function InteriorEstimator() {
    const { openQuoteModal } = useQuoteModal();
    const [calcType, setCalcType] = useState<CalculatorType>(null);
    const [step, setStep] = useState(1);

    // Lead Contact Form
    const [leadName, setLeadName] = useState("");
    const [leadPhone, setLeadPhone] = useState("");
    const [leadEmail, setLeadEmail] = useState("");
    const [leadMessage, setLeadMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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
      finish: "acrylic",
    });

    // 3. Wardrobe State
    const [wardrobeState, setWardrobeState] = useState<WardrobeState>({
      type: "sliding",
      width: 6,
      height: 9.5,
      finish: "acrylic",
    });

    // Pricing constants & calculation helpers
    const BHK_PRICES: Record<string, number> = {
      "1bhk": 180000,
      "2bhk-small": 260000,
      "2bhk-large": 320000,
      "3bhk-small": 390000,
      "3bhk-large": 450000,
      "4bhk": 580000,
      "5bhk": 750000,
    };

    const PACKAGE_MULTIPLIERS = {
      essentials: 1.0,
      premium: 1.45,
      elite: 2.1,
    };

    const SCOPE_PERCENTAGES: Record<string, number> = {
      living: 0.25,
      master: 0.25,
      kids: 0.20,
      kitchen: 0.20,
      dining: 0.10,
    };

    const calculateFullHomePrice = () => {
      const base = BHK_PRICES[fullState.bhk] || 250000;
      const mult = PACKAGE_MULTIPLIERS[fullState.packageTier];
      const scopeSum = fullState.scope.reduce((acc, curr) => acc + (SCOPE_PERCENTAGES[curr] || 0), 0);
      const scopeAdjustment = scopeSum === 0 ? 0.1 : scopeSum; // minimum 10% if nothing is checked

      const calculated = base * mult * scopeAdjustment;
      const low = Math.round(calculated * 0.9);
      const high = Math.round(calculated * 1.1);
      return { low, high };
    };

    const calculateKitchenPrice = () => {
      const layoutMultiplier = {
        "straight": 1.0,
        "l-shape": 1.4,
        "parallel": 1.6,
        "u-shape": 2.0,
      }[kitchenState.layout];

      const finishRate = {
        laminate: 1800,
        acrylic: 2900,
        glass: 4200,
      }[kitchenState.finish];

      let totalLength = kitchenState.lengthA;
      if (kitchenState.layout === "l-shape" || kitchenState.layout === "parallel") {
        totalLength = kitchenState.lengthA + kitchenState.lengthB;
      } else if (kitchenState.layout === "u-shape") {
        totalLength = kitchenState.lengthA + kitchenState.lengthB + 6; // assume standard 6ft bridging counter
      }

      const baseCost = totalLength * finishRate * layoutMultiplier;
      const installationAndCarcass = 35000;
      const calculated = baseCost + installationAndCarcass;

      const low = Math.round(calculated * 0.95);
      const high = Math.round(calculated * 1.15); // kitchen fitting buffer
      return { low, high };
    };

    const calculateWardrobePrice = () => {
      const typeFactor = {
        swing: 1.0,
        sliding: 1.2,
        "walk-in": 1.5,
      }[wardrobeState.type];

      const finishRate = {
        laminate: 450,
        acrylic: 680,
        glass: 950,
      }[wardrobeState.finish];

      const sqft = wardrobeState.width * wardrobeState.height;
      const baseCost = sqft * finishRate * typeFactor;
      const installAndHardware = 15000;
      const calculated = baseCost + installAndHardware;

      const low = Math.round(calculated * 0.9);
      const high = Math.round(calculated * 1.1);
      return { low, high };
    };

    const getPriceRange = () => {
      if (calcType === "full") return calculateFullHomePrice();
      if (calcType === "kitchen") return calculateKitchenPrice();
      if (calcType === "wardrobe") return calculateWardrobePrice();
      return { low: 0, high: 0 };
    };

    // Step controls
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
    };

    const handleLeadSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!leadName || !leadPhone) {
        alert("Please fill in your name and phone number.");
        return;
      }
      setIsSubmitting(true);

      // Simulate submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    };

    const formatPrice = (num: number) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(num);
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
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-stone-100 shadow-xl overflow-hidden min-h-[500px] flex flex-col">

            {/* Progress Bar (Visible inside wizard) */}
            {calcType && !isSubmitted && (
              <div className="bg-stone-50 border-b border-stone-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-primary transition disabled:opacity-30 disabled:hover:text-stone-600"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>

                {/* Steps circles */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step === s
                        ? "bg-primary text-white scale-110 shadow-sm"
                        : step > s
                          ? "bg-primary-cream text-primary border border-primary/20"
                          : "bg-stone-100 text-stone-400"
                        }`}>
                        {s}
                      </div>
                      {s < 4 && (
                        <div className={`w-6 sm:w-12 h-0.5 transition-colors duration-300 ${step > s ? "bg-primary/50" : "bg-stone-100"
                          }`} />
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
            <div className="p-6 sm:p-10 flex-grow flex flex-col justify-center">
              <AnimatePresence mode="wait">

                {/* STEP 0: Select Calculator Type */}
                {calcType === null && (
                  <motion.div
                    key="calc-select"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-10"
                  >
                    <div className="text-center">
                      <h3 className="font-serif text-2xl font-bold text-stone-900">
                        What would you like to design?
                      </h3>
                      <p className="text-stone-500 text-sm mt-2">
                        Choose one options below to start your budget estimation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Option 1: Full Home */}
                      <button
                        onClick={() => { setCalcType("full"); setStep(1); }}
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
                        onClick={() => { setCalcType("kitchen"); setStep(1); }}
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
                            Calculate structural modular kitchen pricing based on Layout types (L, U, Straight), running foot length and finishes.
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                          Calculate <ChevronRight className="h-3 w-3" />
                        </span>
                      </button>

                      {/* Option 3: Custom Wardrobe */}
                      <button
                        onClick={() => { setCalcType("wardrobe"); setStep(1); }}
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

                {/* FLOW 1: FULL HOME INTERIORS */}
                {calcType === "full" && (
                  <div key="full-home-flow">
                    {/* Step 1: BHK Type */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center md:text-left">
                          <h3 className="font-serif text-2xl font-bold text-stone-900">Select your BHK Type</h3>
                          <p className="text-stone-500 text-sm mt-1">Please select the overall size configuration of your property.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            { id: "1bhk", title: "1 BHK", desc: "Cozy layout" },
                            { id: "2bhk-small", title: "2 BHK (Small)", desc: "Below 1000 sq.ft." },
                            { id: "2bhk-large", title: "2 BHK (Large)", desc: "Above 1000 sq.ft." },
                            { id: "3bhk-small", title: "3 BHK (Small)", desc: "Below 1500 sq.ft." },
                            { id: "3bhk-large", title: "3 BHK (Large)", desc: "Above 1500 sq.ft." },
                            { id: "4bhk", title: "4 BHK", desc: "Premium layout" },
                            { id: "5bhk", title: "5 BHK+", desc: "Luxury duplex/villa" }
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setFullState({ ...fullState, bhk: item.id })}
                              className={`p-5 text-left border rounded-xl transition duration-200 cursor-pointer ${fullState.bhk === item.id
                                ? "border-primary bg-primary-light/35 shadow-sm"
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
                            onClick={nextStep}
                            className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition flex items-center gap-1 cursor-pointer"
                          >
                            Next Step <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Quality/Package Tier */}
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center md:text-left">
                          <h3 className="font-serif text-2xl font-bold text-stone-900">Choose Quality & Package</h3>
                          <p className="text-stone-500 text-sm mt-1">Select structural materials, hardware finishes, and custom styling budgets.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Essentials */}
                          <button
                            onClick={() => setFullState({ ...fullState, packageTier: "essentials" })}
                            className={`p-6 text-left border rounded-xl flex flex-col justify-between transition h-80 cursor-pointer ${fullState.packageTier === "essentials"
                              ? "border-primary bg-primary-light/35 shadow-md"
                              : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                              }`}
                          >
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 mb-4">
                                Essentials
                              </span>
                              <h4 className="font-bold text-stone-900 text-lg">Value & Durability</h4>
                              <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                                Standard Commercial MR Plywood, durable matte laminates, and reliable local brand hardware. Focuses on high utility and functional budgeting.
                              </p>
                            </div>
                            <ul className="text-xs text-stone-600 space-y-1.5 mt-4">
                              <li className="flex items-center gap-1.5">✓ Standard Laminates</li>
                              <li className="flex items-center gap-1.5">✓ High Durability</li>
                              <li className="flex items-center gap-1.5">✓ 5 Years Warranty</li>
                            </ul>
                          </button>

                          {/* Premium */}
                          <button
                            onClick={() => setFullState({ ...fullState, packageTier: "premium" })}
                            className={`p-6 text-left border rounded-xl flex flex-col justify-between transition h-80 relative cursor-pointer ${fullState.packageTier === "premium"
                              ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                              : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                              }`}
                          >
                            <span className="absolute -top-3 left-6 inline-block bg-primary text-white px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                              Most Popular
                            </span>
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary-light text-primary mb-4 mt-1">
                                Premium
                              </span>
                              <h4 className="font-bold text-stone-900 text-lg">Sleek & Stylized</h4>
                              <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                                BWR/BWP Marine Plywood, soft-close hardware (Hettich/Hafele), high-gloss acrylic shutters, false ceiling with cove lighting and premium wall paints.
                              </p>
                            </div>
                            <ul className="text-xs text-stone-600 space-y-1.5 mt-4">
                              <li className="flex items-center gap-1.5">✓ High Gloss Acrylics</li>
                              <li className="flex items-center gap-1.5">✓ Soft-Close German Hardware</li>
                              <li className="flex items-center gap-1.5">✓ False Ceiling + Cove Lighting</li>
                            </ul>
                          </button>

                          {/* Elite */}
                          <button
                            onClick={() => setFullState({ ...fullState, packageTier: "elite" })}
                            className={`p-6 text-left border rounded-xl flex flex-col justify-between transition h-80 cursor-pointer ${fullState.packageTier === "elite"
                              ? "border-primary bg-primary-light/35 shadow-md"
                              : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                              }`}
                          >
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 mb-4">
                                Elite Luxury
                              </span>
                              <h4 className="font-bold text-stone-900 text-lg">Bespoke Architectural</h4>
                              <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                                BWP Marine Ply, customized natural veneers, metallic profile smoked glass doors, designer quartz stone, integrated smart lighting profiles, and premium PU polish.
                              </p>
                            </div>
                            <ul className="text-xs text-stone-600 space-y-1.5 mt-4">
                              <li className="flex items-center gap-1.5">✓ Walnut/Oak Veneers & PU Polish</li>
                              <li className="flex items-center gap-1.5">✓ Glass Profile Shutters</li>
                              <li className="flex items-center gap-1.5">✓ End-to-End Bespoke Design</li>
                            </ul>
                          </button>
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            onClick={nextStep}
                            className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition flex items-center gap-1 cursor-pointer"
                          >
                            Next Step <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Scope of Work */}
                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center md:text-left">
                          <h3 className="font-serif text-2xl font-bold text-stone-900">Select Scope of Work</h3>
                          <p className="text-stone-500 text-sm mt-1">Check the rooms you want to design. Pricing adjustments will update dynamically.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            { id: "living", title: "Living Room Design", desc: "TV Panel, Sofa Set, Wallpaper, Ceiling", pct: "25%" },
                            { id: "master", title: "Master Bedroom", desc: "Teak Bed, Hydraulic Storage, 3-Door Sliding Wardrobe", pct: "25%" },
                            { id: "kids", title: "Kids Bedroom", desc: "Bed, Wardrobe, Integrated Study Console", pct: "20%" },
                            { id: "kitchen", title: "Modular Kitchen", desc: "Soft-Close Cabinets, Baskets, Chimney", pct: "20%" },
                            { id: "dining", title: "Dining & Crockery Area", desc: "Dining Table & Chairs, Glass Crockery Unit", pct: "10%" }
                          ].map((item) => {
                            const isSelected = fullState.scope.includes(item.id);
                            return (
                              <button
                                key={item.id}
                                onClick={() => {
                                  if (isSelected) {
                                    setFullState({
                                      ...fullState,
                                      scope: fullState.scope.filter((s) => s !== item.id),
                                    });
                                  } else {
                                    setFullState({
                                      ...fullState,
                                      scope: [...fullState.scope, item.id],
                                    });
                                  }
                                }}
                                className={`p-5 text-left border rounded-xl flex justify-between items-start transition duration-200 cursor-pointer ${isSelected
                                  ? "border-primary bg-primary-light/35 shadow-sm"
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
                            onClick={nextStep}
                            className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition flex items-center gap-1 cursor-pointer"
                          >
                            Get Estimate <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* FLOW 2: MODULAR KITCHEN */}
                {calcType === "kitchen" && (
                  <div key="kitchen-flow">
                    {/* Step 1: Layout */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center md:text-left">
                          <h3 className="font-serif text-2xl font-bold text-stone-900">Select Kitchen Layout</h3>
                          <p className="text-stone-500 text-sm mt-1">Please select the layout configuration of your counter space.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                          {[
                            {
                              id: "straight",
                              title: "Straight Kitchen",
                              desc: "Compact single counter",
                              diagram: (
                                <div className="w-full h-12 bg-stone-100 rounded-lg flex items-center px-4">
                                  <div className="h-4 w-full bg-primary/70 rounded border border-primary-hover" />
                                </div>
                              )
                            },
                            {
                              id: "l-shape",
                              title: "L-Shaped Kitchen",
                              desc: "Fits corners perfectly",
                              diagram: (
                                <div className="w-full h-12 bg-stone-100 rounded-lg relative">
                                  <div className="absolute left-4 bottom-2 top-2 w-4 bg-primary/70 rounded border border-primary-hover" />
                                  <div className="absolute left-4 bottom-2 right-4 h-4 bg-primary/70 rounded border border-primary-hover" />
                                </div>
                              )
                            },
                            {
                              id: "parallel",
                              title: "Parallel Kitchen",
                              desc: "Dual counter efficiency",
                              diagram: (
                                <div className="w-full h-12 bg-stone-100 rounded-lg relative flex flex-col justify-between py-2 px-4">
                                  <div className="h-3 w-full bg-primary/70 rounded border border-primary-hover" />
                                  <div className="h-3 w-full bg-primary/70 rounded border border-primary-hover" />
                                </div>
                              )
                            },
                            {
                              id: "u-shape",
                              title: "U-Shaped Kitchen",
                              desc: "Maximum workspace",
                              diagram: (
                                <div className="w-full h-12 bg-stone-100 rounded-lg relative">
                                  <div className="absolute left-4 top-2 bottom-2 w-4 bg-primary/70 rounded border border-primary-hover" />
                                  <div className="absolute left-4 right-4 top-2 h-4 bg-primary/70 rounded border border-primary-hover" />
                                  <div className="absolute right-4 top-2 bottom-2 w-4 bg-primary/70 rounded border border-primary-hover" />
                                </div>
                              )
                            }
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setKitchenState({ ...kitchenState, layout: item.id as KitchenState["layout"] })}
                              className={`p-6 text-left border rounded-xl flex flex-col justify-between transition h-56 cursor-pointer ${kitchenState.layout === item.id
                                ? "border-primary bg-primary-light/35 shadow-md"
                                : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                                }`}
                            >
                              <div>
                                <span className="block font-bold text-stone-900 text-sm sm:text-base leading-tight">{item.title}</span>
                                <span className="block text-stone-400 text-xs mt-1 leading-relaxed">{item.desc}</span>
                              </div>
                              <div className="mt-4">{item.diagram}</div>
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            onClick={nextStep}
                            className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition flex items-center gap-1 cursor-pointer"
                          >
                            Next Step <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Measurements */}
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center md:text-left">
                          <h3 className="font-serif text-2xl font-bold text-stone-900">Define Kitchen Dimensions</h3>
                          <p className="text-stone-500 text-sm mt-1">Specify counter lengths for accurate estimation calculations (in feet).</p>
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
                              onChange={(e) => setKitchenState({ ...kitchenState, lengthA: parseInt(e.target.value) })}
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
                                onChange={(e) => setKitchenState({ ...kitchenState, lengthB: parseInt(e.target.value) })}
                                className="w-full accent-primary h-2 bg-stone-200 rounded-lg cursor-pointer"
                              />
                            </div>
                          )}

                          <div className="bg-white border border-stone-200 rounded-xl p-4 flex gap-3 items-center">
                            <Ruler className="h-5 w-5 text-primary shrink-0" />
                            <p className="text-xs text-stone-500 leading-relaxed">
                              💡 **Ahmedabad Standard Sizing:** Typical counters have a 2-foot depth and a 34-inch height. We assume standard base cabinets and top hydraulic wall cupboards in calculations.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            onClick={nextStep}
                            className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition flex items-center gap-1 cursor-pointer"
                          >
                            Next Step <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Finishes */}
                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center md:text-left">
                          <h3 className="font-serif text-2xl font-bold text-stone-900">Choose Shutter Materials & Finish</h3>
                          <p className="text-stone-500 text-sm mt-1">Select the look and longevity tier of your modular kitchen doors.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Laminate / Matte */}
                          <button
                            onClick={() => setKitchenState({ ...kitchenState, finish: "laminate" })}
                            className={`p-6 text-left border rounded-xl flex flex-col justify-between transition h-72 cursor-pointer ${kitchenState.finish === "laminate"
                              ? "border-primary bg-primary-light/35 shadow-md"
                              : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                              }`}
                          >
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 mb-4">
                                Essentials
                              </span>
                              <h4 className="font-bold text-stone-900 text-lg">Matte Laminate</h4>
                              <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                                0.8mm Merinolam/Century laminates. Scratch-proof, heat-proof, and budget-friendly. Excellent for heavy daily Indian cooking.
                              </p>
                            </div>
                            <span className="text-xs text-primary font-bold mt-4">₹1,800 / running ft</span>
                          </button>

                          {/* Acrylic / Glossy */}
                          <button
                            onClick={() => setKitchenState({ ...kitchenState, finish: "acrylic" })}
                            className={`p-6 text-left border rounded-xl flex flex-col justify-between transition h-72 cursor-pointer ${kitchenState.finish === "acrylic"
                              ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                              : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                              }`}
                          >
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary-light text-primary mb-4">
                                Premium Choice
                              </span>
                              <h4 className="font-bold text-stone-900 text-lg">High-Gloss Acrylic</h4>
                              <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                                1.2mm anti-scratch German acrylic doors. Sleek reflective mirror finish that makes compact kitchens look spacious and upscale.
                              </p>
                            </div>
                            <span className="text-xs text-primary font-bold mt-4">₹2,900 / running ft</span>
                          </button>

                          {/* Glass Profile / Elite */}
                          <button
                            onClick={() => setKitchenState({ ...kitchenState, finish: "glass" })}
                            className={`p-6 text-left border rounded-xl flex flex-col justify-between transition h-72 cursor-pointer ${kitchenState.finish === "glass"
                              ? "border-primary bg-primary-light/35 shadow-md"
                              : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                              }`}
                          >
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 mb-4">
                                Elite Luxury
                              </span>
                              <h4 className="font-bold text-stone-900 text-lg">Glass Profile Shutters</h4>
                              <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                                Premium dark-tinted or frosted glass panes mounted in sleek matte black aluminum profile frames. Includes interior shelf sensor lights.
                              </p>
                            </div>
                            <span className="text-xs text-primary font-bold mt-4">₹4,200 / running ft</span>
                          </button>
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            onClick={nextStep}
                            className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition flex items-center gap-1 cursor-pointer"
                          >
                            Get Estimate <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* FLOW 3: CUSTOM WARDROBES */}
                {calcType === "wardrobe" && (
                  <div key="wardrobe-flow">
                    {/* Step 1: Type Selection */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center md:text-left">
                          <h3 className="font-serif text-2xl font-bold text-stone-900">Select Wardrobe Style</h3>
                          <p className="text-stone-500 text-sm mt-1">Please select the structural opening doors configuration.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { id: "swing", title: "Swing Door Wardrobe", desc: "Classic hinges, full cabinet accessibility. Most customizable inside." },
                            { id: "sliding", title: "Sliding Door Wardrobe", desc: "Sleek sliding doors. Space-saving layout ideal for tight bedroom clearance." },
                            { id: "walk-in", title: "Premium Walk-In Closet", desc: "Open partition cabinetry layout, dedicated modular dressing shelves." }
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setWardrobeState({ ...wardrobeState, type: item.id as WardrobeState["type"] })}
                              className={`p-6 text-left border rounded-xl flex flex-col justify-between transition h-52 cursor-pointer ${wardrobeState.type === item.id
                                ? "border-primary bg-primary-light/35 shadow-md"
                                : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                                }`}
                            >
                              <div>
                                <span className="block font-bold text-stone-900 text-lg leading-tight">{item.title}</span>
                                <p className="text-stone-500 text-xs mt-3 leading-relaxed">{item.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            onClick={nextStep}
                            className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition flex items-center gap-1 cursor-pointer"
                          >
                            Next Step <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Measurements */}
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center md:text-left">
                          <h3 className="font-serif text-2xl font-bold text-stone-900">Define Wardrobe Sizing</h3>
                          <p className="text-stone-500 text-sm mt-1">Specify custom width and height requirements (in feet).</p>
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
                              onChange={(e) => setWardrobeState({ ...wardrobeState, width: parseInt(e.target.value) })}
                              className="w-full accent-primary h-2 bg-stone-200 rounded-lg cursor-pointer"
                            />
                          </div>

                          {/* Height Select */}
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                              Cabinet Height:
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                              {[
                                { label: "7 ft (Standard)", val: 7 },
                                { label: "8 ft (Semi-Loft)", val: 8 },
                                { label: "9.5 ft (Ceiling Loft)", val: 9.5 }
                              ].map((hOpt) => (
                                <button
                                  key={hOpt.val}
                                  type="button"
                                  onClick={() => setWardrobeState({ ...wardrobeState, height: hOpt.val })}
                                  className={`py-2.5 px-2 text-center text-xs font-semibold rounded-lg border transition ${wardrobeState.height === hOpt.val
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
                              💡 **Panchal Craftsmanship:** Height above 8.5 feet usually includes a structural loft bridge division to prevent door panel warping and maximize overhead suitcase luggage storage.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            onClick={nextStep}
                            className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition flex items-center gap-1 cursor-pointer"
                          >
                            Next Step <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Finishes */}
                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center md:text-left">
                          <h3 className="font-serif text-2xl font-bold text-stone-900">Choose Door Finish</h3>
                          <p className="text-stone-500 text-sm mt-1">Select outer surfacing materials for design aesthetics and durability.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Laminate */}
                          <button
                            onClick={() => setWardrobeState({ ...wardrobeState, finish: "laminate" })}
                            className={`p-6 text-left border rounded-xl flex flex-col justify-between transition h-72 cursor-pointer ${wardrobeState.finish === "laminate"
                              ? "border-primary bg-primary-light/35 shadow-md"
                              : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                              }`}
                          >
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 mb-4">
                                Matte Laminate
                              </span>
                              <h4 className="font-bold text-stone-900 text-lg">Textured Laminates</h4>
                              <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                                0.8mm Century woodgrain or linen textured laminates. Highly scratch resistant and easy to clean. Perfect for standard wardrobes.
                              </p>
                            </div>
                            <span className="text-xs text-primary font-bold mt-4">₹450 / sq.ft</span>
                          </button>

                          {/* Acrylic */}
                          <button
                            onClick={() => setWardrobeState({ ...wardrobeState, finish: "acrylic" })}
                            className={`p-6 text-left border rounded-xl flex flex-col justify-between transition h-72 cursor-pointer ${wardrobeState.finish === "acrylic"
                              ? "border-primary bg-primary-light/35 shadow-md ring-1 ring-primary"
                              : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                              }`}
                          >
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary-light text-primary mb-4">
                                Premium Glossy
                              </span>
                              <h4 className="font-bold text-stone-900 text-lg">Glossy Acrylic Panels</h4>
                              <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                                1.2mm acrylic sheets with mirror-like luster. Gives bedrooms a luxurious, shiny reflective surface that enhances visual space.
                              </p>
                            </div>
                            <span className="text-xs text-primary font-bold mt-4">₹680 / sq.ft</span>
                          </button>

                          {/* Glass */}
                          <button
                            onClick={() => setWardrobeState({ ...wardrobeState, finish: "glass" })}
                            className={`p-6 text-left border rounded-xl flex flex-col justify-between transition h-72 cursor-pointer ${wardrobeState.finish === "glass"
                              ? "border-primary bg-primary-light/35 shadow-md"
                              : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                              }`}
                          >
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 mb-4">
                                Elite Luxury
                              </span>
                              <h4 className="font-bold text-stone-900 text-lg font-serif">Profile Smoked Glass</h4>
                              <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                                Toughened smoked, black glass shutters in champagne gold or black aluminum frames. Includes sensor interior LED hanger rod lights.
                              </p>
                            </div>
                            <span className="text-xs text-primary font-bold mt-4">₹950 / sq.ft</span>
                          </button>
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            onClick={nextStep}
                            className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 shadow-md transition flex items-center gap-1 cursor-pointer"
                          >
                            Get Estimate <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* STEP 4: REAL-TIME QUOTE & CONTACT CAPTURE */}
                {calcType && step === 4 && !isSubmitted && (
                  <motion.div
                    key="lead-capture"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
                  >
                    {/* Left Column: Cost Display Card */}
                    <div className="md:col-span-5 bg-stone-950 text-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-lg border border-stone-850">
                      {/* Radial Background Accent */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a17a4c_1px,transparent_1px)] [background-size:12px_12px]" />

                      <div className="relative z-10 space-y-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                          Estimated Range
                        </span>

                        <div>
                          <h4 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            {formatPrice(getPriceRange().low)}
                            <span className="text-stone-500 text-base font-normal block mt-1">to</span>
                            {formatPrice(getPriceRange().high)}
                          </h4>
                          <p className="text-[11px] text-stone-400 mt-2">
                            *Estimated price includes basic carpentry, core BWR material carcasses, hinges, edgeband gluing, and on-site alignment. Exact prices depend on final measurements and appliance choices.
                          </p>
                        </div>

                        {/* Selection Summary */}
                        <div className="border-t border-stone-800/80 pt-6 space-y-3">
                          <h5 className="text-xs font-bold uppercase tracking-widest text-stone-400">Configuration Details</h5>
                          <ul className="text-xs text-stone-300 space-y-2">
                            {calcType === "full" && (
                              <>
                                <li>🏠 Config: <span className="font-bold text-white capitalize">{fullState.bhk.replace("-", " ")}</span></li>
                                <li>💎 Package: <span className="font-bold text-white capitalize">{fullState.packageTier}</span></li>
                                <li>🛠️ Included: <span className="font-bold text-white">{fullState.scope.length} rooms</span></li>
                              </>
                            )}
                            {calcType === "kitchen" && (
                              <>
                                <li>📐 Layout: <span className="font-bold text-white capitalize">{kitchenState.layout.replace("-", " ")}</span></li>
                                <li>📏 Length: <span className="font-bold text-white">{kitchenState.lengthA}ft {kitchenState.layout !== "straight" ? `x ${kitchenState.lengthB}ft` : ""}</span></li>
                                <li>✨ Shutter Finish: <span className="font-bold text-white capitalize">{kitchenState.finish}</span></li>
                              </>
                            )}
                            {calcType === "wardrobe" && (
                              <>
                                <li>🚪 Style: <span className="font-bold text-white capitalize">{wardrobeState.type.replace("-", " ")}</span></li>
                                <li>📏 Size: <span className="font-bold text-white">{wardrobeState.width}W x {wardrobeState.height}H ft</span></li>
                                <li>✨ Shutter Finish: <span className="font-bold text-white capitalize">{wardrobeState.finish}</span></li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="relative z-10 pt-8 border-t border-stone-850 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-[10px] text-stone-400">Prices match direct-factory rates in Gota workshop, Ahmedabad.</span>
                      </div>
                    </div>

                    {/* Right Column: Lead Capture Form */}
                    <div className="md:col-span-7 flex flex-col justify-center">
                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                        <div className="mb-2">
                          <h4 className="text-xl font-bold text-stone-900">Request Detailed Quote</h4>
                          <p className="text-xs text-stone-500 mt-1">Submit your details to get a free site measurement session and fully customized 3D CAD sketch design.</p>
                        </div>

                        {/* Name Field */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. Ashish Panchal"
                              value={leadName}
                              onChange={(e) => setLeadName(e.target.value)}
                              className="w-full rounded-lg border border-stone-200 pl-10 pr-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm transition"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Phone Field */}
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                              Phone Number *
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                              <input
                                type="tel"
                                required
                                placeholder="e.g. +91 99251 11438"
                                value={leadPhone}
                                onChange={(e) => setLeadPhone(e.target.value)}
                                className="w-full rounded-lg border border-stone-200 pl-10 pr-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm transition"
                              />
                            </div>
                          </div>

                          {/* Email Field */}
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                              <input
                                type="email"
                                placeholder="e.g. ashish@gmail.com"
                                value={leadEmail}
                                onChange={(e) => setLeadEmail(e.target.value)}
                                className="w-full rounded-lg border border-stone-200 pl-10 pr-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm transition"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Message/Comments */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                            Project details / notes (Optional)
                          </label>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                            <textarea
                              rows={2}
                              placeholder="Add layout specifications, site area, preferred wood type, or timeline details..."
                              value={leadMessage}
                              onChange={(e) => setLeadMessage(e.target.value)}
                              className="w-full rounded-lg border border-stone-200 pl-10 pr-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm resize-none transition"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 px-6 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
                        >
                          {isSubmitting ? "Generating Plan..." : "Submit Quote Request"}
                          {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}

                {/* SUCCESS / COMPLETED STATE */}
                {isSubmitted && (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-10 max-w-md mx-auto space-y-6"
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <CheckCircle className="h-10 w-10 animate-bounce" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-stone-900">Estimation Submitted!</h3>
                      <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                        Thank you, <span className="font-bold text-stone-800">{leadName}</span>. Your estimate of{" "}
                        <span className="font-bold text-primary">{formatPrice(getPriceRange().low)} - {formatPrice(getPriceRange().high)}</span>{" "}
                        has been logged. Our design engineer will reach out to you within 24 hours at{" "}
                        <span className="font-bold text-stone-800">{leadPhone}</span> to arrange a free on-site measurement verification.
                      </p>
                    </div>

                    <div className="pt-6 flex gap-4 justify-center">
                      <button
                        onClick={resetEstimator}
                        className="rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold py-2.5 px-5 text-sm transition cursor-pointer"
                      >
                        Calculate Another Layout
                      </button>
                      <button
                        onClick={() => openQuoteModal()}
                        className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-5 text-sm transition cursor-pointer"
                      >
                        Consult Now
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Reset/Cancel button bottom bar (shown if calculator selected) */}
            {calcType && !isSubmitted && (
              <div className="bg-stone-50 border-t border-stone-100 px-8 py-4 flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>*Prices shown are estimates for Gota, Ahmedabad home interior services.</span>
                <button
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
