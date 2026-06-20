"use client";

import React from "react";
import { CheckCircle2, Gift, Sparkles, ArrowRight } from "lucide-react";
import { useQuoteModal } from "./QuoteModalContext";
import AnimateOnScroll from "./AnimateOnScroll";

export default function LeadMagnet() {
  const { openQuoteModal } = useQuoteModal();

  const offers = [
    {
      title: "Free Site Visit",
      desc: "Detailed digital measurements at your home or office space.",
    },
    {
      title: "Free Design Consultation",
      desc: "1-on-1 session with our senior architectural design experts.",
    },
    {
      title: "Free 3D Design Guidance",
      desc: "Get layout options and material selection walkthroughs.",
    },
    {
      title: "Free Estimate & Costing",
      desc: "Transparent itemized quotation with zero hidden charges.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="bg-stone-950/80 border border-stone-800 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-10 items-center justify-between">
          
          {/* Text block */}
          <div className="lg:max-w-2xl space-y-6 text-left">
            <AnimateOnScroll variant="fadeInUp">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary/15 border border-primary/20 px-3 py-1.5 rounded-md">
                <Gift className="h-4 w-4" /> Limited Time Package Offer
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mt-4 leading-tight">
                Claim Your Free Design & Estimate Bundle
              </h2>
              <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                Planning your home interior? Skip the expensive consultancies. Get direct factory-level design guidance, site measurements, and detailed cost outlines entirely free.
              </p>
            </AnimateOnScroll>

            {/* Features check grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {offers.map((off, idx) => (
                <AnimateOnScroll
                  key={idx}
                  variant="fadeInUp"
                  delay={idx * 0.05}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm leading-none">{off.title}</h3>
                    <p className="text-stone-500 text-xs mt-1 leading-normal">{off.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Action Callbox */}
          <div className="shrink-0 w-full lg:w-auto">
            <AnimateOnScroll
              variant="fadeInUp"
              delay={0.2}
              className="bg-stone-900 border border-stone-850 rounded-2xl p-6 text-center space-y-6 max-w-sm mx-auto shadow-inner"
            >
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-black text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded">
                  🟢 100% Free - No Commitment
                </span>
                <p className="text-xs text-stone-400 max-w-[240px] mx-auto leading-relaxed pt-2">
                  No payment cards or down payments needed. Book now and our supervisor will contact you within 24 hours.
                </p>
              </div>

              <button
                type="button"
                onClick={() => openQuoteModal("Free Growth Design Bundle")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-6 shadow-md transition duration-300 text-sm cursor-pointer border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Claim Free Bundle Offer
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 font-semibold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Premium Teak & Plywood Woodworks
              </div>
            </AnimateOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}
