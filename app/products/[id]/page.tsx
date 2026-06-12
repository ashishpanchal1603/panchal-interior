"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productsData, categoriesData } from "@/data/interiorData";
import { ArrowLeft, Check, Compass, Ruler, ShieldAlert, BadgeCheck } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = productsData.find((p) => p.id === id);
  const { openQuoteModal } = useQuoteModal();
  
  // Gallery state
  const [activeImg, setActiveImg] = useState("");

  if (!product) {
    notFound();
  }

  // Fallback if activeImg is empty
  const currentImg = activeImg || product.image;

  // Find category name
  const categoryName = categoriesData.find(c => c.id === product.categoryId)?.name || "Furniture";

  // Pre-filled WhatsApp message
  const waMessage = encodeURIComponent(
    `Hello Panchal Interior, I would like to get customization options and price estimate for the product: "${product.name}" (ID: ${product.id}).`
  );

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Navigation Header */}
      <section className="bg-stone-50 border-b border-stone-200/50 py-5">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 text-xs font-bold uppercase tracking-wider transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Link>
          <span className="text-xs text-stone-400 font-medium">
            Category: <strong className="text-primary font-bold">{categoryName}</strong>
          </span>
        </div>
      </section>

      {/* 2. Detailed Display Section */}
      <section className="max-w-7xl mx-auto px-5 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Gallery Column (5 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-96 sm:h-[450px] w-full bg-stone-100 rounded-2xl overflow-hidden border border-stone-200"
          >
            <Image
              src={currentImg}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          
          {/* Thumbnails Row */}
          {product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(img)}
                  className={`relative h-20 w-20 shrink-0 rounded-lg overflow-hidden border-2 transition ${
                    currentImg === img ? "border-primary shadow-sm" : "border-stone-200 hover:border-stone-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} gallery thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Info Column (7 Cols) */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {categoryName} Collection
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
              {product.name}
            </h1>
            
            {/* Stock info */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <span className="flex items-center gap-1.5 text-xs text-stone-600">
                <BadgeCheck className="h-4.5 w-4.5 text-emerald-500" />
                Custom sizes & wood polishes available
              </span>
            </div>
          </div>

          <p className="text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-6">
            {product.description}
          </p>

          {/* Key Specifications Grid */}
          <div className="space-y-4 border-t border-stone-100 pt-6">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Specifications</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-lg border border-stone-100">
                <Compass className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <span className="block text-stone-400 text-[10px] uppercase font-semibold">Materials Used</span>
                  <span className="block text-stone-800 font-semibold mt-0.5">{product.materials.join(", ")}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-lg border border-stone-100">
                <Ruler className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <span className="block text-stone-400 text-[10px] uppercase font-semibold">Dimensions</span>
                  <span className="block text-stone-800 font-semibold mt-0.5">{product.dimensions}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features checkmark list */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Product Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700">
              {product.features.map((feat, i) => (
                <li key={i} className="flex gap-2 items-center">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 border-t border-stone-100 pt-8">
            <a
              href={`https://wa.me/919876543210?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 shadow-md transition duration-300"
            >
              <FaWhatsapp className="h-5 w-5" />
              Inquire on WhatsApp
            </a>
            <button
              onClick={() => openQuoteModal(product.name)}
              className="flex-1 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-6 shadow-md transition duration-300 cursor-pointer"
            >
              Request Custom Estimate
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-stone-400 text-[10px] font-medium justify-center">
            <ShieldAlert className="h-3.5 w-3.5 text-primary" />
            <span>5-year warranty against wood-borer termites. Pricing depends on wood species selection.</span>
          </div>

        </div>

      </section>
    </div>
  );
}
