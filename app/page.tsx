import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import EndToEndSolutions from "@/components/EndToEndSolutions";
import {
  servicesData,
  categoriesData,
  advantagesData,
  testimonialsData,
  projectsData,
} from "@/data/interiorData";
import {
  Sofa,
  CookingPot,
  Palette,
  Zap,
  Paintbrush,
  Armchair,
  BadgePercent,
  Gem,
  Sliders,
  Users,
  CalendarCheck,
  Headphones,
  ArrowRight,
  Star,
  Quote,
} from "lucide-react";
import BookConsultationButton from "@/components/BookConsultationButton";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import EstimatorWrapper from "@/components/EstimatorWrapper";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import TrustBadges from "@/components/TrustBadges";
import HowWeWork from "@/components/HowWeWork";
import FaqAccordion from "@/components/FaqAccordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panchal Interior & Furniture Solutions | Custom Home Solutions in Ahmedabad",
  description:
    "Bespoke furniture manufacturing, modular kitchens, wardrobes, sofa sets, and turnkey residential/commercial interior designs in Ahmedabad, Gujarat. 5-year warranty.",
  alternates: {
    canonical: "https://panchalinterior.com",
  },
};

const homeFaqs = [
  {
    question: "What services does Panchal Interior Studio offer in Ahmedabad?",
    answer: "We offer end-to-end interior design and custom furniture manufacturing solutions. This includes custom sofas, modular kitchens, modular wardrobes, TV unit design, bedroom furniture, false ceilings, electrical work, and turnkey residential and commercial execution."
  },
  {
    question: "Do you have a physical workshop or experience center?",
    answer: "Yes! Our main manufacturing workshop is located near Gota Bridge, Ahmedabad. Customers are welcome to schedule a visit to inspect materials, watch raw furniture carpentry in progress, and review finish catalog options."
  },
  {
    question: "Is the site measurement and consultation visit completely free?",
    answer: "Absolutely. We offer a free, no-obligation site measurement visit anywhere in Ahmedabad. Our team will visit your property, take precise measurements, evaluate space requirements, and discuss layout ideas."
  },
  {
    question: "What materials do you use for modular kitchens and furniture?",
    answer: "For kitchens and damp areas, we strictly use Boil Water Proof (BWP) Marine Grade Plywood and Hettich or Hafele soft-close hardware. For custom furniture, we use premium quality solid teak wood, commercial BWR plywood, and scratch-resistant German acrylic or PU finish sheets."
  },
  {
    question: "Do you offer a warranty on your carpentry and interior work?",
    answer: "Yes, we stand behind our workmanship with a 5-year warranty against wood termite/borer infestations and manufacturing defects on all custom furniture and wardrobes."
  }
];

