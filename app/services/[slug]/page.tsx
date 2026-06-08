"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/interiorData";
import { 
  CheckCircle, 
  ArrowLeft, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  MessageSquareCode
} from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { motion } from "framer-motion";

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const service = servicesData.find((s) => s.slug === slug);
  const { openQuoteModal } = useQuoteModal();

  // Accordion state for FAQs
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  if (!service) {
    notFound();
  }

  const toggleFaq = (idx: number) => {
    if (openFaqIdx === idx) {
      setOpenFaqIdx(null);
    } else {
      setOpenFaqIdx(idx);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-stone-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url('${service.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-stone-900/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-5">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-white text-xs font-bold uppercase tracking-wider transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-5xl font-extrabold text-white"
          >
            {service.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-stone-300 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* 2. Content Section */}
      <section className="max-w-7xl mx-auto px-5 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left 2 Cols: Main Info */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Features Block */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Service Overview & Specifications
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              We deliver premium-grade construction and finishes custom-made in our local workshop. When choosing Panchal Interior for {service.name}, you are guaranteed durability, fine wood craftsmanship, and zero middleman markup.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {service.features.map((feat, i) => (
                <div key={i} className="flex gap-3 items-start bg-stone-50 p-4 rounded-xl border border-stone-100/50">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-stone-700 text-sm font-medium leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Workflow Section */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Our Step-By-Step Execution Process
            </h2>
            <div className="relative border-l border-stone-200 pl-6 ml-4 space-y-8 mt-8">
              {service.process.map((p, idx) => (
                <div key={p.step} className="relative group">
                  {/* Step Bubble */}
                  <span className="absolute -left-10 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-bold shadow-md">
                    0{p.step}
                  </span>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base group-hover:text-primary transition">
                      {p.title}
                    </h3>
                    <p className="text-stone-500 text-sm mt-1.5 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          {service.faqs.length > 0 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-100 pb-3">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3 mt-6">
                {service.faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    className="border border-stone-200/80 rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      className="w-full flex justify-between items-center bg-stone-50 hover:bg-stone-100/60 p-4.5 text-left text-stone-800 text-sm font-semibold transition"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="h-4.5 w-4.5 text-primary shrink-0" />
                        {faq.question}
                      </span>
                      {openFaqIdx === i ? <ChevronUp className="h-4.5 w-4.5 text-stone-500" /> : <ChevronDown className="h-4.5 w-4.5 text-stone-500" />}
                    </button>
                    {openFaqIdx === i && (
                      <div className="p-5 bg-white text-stone-600 text-sm leading-relaxed border-t border-stone-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right 1 Col: Sticky Contact Card */}
        <div className="space-y-6">
          <div className="sticky top-28 bg-stone-900 text-white rounded-2xl p-6 shadow-lg border border-stone-800 overflow-hidden relative">
            {/* Background design */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#a17a4c_1px,transparent_1px)] [background-size:12px_12px]" />
            
            <h3 className="font-serif text-xl font-bold text-white relative z-10">
              Request Site Measurement
            </h3>
            <p className="text-stone-400 text-xs mt-2 leading-relaxed relative z-10">
              We send our senior supervisor to your site in Ahmedabad for free measurement and material discussion.
            </p>

            <ul className="space-y-4 my-6 text-xs text-stone-300 border-t border-stone-800 pt-6 relative z-10">
              <li className="flex gap-2.5 items-center">
                <Calendar className="h-4.5 w-4.5 text-primary shrink-0" />
                <span>Available Mon - Sat (9am - 6pm)</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <MessageSquareCode className="h-4.5 w-4.5 text-primary shrink-0" />
                <span>3D design estimate options within 3 days</span>
              </li>
            </ul>

            <button
              onClick={() => openQuoteModal(`${service.name} Service`)}
              className="w-full rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 shadow-md transition text-sm relative z-10 cursor-pointer"
            >
              Book Consultation Now
            </button>
            
            <a
              href="tel:+919876543210"
              className="block w-full text-center mt-3 text-xs text-stone-400 hover:text-white underline transition relative z-10"
            >
              Call for quick booking
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
