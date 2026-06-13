"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "@/data/interiorData";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";

interface ProjectsCatalogProps {
  projects: Project[];
}

export default function ProjectsCatalog({ projects }: ProjectsCatalogProps) {
  const { openQuoteModal } = useQuoteModal();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterTabs = [
    { label: "All Projects", id: "all" },
    { label: "Residential Design", id: "Residential" },
    { label: "Commercial Office", id: "Commercial" },
    { label: "Modular Kitchen", id: "Kitchen" },
  ];

  // Filter projects based on tab selection
  const filteredProjects = projects.filter((project) => {
    return selectedFilter === "all" || project.category === selectedFilter;
  });

  return (
    <>
      {/* 2. Interactive Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-stone-200 pb-6">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-5 py-2.5 text-xs font-bold rounded-lg transition duration-350 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
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
                  type="button"
                  onClick={() => openQuoteModal(`Inquiry about Project: ${project.title}`)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary border border-primary-cream transition hover:bg-primary hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  title="Request similar interior design"
                >
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </button>
              </div>

              <p className="text-stone-500 text-xs leading-relaxed border-t border-stone-100 pt-4">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
