"use client";

import React from "react";
import { FaInstagram } from "react-icons/fa";
import { Camera, Calendar, Play, Layers, RefreshCw } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function InstagramGrowth() {
  const schedule = [
    {
      day: "Monday",
      theme: "Modular Kitchen",
      desc: "Video tours of completed German high-gloss acrylic kitchens and modular pull-outs.",
      icon: <Play className="h-5 w-5 text-primary" />
    },
    {
      day: "Wednesday",
      theme: "Wardrobe & Closet",
      desc: "Behind-the-scenes carpentry assembly of sliding profile glass wardrobes.",
      icon: <Layers className="h-5 w-5 text-primary" />
    },
    {
      day: "Friday",
      theme: "TV Unit Paneling",
      desc: "Highlighting veneer and marble board paneling layout transformations.",
      icon: <Camera className="h-5 w-5 text-primary" />
    },
    {
      day: "Sunday",
      theme: "Before & After Stories",
      desc: "Interactive before-after carpentry comparisons directly from Gota factory sites.",
      icon: <RefreshCw className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-stone-900 text-white relative overflow-hidden border-y border-stone-950">
      {/* Background Subtle Highlights */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#a17a4c_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (5 Cols) - Marketing Copy */}
          <div className="lg:col-span-5 space-y-6">
            <AnimateOnScroll variant="fadeInUp">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-md">
                <FaInstagram className="h-4 w-4" /> Social Proof & Updates
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mt-4 leading-tight">
                Follow Our Design Journey On Instagram
              </h2>
              <p className="text-stone-400 text-sm sm:text-base leading-relaxed mt-4">
                Watch our skilled local carpenters bring complex 3D blueprints to life. We document raw timber works, veneer selections, paint polishes, and completed home handovers daily.
              </p>
              <div className="pt-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-amber-500 hover:opacity-95 text-white font-bold py-3.5 px-7 shadow-lg transition duration-300 text-sm cursor-pointer"
                >
                  <FaInstagram className="h-5 w-5" />
                  Follow @PanchalInteriorStudio
                </a>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column (7 Cols) - Content Calendar Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {schedule.map((item, idx) => (
              <AnimateOnScroll
                key={idx}
                variant="fadeInUp"
                delay={idx * 0.05}
                className="bg-stone-950/60 border border-stone-800/80 hover:border-primary/30 rounded-2xl p-6 shadow-md transition duration-300 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 border border-stone-800 text-primary shadow-inner">
                    {item.icon}
                  </div>
                  <span className="flex items-center gap-1.5 text-[9px] font-bold text-stone-500 uppercase tracking-widest bg-stone-900 px-2.5 py-1 rounded">
                    <Calendar className="h-3.5 w-3.5 text-primary" /> {item.day}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-white font-bold text-base">{item.theme}</h3>
                  <p className="text-stone-400 text-xs mt-2.5 leading-relaxed">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
