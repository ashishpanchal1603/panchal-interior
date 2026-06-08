"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projectsData } from "@/data/interiorData";
import { MapPin, Calendar, Compass, ArrowUpRight } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsPage() {
  const { openQuoteModal } = useQuoteModal();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterTabs = [
    { label: "All Projects", id: "all" },
    { label: "Residential Design", id: "Residential" },
    { label: "Commercial Office", id: "Commercial" },
    { label: "Modular Kitchen", id: "Kitchen" },
  ];

  // Filter projects based on tab selection
  const filteredProjects = projectsData.filter((project) => {
    return selectedFilter === "all" || project.category === selectedFilter;
  });

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-16 bg-stone-900 overflow-hidden text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-stone-900/80" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-md">
            Our Portfolio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-5">
            Completed Masterpieces
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Take a tour of our premium interior design and furniture fabrication projects completed in Ahmedabad.
          </p>
        </div>
      </section>

      {/* 2. Interactive Filter Tabs */}
      <section className="max-w-7xl mx-auto px-5 mt-12">
        <div className="flex flex-wrap justify-center gap-2 border-b border-stone-200 pb-6">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-5 py-2.5 text-xs font-bold rounded-lg transition duration-350 cursor-pointer ${
                selectedFilter === tab.id
                  ? "bg-primary text-white shadow"
                  : "text-stone-600 bg-white border border-stone-200 hover:border-stone-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3. Portfolio Projects Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group bg-white border border-stone-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                {/* Project Image Box */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-w-7xl) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 text-[10px] font-bold text-stone-900 bg-white/95 px-2.5 py-1 rounded shadow-sm">
                    {project.category}
                  </span>

                  {/* Year overlay */}
                  <span className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[10px] font-bold text-stone-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    Completed: {project.year}
                  </span>
                </div>

                {/* Text Content */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-primary transition leading-snug">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-1.5 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                    
                    {/* Action button */}
                    <button
                      onClick={() => openQuoteModal(`Inquiry about Project: ${project.title}`)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary border border-primary-cream transition hover:bg-primary hover:text-white cursor-pointer"
                      title="Request similar interior design"
                    >
                      <ArrowUpRight className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed border-t border-stone-100 pt-4">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Bottom CTA Quote */}
      <section className="max-w-4xl mx-auto px-5 mt-20 text-center">
        <div className="bg-stone-900 text-white rounded-2xl p-8 border border-stone-850 shadow-md">
          <h3 className="font-serif text-xl font-bold">Love our work? Get a custom budget outline</h3>
          <p className="text-stone-400 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
            Let us draft a realistic material costing outline tailored to your floor plan dimensions.
          </p>
          <button
            onClick={() => openQuoteModal()}
            className="mt-6 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 text-sm cursor-pointer"
          >
            Request Site Budget Outline
          </button>
        </div>
      </section>
    </div>
  );
}
