import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPostsData } from "@/data/interiorData";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { ShareButton, BlogCTASection } from "@/components/BlogActions";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} — Panchal Interior Guide`,
    description: `${post.excerpt} Written by ${post.author}, Woodworking Expert & Founder at Panchal Interior.`,
    alternates: {
      canonical: `https://panchalinterior.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Format content paragraphs
  const paragraphs = post.content.split("\n\n");

  // Determine standard ISO dates for publishing schema
  const publishDate = post.date.includes("May")
    ? "2026-05-15T09:00:00+05:30"
    : "2026-04-28T10:30:00+05:30";

  // Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://panchalinterior.com${post.image}`,
    "datePublished": publishDate,
    "dateModified": publishDate,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Panchal Interior & Furniture Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://panchalinterior.com/icon-512.png",
      },
    },
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Navigation Header */}
      <section className="bg-stone-50 border-b border-stone-200/50 py-5">
        <div className="max-w-4xl mx-auto px-5 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 text-xs font-bold uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <ShareButton />
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
        <AnimateOnScroll variant="fadeInUp" className="relative h-96 w-full rounded-2xl overflow-hidden border border-stone-200">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-w-7xl) 100vw, 800px"
            className="object-cover"
          />
        </AnimateOnScroll>

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
      <BlogCTASection postTitle={post.title} />
    </div>
  );
}