export default function HomePage() {
  // Helper to map icon names to Lucide icons for services
  const getServiceIcon = (iconName: string) => {
    const iconClass = "h-8 w-8 text-primary group-hover:text-white transition duration-300";
    switch (iconName) {
      case "Sofa":
        return <Sofa className={iconClass} />;
      case "Armchair":
        return <Armchair className={iconClass} />;
      case "CookingPot":
        return <CookingPot className={iconClass} />;
      case "Palette":
        return <Palette className={iconClass} />;
      case "Zap":
        return <Zap className={iconClass} />;
      case "Paintbrush":
        return <Paintbrush className={iconClass} />;
      default:
        return <Sofa className={iconClass} />;
    }
  };

  // Helper to map icon names for advantages
  const getAdvantageIcon = (iconName: string) => {
    const iconClass = "h-7 w-7 text-primary shrink-0";
    switch (iconName) {
      case "BadgePercent":
        return <BadgePercent className={iconClass} />;
      case "Gem":
        return <Gem className={iconClass} />;
      case "Sliders":
        return <Sliders className={iconClass} />;
      case "Users":
        return <Users className={iconClass} />;
      case "CalendarCheck":
        return <CalendarCheck className={iconClass} />;
      case "Headphones":
        return <Headphones className={iconClass} />;
      default:
        return <Gem className={iconClass} />;
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Panchal Interior & Furniture Solutions",
    "image": "https://panchalinterior.com/images/hero.png",
    "@id": "https://panchalinterior.com/#localbusiness",
    "url": "https://panchalinterior.com",
    "telephone": "+919664956491",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Panchal Complex, Near Gota Bridge, Gota",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "382481",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.083652879129598,
      "longitude": 72.52989107604581,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "20:00",
    },
    "sameAs": ["https://facebook.com", "https://instagram.com", "https://youtube.com"],
  };

  const furnitureStoreSchema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "Panchal Interior & Furniture Solutions",
    "image": "https://panchalinterior.com/images/sofa_set.png",
    "@id": "https://panchalinterior.com/#furniturestore",
    "url": "https://panchalinterior.com",
    "telephone": "+919664956491",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Panchal Complex, Near Gota Bridge, Gota",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "382481",
      "addressCountry": "IN",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Panchal Interior & Furniture Solutions",
    "url": "https://panchalinterior.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://panchalinterior.com/products?query={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(furnitureStoreSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />

      <Hero />
      
      <TrustBadges />

      {/* 1. Services Section */}
      <section className="py-12 md:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <AnimateOnScroll variant="fadeInUp">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
              Our Services
            </h2>
            <p className="text-stone-500 text-sm sm:text-base mt-3 max-w-xl mx-auto">
              Complete home interior and furniture solutions under one roof
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 text-left">
            {servicesData.map((service, idx) => (
              <AnimateOnScroll
                key={service.slug}
                variant="fadeInUp"
                delay={idx * 0.05}
                className="group relative bg-white border border-stone-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-primary-cream/50 transition duration-300"
              >
                {/* Icon Circle */}
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-light text-primary group-hover:bg-primary transition duration-300">
                  {getServiceIcon(service.icon)}
                </div>

                <h3 className="font-serif text-xl font-bold text-stone-900 mt-6">
                  {service.name}
                </h3>

                <p className="text-stone-500 text-sm mt-3 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-8 flex justify-between items-center">
                  <Link
                    href={`/services/${service.slug}`}
                    aria-label={`View details of ${service.name} service`}
                    className="text-sm font-bold text-stone-950 group-hover:text-primary transition flex items-center gap-1"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <BookConsultationButton
                    label="Book Free Consultation"
                    className="text-xs font-semibold text-primary hover:underline cursor-pointer bg-transparent border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    productOrServiceName={service.name}
                  />
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll variant="simpleFade" className="mt-12 text-center">
            <Link
              href="/services"
              aria-label="View all professional interior design and furniture services"
              className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-6 transition cursor-pointer"
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 2. Popular Furniture Categories */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <AnimateOnScroll variant="fadeInUp">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
              Popular Furniture Categories
            </h2>
            <p className="text-stone-500 text-sm sm:text-base mt-3 max-w-xl mx-auto">
              Explore our wide range of premium furniture, custom crafted for you
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {categoriesData.map((cat, idx) => (
              <AnimateOnScroll
                key={cat.id}
                variant="scaleIn"
                delay={idx * 0.05}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                {/* Category Image */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-w-7xl) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300" />

                {/* Text content on card */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                  <h3 className="font-serif text-xl font-bold text-white leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-stone-300 text-xs mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href={`/products?category=${cat.id}`}
                      aria-label={`Explore our collection of custom ${cat.name}`}
                      className="text-xs font-bold text-primary bg-primary-light/10 border border-primary/20 hover:bg-primary hover:text-white px-4 py-1.5 rounded-lg backdrop-blur-sm transition duration-300"
                    >
                      Explore Collection
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll variant="simpleFade" className="mt-12 text-center">
            <Link
              href="/products"
              aria-label="Explore all custom furniture catalog products"
              className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-6 transition cursor-pointer"
            >
              Explore All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 2.3 End-to-End Solutions Section */}
      <EndToEndSolutions />

      {/* How We Work Process Timeline Section */}
      <HowWeWork />

      {/* 2.4 Before & After Transformations Section */}
      <BeforeAfterSection />

      {/* 2.5 Cost Estimator Section */}
      <EstimatorWrapper />

      {/* 3. Why Choose Us Section */}
      <section className="py-12 md:py-24 bg-stone-50 border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center">
            <AnimateOnScroll variant="fadeInUp">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900">
                Why Choose Us
              </h2>
              <p className="text-stone-500 text-sm mt-3 max-w-xl mx-auto">
                Our commitment to materials, design, and direct factory pricing makes us your perfect home solutions partner.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {advantagesData.map((adv, idx) => (
              <AnimateOnScroll
                key={idx}
                variant="fadeInUp"
                delay={idx * 0.05}
                className="flex gap-4 bg-white border border-stone-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  {getAdvantageIcon(adv.icon)}
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">
                    {adv.title}
                  </h3>
                  <p className="text-stone-500 text-sm mt-2 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-12 md:py-24 bg-stone-50 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <AnimateOnScroll variant="fadeInUp">
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1 rounded-full border border-primary/20">
              Our Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 mt-3 leading-tight">
              Recent Projects
            </h2>
            <p className="text-stone-500 text-sm sm:text-base mt-3 max-w-xl mx-auto">
              Explore our custom furniture and carpentry designs executed across Ahmedabad.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
            {projectsData.slice(0, 3).map((project, idx) => (
              <AnimateOnScroll
                key={project.id}
                variant="fadeInUp"
                delay={idx * 0.05}
                className="group bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
              >
                <div 
                  onClick={() => window.location.href = `/projects/${project.slug}`}
                  className="block relative h-56 w-full overflow-hidden bg-stone-100 cursor-pointer"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-w-7xl) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 text-[10px] font-bold text-stone-900 bg-white/95 px-2.5 py-1 rounded shadow-sm z-10">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    📍 {project.location}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mt-2 group-hover:text-primary transition leading-snug">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-stone-500 text-xs mt-2 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-bold text-stone-900 hover:text-primary transition flex items-center gap-1"
                    >
                      View Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <BookConsultationButton
                      label="Get Free Estimate"
                      productOrServiceName={project.title}
                      className="text-[10px] font-bold text-primary hover:underline cursor-pointer bg-transparent border-none"
                    />
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll variant="simpleFade" className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-6 transition cursor-pointer"
            >
              Explore All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section className="py-12 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center">
            <AnimateOnScroll variant="fadeInUp">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900">
                Customer Reviews
              </h2>
              <p className="text-stone-500 text-sm mt-3 max-w-xl mx-auto">
                Read stories of client satisfaction across Ahmedabad
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {testimonialsData.map((test, idx) => (
              <AnimateOnScroll
                key={test.id}
                variant={idx % 2 === 0 ? "slideLeft" : "slideRight"}
                className="relative bg-stone-50 rounded-2xl p-8 border border-stone-100/60 shadow-sm"
              >
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
                <div className="flex gap-1">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm italic mt-5 leading-relaxed font-medium">
                  &ldquo;{test.text}&rdquo;
                </p>
                <div className="mt-6 border-t border-stone-200/60 pt-4 flex justify-between items-center">
                  <div>
                    <span className="block font-bold text-stone-900 text-sm">{test.name}</span>
                    <span className="block text-stone-400 text-xs mt-0.5">{test.role}</span>
                  </div>
                  <span className="text-xs font-semibold text-primary bg-primary-light px-2.5 py-1 rounded-md">
                    📍 {test.location}
                  </span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 md:py-24 bg-stone-50 border-t border-stone-200/50 text-left">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-12">
            <AnimateOnScroll variant="fadeInUp">
              <span className="text-xs font-bold text-primary uppercase tracking-widest font-mono">Questions & Answers</span>
              <h2 className="font-serif text-3xl font-extrabold text-stone-900 mt-2">Frequently Asked Questions</h2>
            </AnimateOnScroll>
          </div>
          <FaqAccordion faqs={homeFaqs} />
        </div>
      </section>

      {/* 5. Bottom Call to Action Section */}
      <section className="bg-stone-950 py-12 md:py-20 border-t border-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a17a4c_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Transform Your Living Space?
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Get in touch with our design experts today. We provide free site measurement consultations and dynamic 3D rendering designs.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <BookConsultationButton
              label="Get Free Site Visit"
              productOrServiceName="Bottom CTA"
              className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 shadow-lg transition duration-300 cursor-pointer border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <a
              href="tel:+919664956491"
              className="rounded-lg border border-stone-800 text-stone-300 hover:bg-stone-900 hover:text-white font-bold py-3 px-8 transition flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              Call Now
            </a>
            <a
              href="https://wa.me/919664956491?text=Hi%20Panchal%20Interior%20Studio%2C%0A%0AI%20need%20interior%2Ffurniture%20work.%0A%0ALocation%3A%20%0ARequirement%3A%20%0ABudget%3A%20%0APreferred%20Timeline%3A%20"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 shadow-lg transition flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}