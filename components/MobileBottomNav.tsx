"use client";

import React from "react";
import Link from "next/link";
import { Phone, Calculator, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useQuoteModal } from "./QuoteModalContext";

export default function MobileBottomNav() {
  const { openQuoteModal } = useQuoteModal();

  const handleEstimateScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const estimator = document.getElementById("cost-estimator");
    if (estimator) {
      e.preventDefault();
      estimator.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="flex items-center justify-between bg-stone-950/95 backdrop-blur-md border border-stone-800/80 px-4 py-2.5 rounded-2xl shadow-2xl max-w-md mx-auto">
        {/* Call Option */}
        <a
          href="tel:+919664956491"
          className="flex flex-col items-center justify-center text-stone-300 hover:text-white active:scale-95 transition-all py-1 px-2.5"
        >
          <Phone className="h-5 w-5 text-primary" />
          <span className="text-[10px] font-bold tracking-wide mt-1">Call Now</span>
        </a>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-stone-800" />

        {/* WhatsApp Option */}
        <a
          href="https://wa.me/919664956491?text=Hi%20Panchal%20Interior%20Studio%2C%0A%0AI%20need%20interior%2Ffurniture%20work.%0A%0ALocation%3A%20%0ARequirement%3A%20%0ABudget%3A%20%0APreferred%20Timeline%3A%20"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-stone-300 hover:text-white active:scale-95 transition-all py-1 px-2.5"
        >
          <FaWhatsapp className="h-5 w-5 text-emerald-500" />
          <span className="text-[10px] font-bold tracking-wide mt-1">WhatsApp</span>
        </a>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-stone-800" />

        {/* Calculator/Estimator Option */}
        <Link
          href="/#cost-estimator"
          onClick={handleEstimateScroll}
          className="flex flex-col items-center justify-center text-stone-300 hover:text-white active:scale-95 transition-all py-1 px-2.5"
        >
          <Calculator className="h-5 w-5 text-amber-500" />
          <span className="text-[10px] font-bold tracking-wide mt-1">Estimate</span>
        </Link>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-stone-800" />

        {/* Quote Button (Prominent Accent) */}
        <button
          onClick={() => openQuoteModal("Mobile Bottom Bar")}
          className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Send className="h-3.5 w-3.5" />
          <span>Get Quote</span>
        </button>
      </div>
    </div>
  );
}
