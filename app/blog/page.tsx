import Image from "next/image";
import Link from "next/link";
import { blogPostsData } from "@/data/interiorData";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Woodworking Insights, Tips, & Home Design Guides",
  description:
    "Read our professional modular kitchen material guides, space optimization planning ideas, and customized wood furniture tips from Panchal Interior experts.",
  alternates: {
    canonical: "https://panchalinterior.com/blog",
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

      {/* 2. Blog Grid Section */}
      <section className="max-w-6xl mx-auto px-5 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {blogPostsData.map((post, idx) => (
            <AnimateOnScroll
              key={post.slug}
              variant="fadeInUp"
              delay={idx * 0.1}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              {/* Blog Image */}
              <div className="relative h-56 sm:h-64 w-full bg-stone-100 shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-w-7xl) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Text content panel */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  {/* Meta items */}
                  <div className="flex flex-wrap items-center gap-4 text-stone-400 text-[10px] uppercase font-bold tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-stone-900 mt-4 hover:text-primary transition leading-snug">
                    <Link href={`/blog/${post.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-stone-500 text-xs mt-3 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer bar */}
                <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-stone-600 font-semibold">
                    <User className="h-4 w-4 text-primary" />
                    By {post.author}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-stone-950 hover:text-primary transition group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
    </div>
  );
}
