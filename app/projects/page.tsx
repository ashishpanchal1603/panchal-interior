import React from "react";
import Image from "next/image";
import { projectsData } from "@/data/interiorData";
import ProjectsCatalog from "@/components/ProjectsCatalog";
import BookConsultationButton from "@/components/BookConsultationButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Completed Projects — Residential & Commercial Portfolio",
  description:
    "Explore our completed residential villas, corporate offices, sliding wardrobes, and modular kitchens across Satellite, Bopal, Gota, and Thaltej in Ahmedabad.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Completed Projects — Residential & Commercial Portfolio | Panchal Interior",
    description:
      "Explore our completed residential villas, corporate offices, sliding wardrobes, and modular kitchens across Satellite, Bopal, Gota, and Thaltej in Ahmedabad.",
    url: "https://panchal-interior.vercel.app/projects",
    siteName: "Panchal Interior",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://panchal-interior.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Panchal Interior Completed Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Completed Projects — Residential & Commercial Portfolio | Panchal Interior",
    description:
      "Explore our completed residential villas, corporate offices, sliding wardrobes, and modular kitchens across Satellite, Bopal, Gota, and Thaltej in Ahmedabad.",
    images: ["https://panchal-interior.vercel.app/og-image.jpg"],
  },
};

export default function ProjectsPage() {
  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-16 bg-stone-900 overflow-hidden text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Panchal Interior completed premium designs showcase portfolio"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-15"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-stone-900/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-md">
            Our Portfolio
          </span>
          <h1 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-5">
            Completed Masterpieces
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Take a tour of our premium interior design and furniture fabrication projects completed in Ahmedabad.
          </p>
        </div>
      </section>

      {/* 2. Interactive Filter Tabs & Projects Catalog */}
      <section className="max-w-7xl mx-auto px-5 mt-12">
        <ProjectsCatalog projects={projectsData} />
      </section>

      {/* Bottom CTA Quote */}
      <section className="max-w-4xl mx-auto px-5 mt-20 text-center">
        <div className="bg-stone-900 text-white rounded-2xl p-8 border border-stone-850 shadow-md">
          <h3 className="font-outfit text-xl font-bold">Love our work? Get a custom budget outline</h3>
          <p className="font-outfit text-sm text-stone-400 mt-2 max-w-sm mx-auto leading-relaxed">
            Let us draft a realistic material costing outline tailored to your floor plan dimensions.
          </p>
          <BookConsultationButton
            label="Request Site Budget Outline"
            productOrServiceName="Budget from projects page"
            className="font-outfit font-medium text-sm md:text-base mt-6 rounded-lg bg-primary hover:bg-primary-hover text-white py-2.5 px-6 cursor-pointer border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </section>
    </div>
  );
}
