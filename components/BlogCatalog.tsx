"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/data/interiorData";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface BlogCatalogProps {
  blogPosts: BlogPost[];
}

export default function BlogCatalog({ blogPosts }: BlogCatalogProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterTabs = [
    { label: "All Articles", id: "all" },
    { label: "Interior Design", id: "Interior Design" },
    { label: "Furniture Ideas", id: "Furniture Ideas" },
    { label: "Kitchen Ideas", id: "Kitchen Ideas" },
    { label: "Wardrobe Ideas", id: "Wardrobe Ideas" },
    { label: "TV Unit Ideas", id: "TV Unit Ideas" },
    { label: "Budget Planning", id: "Budget Planning" },
    { label: "Ahmedabad Trends", id: "Ahmedabad Home Trends" },
  ];

  // Filter blog posts based on tab selection
  const filteredPosts = blogPosts.filter((post) => {
    return selectedFilter === "all" || post.category === selectedFilter;
  });

  return (
    <div className="space-y-12">
      {/* Interactive Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-stone-200/60 pb-6">
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

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredPosts.map((post, idx) => (
            <AnimateOnScroll
              key={post.slug}
              variant="fadeInUp"
              delay={idx * 0.05}
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
                {/* Category Badge overlay */}
                <span className="absolute top-4 left-4 text-[10px] font-bold text-stone-900 bg-white/95 px-2.5 py-1 rounded shadow-sm z-10">
                  {post.category}
                </span>
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

                  <h2 className="font-cormorant text-xl font-bold text-stone-900 mt-4 hover:text-primary transition leading-snug">
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
                    aria-label={`Read article about ${post.title}`}
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
      ) : (
        <div className="text-center py-20 bg-stone-100/50 rounded-2xl border border-dashed border-stone-200">
          <p className="text-stone-500 font-medium">No articles found in this category.</p>
        </div>
      )}
    </div>
  );
}
