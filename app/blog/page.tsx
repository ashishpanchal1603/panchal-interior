import Image from "next/image";
import { blogPostsData } from "@/data/interiorData";
import BlogCatalog from "@/components/BlogCatalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Woodworking Insights, Tips, & Home Design Guides",
  description:
    "Read our professional modular kitchen material guides, space optimization planning ideas, and customized wood furniture tips from Panchal Interior experts.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Woodworking Insights, Tips, & Home Design Guides | Panchal Interior",
    description:
      "Read our professional modular kitchen material guides, space optimization planning ideas, and customized wood furniture tips from Panchal Interior experts.",
    url: "/blog",
    siteName: "Panchal Interior Studio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Panchal Interior Blog & Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Woodworking Insights, Tips, & Home Design Guides | Panchal Interior",
    description:
      "Read our professional modular kitchen material guides, space optimization planning ideas, and customized wood furniture tips from Panchal Interior experts.",
    images: ["/images/hero.png"],
  },
};

export default function BlogPage() {
  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-16 bg-stone-900 overflow-hidden text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Panchal Interior design and custom furniture blog tips guides"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-15"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-stone-900/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-md">
            Our Insights
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-5">
            Panchal Interior Blog
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Tips, materials buying guides, space planning ideas, and advice directly from local furniture manufacturers.
          </p>
        </div>
      </section>

      {/* 2. Blog Grid Section with Filter Catalog */}
      <section className="max-w-6xl mx-auto px-5 mt-16">
        <BlogCatalog blogPosts={blogPostsData} />
      </section>
    </div>
  );
}
