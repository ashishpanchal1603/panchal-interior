"use client";

import React from "react";
import { Star, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaWhatsapp, FaGoogle } from "react-icons/fa";
import AnimateOnScroll from "./AnimateOnScroll";

export default function GoogleBusinessProfile() {
  const actions = [
    {
      title: "View Google Reviews",
      desc: "Check our 5-star ratings and read feedback from 120+ local families.",
      icon: <FaGoogle className="h-5 w-5 text-blue-600" />,
      cta: "Read Reviews",
      href: "https://g.page/r/PanchalInteriorStudio",
      color: "hover:border-blue-500/30 hover:bg-blue-50/5",
    },
    {
      title: "Get Location Directions",
      desc: "Visit our Gota workshop & experience materials live in our gallery showroom.",
      icon: <MapPin className="h-5 w-5 text-red-500" />,
      cta: "Get Directions",
      href: "https://maps.google.com/?q=Panchal+Interior+Gota+Ahmedabad",
      color: "hover:border-red-500/30 hover:bg-red-50/5",
    },
    {
      title: "WhatsApp Business Chat",
      desc: "Send us layout sketches or photographs for quick feedback from our designers.",
      icon: <FaWhatsapp className="h-5 w-5 text-emerald-500" />,
      cta: "Start Chat",
      href: "https://wa.me/919664956491?text=Hi%20Panchal%20Interior%20Studio%2C%20I%20found%20your%20business%20on%20Google.%20I%20would%20like%20to%20discuss%20my%20interior%20project.",
      color: "hover:border-emerald-500/30 hover:bg-emerald-50/5",
    },
    {
      title: "Call Direct Helpline",
      desc: "Speak with Mr. Amit Panchal for quick answers regarding budgets and timelines.",
      icon: <Phone className="h-5 w-5 text-primary" />,
      cta: "Call +91 96649 56491",
      href: "tel:+919664956491",
      color: "hover:border-primary/30 hover:bg-primary-light/5",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-stone-50 border-t border-stone-200/40">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Google rating summary */}
          <div className="lg:col-span-5 space-y-6">
            <AnimateOnScroll variant="fadeInUp">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3.5 py-1.5 rounded-md border border-primary/10">
                <FaGoogle className="h-3.5 w-3.5 text-primary" /> Google Business Profile
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 mt-4 leading-tight">
                Connect With Our Showroom & Workshop
              </h2>
              <p className="text-stone-500 text-sm sm:text-base leading-relaxed mt-4">
                We believe in complete transparency. Check our live location, read verified customer reviews, or connect with our designers immediately via phone or WhatsApp.
              </p>
              
              {/* Stars badge */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center pt-4">
                <div className="bg-white border border-stone-200 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                  <div className="text-center">
                    <span className="block text-3xl font-black text-stone-900 leading-none">5.0</span>
                    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1 block">Rating</span>
                  </div>
                  <div className="border-l border-stone-200 h-10" />
                  <div>
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4.5 w-4.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-stone-600 font-semibold mt-1.5 block">100% verified local reviews</span>
                  </div>
                </div>
                
                <div className="text-xs text-stone-400 font-medium max-w-xs leading-relaxed">
                  Located near Gota Bridge, Ahmedabad. Open Monday to Saturday, 9:00 AM to 8:00 PM. Visitors are welcome to inspect raw timber and modular materials.
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column - Grid of Actions */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {actions.map((act, idx) => (
              <AnimateOnScroll
                key={idx}
                variant="fadeInUp"
                delay={idx * 0.05}
                className={`bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between ${act.color}`}
              >
                <div className="space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-50 border border-stone-150 shadow-inner">
                    {act.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-stone-900 font-bold text-base leading-snug">{act.title}</h3>
                    <p className="text-stone-500 text-xs mt-2 leading-relaxed">{act.desc}</p>
                  </div>
                </div>
                
                <div className="pt-6">
                  <a
                    href={act.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-950 hover:text-primary transition group cursor-pointer"
                  >
                    {act.cta}
                    <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
