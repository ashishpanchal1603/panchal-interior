import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import BookConsultationButton from "@/components/BookConsultationButton";
import { Shield, Sparkles, HeartHandshake, Eye, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Story & Craftsmanship",
  description:
    "Learn about Panchal Interior, Ahmedabad's leading custom wood furniture manufacturing and turnkey home interior solution firm since 2011.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Our Story & Craftsmanship | Panchal Interior",
    description:
      "Learn about Panchal Interior, Ahmedabad's leading custom wood furniture manufacturing and turnkey home interior solution firm since 2011.",
    url: "https://panchal-interior.vercel.app/about",
    siteName: "Panchal Interior",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://panchal-interior.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Panchal Interior Custom Furniture Story",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Our Story & Craftsmanship | Panchal Interior",
    description:
      "Learn about Panchal Interior, Ahmedabad's leading custom wood furniture manufacturing and turnkey home interior solution firm since 2011.",
    images: ["https://panchal-interior.vercel.app/og-image.jpg"],
  },
};

export default function AboutPage() {
  const values = [
    {
      title: "Compromise-Free Quality",
      desc: "We source only BWR/BWP grade plywood, solid teakwood, and premium Hettich/Hafele hardware to guarantee longevity.",
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
    {
      title: "Bespoke Customization",
      desc: "No catalog duplicates. We listen to your style choices and engineer space layouts custom-made for your home.",
      icon: <Sparkles className="h-6 w-6 text-primary" />,
    },
    {
      title: "Fair Transparent Rates",
      desc: "With our local workshop setup, we bypass middleman showrooms and offer high-end factory-direct pricing.",
      icon: <HeartHandshake className="h-6 w-6 text-primary" />,
    },
  ];

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Panchal Interior & Furniture Solutions",
    "image": "https://panchal-interior.vercel.app/images/hero.png",
    "@id": "https://panchal-interior.vercel.app/about/#professionalservice",
    "url": "https://panchal-interior.vercel.app/about",
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

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* 1. Page Header */}
      <section className="relative py-24 bg-stone-900 overflow-hidden text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Panchal Interior Woodworking Craftsmanship Story"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-stone-900/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <AnimateOnScroll variant="fadeInUp" className="inline-block">
            <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-md">
              Our Story
            </span>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fadeInUp" delay={0.1}>
            <h1 className="font-cormorant text-4xl sm:text-5xl font-extrabold text-white mt-5">
              About Panchal Interior
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fadeInUp" delay={0.2}>
            <p className="font-outfit text-sm md:text-base leading-relaxed text-stone-400 mt-4 max-w-xl mx-auto">
              Crafting premium furniture and modular interior solutions in Ahmedabad since 2011.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 2. Journey Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text */}
          <AnimateOnScroll variant="slideLeft" className="space-y-6">
            <h2 className="font-cormorant text-3xl sm:text-4xl font-extrabold text-stone-900">
              Crafting Quality Homes For Over 15 Years
            </h2>
            <p className="font-outfit text-sm md:text-base leading-relaxed text-stone-600">
              Founded by Rajesh Panchal, a master craftsman with a passion for carpentry, Panchal Interior started as a small woodworking shop in Ahmedabad. Over the years, we have grown into a leading turnkey interior solution firm, serving over 500 happy families across Gujarat.
            </p>
            <p className="font-outfit text-sm md:text-base leading-relaxed text-stone-600">
              We focus on building furniture that lasts. Unlike flat-pack online furniture made of fragile particle boards, our products are hand-framed with solid woods and BWR plywood, ensuring they stand the test of time, humidity, and daily usage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Our Mission</h4>
                  <p className="font-outfit text-sm text-stone-500 mt-1">
                    To design modular, highly durable spaces at honest factory rates.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Our Vision</h4>
                  <p className="font-outfit text-sm text-stone-500 mt-1">
                    To be the most trusted custom wood furniture brand in Ahmedabad.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right Column: Visual Mockup */}
          <AnimateOnScroll
            variant="slideRight"
            className="relative h-96 lg:h-[450px] rounded-2xl overflow-hidden shadow-lg border-8 border-stone-50"
          >
            <Image
              src="/images/sofa_set.png"
              alt="Panchal Interior Workshop Craftsmanship"
              fill
              sizes="(max-w-7xl) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-cormorant text-3xl font-extrabold text-stone-900">
              Our Founding Principles
            </h2>
            <p className="font-outfit text-sm md:text-base leading-relaxed text-stone-600 mt-2">
              We operate on absolute transparency, craftsmanship excellence, and commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {values.map((val, idx) => (
              <AnimateOnScroll
                key={idx}
                variant="fadeInUp"
                delay={idx * 0.1}
                className="bg-white rounded-xl p-8 border border-stone-100/60 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light mb-5">
                  {val.icon}
                </div>
                <h3 className="font-bold text-stone-900 text-lg">{val.title}</h3>
                <p className="text-stone-500 text-sm mt-3 leading-relaxed">{val.desc}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Workshop Setup & Quality Standards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll
            variant="scaleIn"
            className="relative h-96 rounded-2xl overflow-hidden order-last lg:order-first shadow-md"
          >
            <Image
              src="/images/modular_kitchen.png"
              alt="Modular Kitchen Fabrication in Ahmedabad factory"
              fill
              sizes="(max-w-7xl) 50vw, 100vw"
              className="object-cover"
            />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeInUp" className="space-y-6">
            <h2 className="font-cormorant text-3xl font-extrabold text-stone-900 leading-tight">
              Factory Manufacturing & Finishing Quality
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              We operate our own local workshop in Gota, Ahmedabad, fully equipped with automated edge-banding machines, pneumatic drills, panel saws, and a dedicated dust-free paint booth.
            </p>
            <ul className="space-y-3 text-stone-600 text-sm">
              <li className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  ✓
                </span>
                <span>
                  <strong>Machine Edge Banding:</strong> Cabinet doors are finished with automated hot-melt glue edge-banders, preventing future peeling.
                </span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  ✓
                </span>
                <span>
                  <strong>PU Paint Booth:</strong> Handcrafted custom tables and panels are polished inside a pressurized booth for a mirror-like dust-free polish.
                </span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  ✓
                </span>
                <span>
                  <strong>Heavy Hardware:</strong> We strictly integrate soft-closing drawer guides and hinges from Hettich, Hafele, and Blum, with warranties up to 10 years.
                </span>
              </li>
            </ul>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 5. CTA banner */}
      <section className="bg-stone-950 py-16 text-center text-white relative border-t border-stone-900">
        <div className="max-w-3xl mx-auto px-5">
          <h3 className="font-outfit text-2xl sm:text-3xl font-extrabold">Design Your Dream Home Today</h3>
          <p className="text-stone-400 text-sm mt-3 leading-relaxed">
            Get in touch for a site visit. We will measure your space and build dynamic 3D layouts, presenting realistic costs with zero hidden charges.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <BookConsultationButton
              label="Get Free Site Visit"
              productOrServiceName="About Page Site Visit"
              className="font-outfit font-medium text-sm md:text-base rounded-lg bg-primary hover:bg-primary-hover text-white py-3 px-6 shadow-md transition cursor-pointer border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <BookConsultationButton
              label="Book Free Consultation"
              productOrServiceName="About Page Consultation"
              className="font-outfit font-medium text-sm md:text-base rounded-lg border border-white/30 text-white hover:bg-white hover:text-stone-950 py-3 px-6 transition flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-transparent cursor-pointer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
