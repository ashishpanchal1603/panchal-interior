"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPostsData } from "@/data/interiorData";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { motion } from "framer-motion";

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = blogPostsData.find((p) => p.slug === slug);
  const { openQuoteModal } = useQuoteModal();

  if (!post) {
    notFound();
  }

  // Format content paragraphs
  const paragraphs = post.content.split("\n\n");

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Navigation Header */}
      <section className="bg-stone-50 border-b border-stone-200/50 py-5">
        <div className="max-w-4xl mx-auto px-5 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 text-xs font-bold uppercase tracking-wider transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <button 
            onClick={() => alert("Copied link to clipboard!")}
            className="flex items-center gap-1.5 text-stone-400 hover:text-stone-900 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
          >
            <Share2 className="h-4 w-4 text-primary" />
            Share Guide
          </button>
        </div>
      </section>

      {/* Article Container */}
      <article className="max-w-3xl mx-auto px-5 mt-12 space-y-8">
        
        {/* Metadata & Title */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-stone-400 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-primary" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-stone-500 text-sm sm:text-base italic leading-relaxed border-l-4 border-primary pl-4">
            {post.excerpt}
          </p>
        </div>

        {/* Big Cover Image */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-96 w-full rounded-2xl overflow-hidden border border-stone-200"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Paragraphs body content */}
        <div className="space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed pt-4">
          {paragraphs.map((para, idx) => {
            // Check if paragraph is list item or header to render differently
            if (para.startsWith("1.") || para.startsWith("**1.")) {
              return (
                <div key={idx} className="bg-stone-50 border border-stone-150 rounded-xl p-5 my-4">
                  <p className="font-medium whitespace-pre-line">{para}</p>
                </div>
              );
            }
            return (
              <p key={idx} className="whitespace-pre-line">
                {para}
              </p>
            );
          })}
        </div>

        {/* Author Footer card */}
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/50 mt-12 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white font-serif text-lg font-bold">
            {post.author.charAt(0)}
          </div>
          <div>
            <span className="block font-bold text-stone-900 text-sm">Written by {post.author}</span>
            <span className="block text-stone-400 text-xs mt-0.5">Woodworking Expert & Founder, Panchal Interior</span>
          </div>
        </div>

      </article>

      {/* Dynamic CTA */}
      <section className="max-w-4xl mx-auto px-5 mt-20 text-center">
        <div className="bg-stone-900 text-white rounded-2xl p-8 border border-stone-850 shadow-md">
          <h3 className="font-serif text-xl font-bold">Looking to design a custom modular kitchen?</h3>
          <p className="text-stone-400 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
            Discuss plywood types, hardware models, and layout solutions with our design director.
          </p>
          <button
            onClick={() => openQuoteModal("Consultation from Blog")}
            className="mt-6 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 text-sm cursor-pointer"
          >
            Request Site Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
