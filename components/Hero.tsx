"use client";

import Link from "next/link";
import { ArrowRight, Award, Briefcase, ShieldCheck, Clock } from "lucide-react";
import { statsData } from "@/data/interiorData";
import { useQuoteModal } from "./QuoteModalContext";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Hero() {
  const { openQuoteModal } = useQuoteModal();

  // Map icons from strings
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="h-6 w-6 text-primary" />;
      case "Briefcase":
        return <Briefcase className="h-6 w-6 text-primary" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-6 w-6 text-primary" />;
      case "Clock":
        return <Clock className="h-6 w-6 text-primary" />;
      default:
        return <Award className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <section className="relative h-[650px] w-full overflow-hidden bg-stone-900 flex items-center">
      {/* Background Image with Dark Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105"
        style={{
          backgroundImage: "url('/images/hero.png')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 w-full pt-10">
        <div className="max-w-2xl text-left">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-md mb-5"
          >
            Complete Home Solutions
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight"
          >
            Custom Furniture & <br />
            <span className="text-primary">Interior Design</span> Solutions
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-300 text-base sm:text-lg mt-6 leading-relaxed"
          >
            We create beautiful, functional and comfortable spaces that reflect your unique style and personality. Built to last with factory-direct rates in Ahmedabad.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={() => openQuoteModal()}
              className="group flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-7 shadow-lg transition duration-300 cursor-pointer"
            >
              Get Free Quote
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            {/* <a
              href="https://wa.me/919876543210?text=Hello%20Panchal%20Interior%2C%20I'd%20like%20to%20get%20information%20about%20your%20furniture%20manufacturing%20and%20design%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-7 backdrop-blur-sm transition duration-300"
            >
              <FaWhatsapp className="h-5 w-5 text-emerald-400" />
              WhatsApp Us
            </a> */}
          </motion.div>
        </div>
      </div>

      {/* Floating Indicators (Mock Dots from screenshot) */}
      <div className="absolute bottom-6 right-8 z-10 flex gap-2">
        <button aria-label="Slide 1" className="h-2 w-2 rounded-full bg-primary" />
        <button aria-label="Slide 2" className="h-2 w-2 rounded-full bg-white/50 hover:bg-white transition" />
        <button aria-label="Slide 3" className="h-2 w-2 rounded-full bg-white/50 hover:bg-white transition" />
      </div>

      {/* Stats Section Overlay (Bottom Bar) */}
      <div className="absolute bottom-0 left-0 w-full z-10 bg-black/40 border-t border-white/10 backdrop-blur-md hidden md:block">
        <div className="max-w-7xl mx-auto px-5 py-5 grid grid-cols-4 gap-6">
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3.5 border-r border-white/10 last:border-r-0 pl-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-primary">
                {getIcon(stat.icon)}
              </div>
              <div>
                <span className="block text-xl font-extrabold text-white leading-none">
                  {stat.value}
                </span>
                <span className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mt-1">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}