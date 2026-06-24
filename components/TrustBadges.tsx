"use client";

import React from "react";
import {
  Award,
  Briefcase,
  Users,
  Tag,
  Gem,
  MapPin,
  Clock,
  Layers
} from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function TrustBadges() {
  const trustPoints = [
    {
      title: "15+ Years Experience",
      desc: "Crafting custom interiors since 2011",
      icon: <Award className="h-5 w-5" />
    },
    {
      title: "500+ Projects Completed",
      desc: "Delivered homes & commercial spaces",
      icon: <Briefcase className="h-5 w-5" />
    },
    {
      title: "1000+ Happy Clients",
      desc: "Over a decade of local trust & smiles",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Factory Direct Pricing",
      desc: "No middleman showroom markup",
      icon: <Tag className="h-5 w-5" />
    },
    {
      title: "Premium Materials",
      desc: "Marine grade ply & solid teak wood",
      icon: <Gem className="h-5 w-5" />
    },
    {
      title: "Free Site Visit",
      desc: "No-obligation digital measurements",
      icon: <MapPin className="h-5 w-5" />
    },
    {
      title: "On-Time Delivery",
      desc: "Strictly guaranteed timeline policy",
      icon: <Clock className="h-5 w-5" />
    },
    {
      title: "End-To-End Execution",
      desc: "From blueprint design to final keys",
      icon: <Layers className="h-5 w-5" />
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-stone-50 border-y border-stone-200/40">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <AnimateOnScroll variant="fadeInUp">
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-md">
              Our Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-cormorant font-black text-stone-900 mt-4 leading-tight">
              Why Homeowners Trust Panchal Interior
            </h2>
          </AnimateOnScroll>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {trustPoints.map((point, idx) => (
            <AnimateOnScroll
              key={idx}
              variant="fadeInUp"
              delay={idx * 0.05}
              className="bg-white border border-stone-200/60 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 group cursor-default"
            >
              {/* Dynamic Icon Container with scale/rotate transition on hover */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5 transition duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-105 group-hover:rotate-3 shadow-inner">
                {point.icon}
              </div>
              <div>
                <h3 className="font-cormorant font-bold text-stone-900 text-xs sm:text-sm tracking-tight leading-tight group-hover:text-primary transition duration-300">
                  {point.title}
                </h3>
                <p className="text-stone-400 text-[10px] sm:text-xs mt-1.5 leading-relaxed font-medium">
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
