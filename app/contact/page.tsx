import React from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Schedule Site Measurement Visit",
  description:
    "Connect with Panchal Interior design team in Ahmedabad. Schedule a free site measurement visit or visit our factory workshop near Gota Bridge.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us — Schedule Site Measurement Visit | Panchal Interior",
    description:
      "Connect with Panchal Interior design team in Ahmedabad. Schedule a free site measurement visit or visit our factory workshop near Gota Bridge.",
    url: "https://panchalinterior.com/contact",
    siteName: "Panchal Interior",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://panchalinterior.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Panchal Interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us — Schedule Site Measurement Visit | Panchal Interior",
    description:
      "Connect with Panchal Interior design team in Ahmedabad. Schedule a free site measurement visit or visit our factory workshop near Gota Bridge.",
    images: ["https://panchalinterior.com/og-image.jpg"],
  },
};

export default function ContactPage() {
  const contactFaqs = [
    {
      question: "Do you charge for site visits and measurements?",
      answer:
        "No, site visits and measurements are completely free of charge for locations within Ahmedabad. Our supervisor will visit your site, take precise dimensions, and discuss initial layouts with no obligation.",
    },
    {
      question: "What is your warranty policy on wood furniture?",
      answer:
        "We offer a 5-year replacement warranty against structural termites and wood-borers on all custom furniture. All soft-closing kitchen baskets and cabinet hardware (from Hettich/Hafele) carry their respective brand warranties up to 10 years.",
    },
    {
      question: "What is the typical timeframe for a modular kitchen setup?",
      answer:
        "Once the 3D layout design is approved and dimensions are finalized, factory cutting and edge-banding takes 10-12 days. On-site modular assembly and countertop quartz fitting takes only 3-5 days, causing minimal disruption at your home.",
    },
  ];

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Panchal Interior",
    "description": "Get in touch with Panchal Interior to schedule a site measurement visit in Ahmedabad.",
    "url": "https://panchalinterior.com/contact",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "Panchal Interior & Furniture Solutions",
      "telephone": "+919664956491",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Panchal Complex, Near Gota Bridge, Gota",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "postalCode": "382481",
        "addressCountry": "IN",
      },
    },
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": contactFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema).replace(/</g, "\\u003c"),
        }}
      />
      {/* 1. Header Banner */}
      <section className="relative py-16 bg-stone-900 overflow-hidden text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Panchal Interior Gota Factory Showroom Map Contact"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-15"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-stone-900/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-md">
            Connect With Us
          </span>
          <h1 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-5">
            Contact Panchal Interior
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Have a project in mind? Reach out to our design consultants or visit our factory workshop directly in Ahmedabad.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-5 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column (5 Cols): Details & FAQs */}
        <div className="lg:col-span-5 space-y-10">
          {/* Contact Cards Block */}
          <div className="bg-white border border-stone-200/60 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="font-cormorant text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Office & Factory Details
            </h2>

            <ul className="space-y-5 text-sm">
              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Factory Address
                  </span>
                  <span className="block text-stone-700 font-semibold leading-relaxed mt-1">
                    Panchal Complex, Near Gota Bridge, Gota, Ahmedabad, Gujarat - 382481
                  </span>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Hotline Contact
                  </span>
                  <a
                    href="tel:+919664956491"
                    className="block text-stone-900 font-bold hover:text-primary transition mt-1"
                  >
                    +91 96649 56491
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Email Support
                  </span>
                  <a
                    href="mailto:info@panchalinterior.com"
                    className="block text-stone-700 font-semibold hover:text-primary transition mt-1"
                  >
                    info@panchalinterior.com
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Operating Hours
                  </span>
                  <span className="block text-stone-700 font-semibold mt-1">
                    Monday - Saturday: 9:00 AM - 8:00 PM <br />
                    <span className="text-stone-400 font-medium">
                      (Sundays: Pre-booked Site Visits Only)
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact FAQs Block */}
          <div className="space-y-4">
            <h3 className="font-cormorant text-lg font-bold text-stone-900">Consultation FAQs</h3>
            <FaqAccordion faqs={contactFaqs} />
          </div>
        </div>

        {/* Right Column (7 Cols): Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>

      {/* 3. Embedded Google Maps Section */}
      <section className="max-w-7xl mx-auto px-5 mt-16">
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-stone-100 flex justify-between items-center bg-stone-50">
            <div>
              <h3 className="font-cormorant text-lg font-bold text-stone-900">Visit Our Factory Workshop</h3>
              <p className="text-stone-400 text-xs mt-0.5">Explore materials, laminates, and wood logs in person.</p>
            </div>
            <a
              href="https://maps.google.com/?q=Gota+Bridge,+Ahmedabad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Panchal Complex location in Google Maps"
              className="text-xs font-bold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Open in Google Maps
            </a>
          </div>

          <div className="h-96 w-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.366710492806!2d72.52989107604581!3d23.083652879129598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e82dc430f8f87%3A0xe54fa2373fb2e389!2sGota%20Bridge!5e0!3m2!1sen!2sin!4v1717876800000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Panchal Interior Factory Location Map"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
