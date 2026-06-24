"use client";

import React from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import BookConsultationButton from "./BookConsultationButton";
import { MessageSquare, Calendar, Palette, Hammer, CheckSquare, ArrowRight } from "lucide-react";

export default function HowWeWork() {
  const steps = [
    {
      step: 1,
      title: "Consultation",
      desc: "Speak with our design experts to discuss your space requirements, preferences, and budget parameters.",
      icon: <MessageSquare className="h-5 w-5 text-primary" />
    },
    {
      step: 2,
      title: "Site Visit",
      desc: "We visit your property in Ahmedabad for precise digital measurements and physical space evaluation.",
      icon: <Calendar className="h-5 w-5 text-primary" />
    },
    {
      step: 3,
      title: "Design",
      desc: "Our design team creates personalized 3D models and layout blueprints of your interior/furniture.",
      icon: <Palette className="h-5 w-5 text-primary" />
    },
    {
      step: 4,
      title: "Manufacturing",
      desc: "We build all cabinets and units in our local factory with strict quality checks and premium plywood.",
      icon: <Hammer className="h-5 w-5 text-primary" />
    },
    {
      step: 5,
      title: "Installation",
      desc: "Complete on-site assembly, precise fitting, and handover by our expert in-house carpentry team.",
      icon: <CheckSquare className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200/40">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimateOnScroll variant="fadeInUp">
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1 rounded-full border border-primary/20">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-cormorant font-black text-stone-900 mt-4 leading-tight">
              Our 5-Step Work Method
            </h2>
            <p className="font-outfit text-sm md:text-base leading-relaxed text-stone-600 mt-3">
              How we execute projects from your initial request to the final clean handover.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-12 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-stone-100 z-0" />
          
          {steps.map((st, idx) => (
            <AnimateOnScroll
              key={st.step}
              variant="fadeInUp"
              delay={idx * 0.1}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Step Icon Circle */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-50 border border-stone-200 group-hover:border-primary group-hover:bg-primary-light shadow-sm transition duration-350">
                {st.icon}
              </div>

              {/* Number Circle Badge */}
              <div className="absolute top-12 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-[10px] font-black shadow-md border-2 border-white">
                {st.step}
              </div>

              {/* Step Details */}
              <h3 className="font-outfit font-semibold text-base md:text-lg leading-normal tracking-normal text-stone-900 mt-8 group-hover:text-primary transition duration-300">
                {st.title}
              </h3>
              <p className="font-outfit text-sm md:text-base leading-relaxed text-stone-600 mt-3 max-w-[200px] mx-auto">
                {st.desc}
              </p>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Call to Action Trigger */}
        <div className="mt-16 text-center">
          <BookConsultationButton
            label="Book Free Consultation"
            productOrServiceName="Process Timeline Consultation"
            className="font-outfit font-medium text-sm md:text-base group inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-hover text-white py-3.5 px-8 shadow-lg transition duration-300 cursor-pointer border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </div>
    </section>
  );
}
