"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LandingPageConfig, areasWeServe, landingPagesData } from "@/data/localSeoData";
import FaqAccordion from "./FaqAccordion";
import BookConsultationButton from "./BookConsultationButton";
import AnimateOnScroll from "./AnimateOnScroll";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  HelpCircle,
  ShieldCheck,
  Wrench,
  Gem,
  Tag,
  CheckCircle,
  ChevronRight,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface LandingPageTemplateProps {
  config: LandingPageConfig;
}

export default function AhmedabadLandingTemplate({ config }: LandingPageTemplateProps) {
  // Conversion Optimization Badges data
  const conversionBadges = [
    { title: "Free Site Visit", desc: " Ahmedabad measurements", icon: <MapPin className="h-6 w-6 text-primary" /> },
    { title: "Free Consultation", desc: "Expert material review", icon: <HelpCircle className="h-6 w-6 text-primary" /> },
    { title: "Factory Direct Pricing", desc: "No middleman markup", icon: <Tag className="h-6 w-6 text-primary" /> },
    { title: "Custom Manufacturing", desc: "100% made to order", icon: <Wrench className="h-6 w-6 text-primary" /> },
    { title: "Premium Materials", desc: "CP teak & BWR plywood", icon: <Gem className="h-6 w-6 text-primary" /> },
    { title: "On-Time Delivery", desc: "Guaranteed handover", icon: <Clock className="h-6 w-6 text-primary" /> }
  ];

  // Breadcrumbs Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://panchalinterior.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": config.h1,
        "item": `https://panchalinterior.com/${config.slug}`
      }
    ]
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Panchal Interior ",
    "image": "https://panchalinterior.com/images/hero.png",
    "@id": `https://panchalinterior.com/${config.slug}/#localbusiness`,
    "url": `https://panchalinterior.com/${config.slug}`,
    "telephone": "+919664956491",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Panchal Complex, Near Gota Bridge, Gota",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "382481",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.083652879129598,
      "longitude": 72.52989107604581
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": ["https://facebook.com", "https://instagram.com", "https://youtube.com"]
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": config.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-primary selection:text-stone-950">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c")
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c")
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c")
        }}
      />

      {/* 0. Breadcrumb Nav */}
      <nav aria-label="Breadcrumb" className="bg-stone-50 border-b border-stone-200/60 py-3.5 px-5">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-stone-400 text-[10px] uppercase font-bold tracking-wider">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="h-3 w-3 text-stone-300" />
          <span className="text-stone-700">{config.h1}</span>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative py-24 md:py-32 bg-stone-900 overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <Image
            src={config.hero.image}
            alt={`${config.h1} - Panchal Interior Ahmedabad`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 text-left w-full">
          <AnimateOnScroll variant="fadeInUp">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-md mb-6">
              📍 Ahmedabad Local Service Hub
            </span>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeInUp" delay={0.1}>
            <h1 className="font-serif text-3.5xl sm:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl">
              {config.h1}
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeInUp" delay={0.2}>
            <p className="text-stone-300 text-sm sm:text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
              {config.hero.subtitle}
            </p>
          </AnimateOnScroll>

          {/* CTA Buttons */}
          <AnimateOnScroll variant="fadeInUp" delay={0.3} className="mt-10 flex flex-wrap gap-4 items-center">
            <BookConsultationButton
              label="Get Free Quote"
              productOrServiceName={`${config.h1} Page`}
              className="rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-8 text-sm shadow-lg transition duration-300 cursor-pointer border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <a
              href="tel:+919664956491"
              className="rounded-xl border border-stone-500 hover:border-white hover:bg-stone-800 text-white font-bold py-3.5 px-6 text-sm flex items-center justify-center gap-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href="https://wa.me/919664956491?text=Hi%20Panchal%20Interior%20%2C%0A%0AI%20need%20interior%2Ffurniture%20work.%0A%0ALocation%3A%20%0ARequirement%3A%20%0ABudget%3A%20%0APreferred%20Timeline%3A%20"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 text-sm flex items-center justify-center gap-2 shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 2. Conversion Optimization Highlights Grid */}
      <section className="bg-stone-50 border-b border-stone-200/50 py-10 px-5 relative z-20 -mt-8 max-w-6.5xl mx-auto rounded-2xl shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {conversionBadges.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center p-2.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm border border-stone-100 mb-3">
                {badge.icon}
              </div>
              <span className="block font-bold text-stone-900 text-xs sm:text-sm">{badge.title}</span>
              <span className="block text-stone-400 text-[10px] mt-1 leading-normal font-medium">{badge.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Why Choose Panchal Interior */}
      <section className="py-20 max-w-7xl mx-auto px-5 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Why Choose Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
              {config.whyChooseUs.title}
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              {config.whyChooseUs.description}
            </p>
            <div className="pt-4">
              <BookConsultationButton
                label="Book Free Consultation"
                productOrServiceName={`Workshop Visit - ${config.h1}`}
                className="rounded-lg bg-stone-900 hover:bg-stone-850 text-white font-bold py-3 px-5 text-xs shadow transition cursor-pointer border-none"
              />
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {config.whyChooseUs.points.map((pt, idx) => (
              <div key={idx} className="bg-stone-50 border border-stone-100 rounded-xl p-6 shadow-sm space-y-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary font-bold text-sm">
                  ✓
                </div>
                <h3 className="font-bold text-stone-900 text-sm mt-3">{pt.title}</h3>
                <p className="text-stone-500 text-xs leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Benefits */}
      <section className="py-20 bg-stone-50 border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-5 text-left">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Premium Features</span>
            <h2 className="font-serif text-3xl font-extrabold text-stone-900 mt-2">{config.benefits.title}</h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-2">{config.benefits.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.benefits.items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 border border-stone-150 shadow-sm space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle className="h-5.5 w-5.5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base">{item.title}</h3>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process */}
      <section className="py-20 max-w-7xl mx-auto px-5 text-left">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Workflow Timeline</span>
          <h2 className="font-serif text-3xl font-extrabold text-stone-900 mt-2">{config.process.title}</h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2">{config.process.description}</p>
        </div>

        <div className="relative border-l border-stone-200 pl-8 ml-4 md:ml-8 space-y-10 max-w-4xl mx-auto">
          {config.process.steps.map((st) => (
            <div key={st.step} className="relative group">
              <span className="absolute -left-12.5 md:-left-12.5 top-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white text-xs font-bold shadow-md">
                0{st.step}
              </span>
              <div>
                <h3 className="font-bold text-stone-900 text-base group-hover:text-primary transition">
                  {st.title}
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Popular Designs */}
      <section className="py-20 bg-stone-50 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-5 text-left">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Trending Concepts</span>
            <h2 className="font-serif text-3xl font-extrabold text-stone-900 mt-2">{config.popularDesigns.title}</h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-2">{config.popularDesigns.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.popularDesigns.items.map((item, idx) => (
              <div key={idx} className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-w-7xl) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-primary transition leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded">
                      ✔ Factory Direct
                    </span>
                    <BookConsultationButton
                      label="Get Free Quote"
                      productOrServiceName={`${item.title} Setup`}
                      className="text-xs font-bold text-primary hover:underline cursor-pointer bg-transparent border-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Areas We Serve */}
      <section className="py-20 max-w-7xl mx-auto px-5 text-left border-b border-stone-200/50">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Neighborhood Services</span>
          <h2 className="font-serif text-3xl font-extrabold text-stone-900 mt-2">Areas We Serve in Ahmedabad</h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2">
            Panchal Interior offers free site visits, consultations, and quick shipping to all major locations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {areasWeServe.map((area, idx) => (
            <div key={idx} className="bg-stone-50/50 border border-stone-150 rounded-xl p-4.5 space-y-1.5">
              <span className="block font-serif font-bold text-stone-900 text-sm">📍 {area.name}</span>
              <span className="block text-stone-400 text-[10px] leading-normal">{area.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-5 text-left">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest font-mono">Got Questions?</span>
          <h2 className="font-serif text-3xl font-extrabold text-stone-900 mt-2">Frequently Asked Questions</h2>
        </div>
        <FaqAccordion faqs={config.faqs} />
      </section>

      {/* 9. Internal Linking Directory Panel */}
      <section className="py-12 bg-stone-50 border-t border-stone-200/50 text-left">
        <div className="max-w-7xl mx-auto px-5">
          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6">Explore Other Ahmedabad Local Services:</h4>
          <div className="flex flex-wrap gap-2.5 text-xs">
            {Object.keys(landingPagesData).map((key) => {
              const item = landingPagesData[key];
              if (item.slug === config.slug) return null;
              return (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="bg-white border border-stone-200 hover:border-primary text-stone-600 hover:text-primary font-semibold py-2 px-4.5 rounded-lg shadow-sm transition"
                >
                  {item.h1}
                </Link>
              );
            })}
            <Link href="/services" className="bg-white border border-stone-200 hover:border-primary text-stone-600 hover:text-primary font-semibold py-2 px-4.5 rounded-lg shadow-sm transition">
              All Services
            </Link>
            <Link href="/projects" className="bg-white border border-stone-200 hover:border-primary text-stone-600 hover:text-primary font-semibold py-2 px-4.5 rounded-lg shadow-sm transition">
              Our Projects
            </Link>
            <Link href="/products" className="bg-white border border-stone-200 hover:border-primary text-stone-600 hover:text-primary font-semibold py-2 px-4.5 rounded-lg shadow-sm transition">
              Product Catalog
            </Link>
            <Link href="/blog" className="bg-white border border-stone-200 hover:border-primary text-stone-600 hover:text-primary font-semibold py-2 px-4.5 rounded-lg shadow-sm transition">
              Latest Blog Guides
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Call To Action (CTA) bottom card */}
      <section className="bg-stone-950 py-16 text-center text-white relative overflow-hidden border-t border-stone-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a17a4c_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-4xl mx-auto px-5 relative z-10 space-y-6">
          <h3 className="font-serif text-3xl font-extrabold">Need Custom Layout Estimates in Ahmedabad?</h3>
          <p className="text-stone-400 text-sm max-w-xl mx-auto leading-relaxed">
            Get in touch with Rajesh Panchal today. We provide completely free site measurements, layout blueprints, and factory-direct estimates.
          </p>
          <div className="flex flex-wrap gap-3.5 justify-center pt-4">
            <BookConsultationButton
              label="Book Free Consultation"
              productOrServiceName={`${config.h1} Bottom CTA`}
              className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 text-sm cursor-pointer border-none shadow-md transition duration-300"
            />
            <a
              href="tel:+919664956491"
              className="rounded-lg border border-stone-800 text-stone-300 hover:bg-stone-900 hover:text-white font-bold py-3 px-5 text-sm flex items-center justify-center gap-2 transition duration-300"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href="https://wa.me/919664956491?text=Hi%20Panchal%20Interior%20%2C%0A%0AI%20need%20interior%2Ffurniture%20work.%0A%0ALocation%3A%20%0ARequirement%3A%20%0ABudget%3A%20%0APreferred%20Timeline%3A%20"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 text-sm flex items-center justify-center gap-2 shadow-md transition duration-300"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
