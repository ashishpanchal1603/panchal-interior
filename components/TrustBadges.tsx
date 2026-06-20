"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function TrustBadges() {
  const trustPoints = [
    { title: "15+ Years Experience", desc: "Crafting custom interiors since 2011" },
    { title: "500+ Projects Completed", desc: "Delivered homes & commercial spaces" },
    { title: "1000+ Happy Clients", desc: "Over a decade of local trust & smiles" },
    { title: "Factory Direct Pricing", desc: "No middleman showroom markup" },
    { title: "Premium Materials", desc: "Marine grade ply & solid teak wood" },
    { title: "Free Site Visit", desc: "No-obligation digital measurements" },
    { title: "On-Time Delivery", desc: "Strictly guaranteed timeline policy" },
    { title: "End-To-End Execution", desc: "From blueprint design to final keys" }
  ];

  return (
    <section className="py-12 md:py-16 bg-stone-50 border-y border-stone-200/40">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <AnimateOnScroll variant="fadeInUp">
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1 rounded-full border border-primary/20">
              Our Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 mt-3 leading-tight">
              Why Homeowners Trust Panchal Interior Studio
            </h2>
          </AnimateOnScroll>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {trustPoints.map((point, idx) => (
            <AnimateOnScroll
              key={idx}
              variant="fadeInUp"
              delay={idx * 0.05}
              className="bg-white border border-stone-150 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-primary/25 transition duration-300 flex items-start gap-3"
            >
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                <CheckCircle className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm tracking-tight leading-tight">
                  {point.title}
                </h3>
                <p className="text-stone-400 text-[10px] sm:text-xs mt-1 leading-normal font-medium">
                  {point.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
