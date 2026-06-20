"use client";

import React, { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import { Sparkles } from "lucide-react";
import { useQuoteModal } from "./QuoteModalContext";

interface ProjectTransformation {
  id: string;
  title: string;
  subtitle: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export default function BeforeAfterSection() {
  const { openQuoteModal } = useQuoteModal();
  const transformations: ProjectTransformation[] = [
    {
      id: "modular-kitchen",
      title: "Modular Kitchen Transformation",
      subtitle: "BWP Waterproof Plywood & Acrylic Setup",
      beforeLabel: "Before: Raw Plywood Framing",
      afterLabel: "After: Premium Acrylic Kitchen",
      beforeImage: "/images/modular_kitchen_carpenter_1.png",
      afterImage: "/images/modular_kitchen.png",
      description: "We replaced a traditional, moisture-damaged kitchen with waterproof marine plywood carcasses and mirror-finish German acrylic shutters fitted with soft-close Hettich tandem drawers."
    },
    {
      id: "tv-unit-paneling",
      title: "Living Room Wall TV Console",
      subtitle: "Concealed Wiring & Veneer Paneling",
      beforeLabel: "Before: On-Site Framing Work",
      afterLabel: "After: Floating LED Console",
      beforeImage: "/images/tv_unit_carpenter_1.png",
      afterImage: "/images/tv_unit.png",
      description: "A blank plaster wall transformed with Action Tesa HDMR backing panels, pre-installed cable conduits, floating drawers, and warm indirect LED strip backlighting."
    },
    {
      id: "wardrobe-closet",
      title: "Bedroom Wardrobe Suite",
      subtitle: "High-Capacity Sliding profile Setup",
      beforeLabel: "Before: Closet Frame Construction",
      afterLabel: "After: Profile Glass Closet",
      beforeImage: "/images/wardrobe_carpenter_1.png",
      afterImage: "/images/wardrobe_walkin.png",
      description: "An empty room alcove turned into a high-capacity walk-in wardrobe styled with champagne-gold aluminum profile glass doors and smart sensor LED hanging rods."
    }
  ];

  // Keep track of which state is active ('before' or 'after') for each project card
  const [activeStates, setActiveStates] = useState<Record<string, "before" | "after">>({
    "modular-kitchen": "after",
    "tv-unit-paneling": "after",
    "wardrobe-closet": "after"
  });

  const toggleState = (projectId: string, state: "before" | "after") => {
    setActiveStates((prev) => ({
      ...prev,
      [projectId]: state
    }));
  };

  return (
    <section className="py-16 md:py-24 bg-stone-50 border-y border-stone-200/50 text-left">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4" /> Before & After
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 mt-2 leading-tight">
            Real Home Transformations
          </h2>
          <p className="text-stone-500 text-sm mt-3">
            See how we transform raw carpenter-made frames from our Gota workshop into premium finished spaces. Click tabs to toggle comparison.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {transformations.map((proj) => {
            const currentState = activeStates[proj.id];
            const isBefore = currentState === "before";
            const currentImg = isBefore ? proj.beforeImage : proj.afterImage;

            return (
              <AnimateOnScroll
                key={proj.id}
                variant="fadeInUp"
                className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                {/* Visual Area */}
                <div>
                  <div className="relative h-64 sm:h-72 w-full bg-stone-100 overflow-hidden shrink-0">
                    <Image
                      src={currentImg}
                      alt={`${proj.title} ${isBefore ? "construction" : "completed"}`}
                      fill
                      sizes="(max-w-7xl) 33vw, 50vw"
                      className="object-cover transition-all duration-300"
                    />

                    {/* State Badge Overlay */}
                    <span
                      className={`absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded shadow z-10 text-white ${isBefore ? "bg-amber-600" : "bg-primary"
                        }`}
                    >
                      {isBefore ? "🔨 Construction Phase" : "✨ Completed Work"}
                    </span>

                    {/* Floating Toggle Buttons Inside Image */}
                    <div className="absolute bottom-4 right-4 z-10 flex bg-stone-950/80 p-1 rounded-xl backdrop-blur-sm border border-stone-800">
                      <button
                        type="button"
                        onClick={() => toggleState(proj.id, "before")}
                        className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg transition-all ${isBefore ? "bg-amber-600 text-white" : "text-stone-400 hover:text-stone-200"
                          }`}
                      >
                        Before
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleState(proj.id, "after")}
                        className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg transition-all ${!isBefore ? "bg-primary text-white" : "text-stone-400 hover:text-stone-200"
                          }`}
                      >
                        After
                      </button>
                    </div>
                  </div>

                  {/* Copy Details */}
                  <div className="p-6 space-y-3">
                    <span className="block text-[10px] font-bold text-primary uppercase tracking-widest">
                      {proj.subtitle}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {proj.title}
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-stone-50 mt-2">
                  <span className="text-[10px] font-semibold text-stone-400">
                    📍 Factory Direct Rate
                  </span>
                  <button
                    type="button"
                    onClick={() => openQuoteModal(proj.title)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover transition cursor-pointer bg-transparent border-none p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Get Free Quote &rarr;
                  </button>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
