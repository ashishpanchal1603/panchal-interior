"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { productsData, categoriesData } from "@/data/interiorData";
import { Search, SlidersHorizontal, MessageSquare, ArrowRight, PackageX } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { motion, AnimatePresence } from "framer-motion";

function ProductsCatalog() {
  const searchParams = useSearchParams();
  const { openQuoteModal } = useQuoteModal();
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sync category from URL search params (e.g. clicked from home categories)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  // Filter products based on category and search query
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-16 bg-stone-900 overflow-hidden text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-stone-900/80" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-md">
            Product Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-5">
            Explore Premium Custom Furniture
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Browse through our master-crafted furniture models. Select a design and customize sizes or wood configurations.
          </p>
        </div>
      </section>

      {/* 2. Interactive Catalog Workspace */}
      <section className="max-w-7xl mx-auto px-5 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filters Column */}
          <div className="w-full lg:w-64 shrink-0 space-y-6">
            
            {/* Search Input Box */}
            <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm space-y-3">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">Search Catalog</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Velvet, Oak, Bed..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 pl-9 pr-4 py-2 text-sm text-stone-850 focus:border-primary focus:outline-none transition"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
              </div>
            </div>

            {/* Category Filter list */}
            <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-stone-700 border-b border-stone-100 pb-3 mb-4">
                <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-wider">Categories</h3>
              </div>
              <div className="flex flex-row flex-wrap lg:flex-col gap-1.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-auto lg:w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition ${
                    selectedCategory === "all"
                      ? "bg-primary text-white font-bold"
                      : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  All Products
                </button>
                {categoriesData.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-auto lg:w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition ${
                      selectedCategory === cat.id
                        ? "bg-primary text-white font-bold"
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            
          </div>

          {/* Catalog Grid Column */}
          <div className="flex-grow">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center bg-white border border-stone-200 rounded-2xl py-20 text-center"
                >
                  <div className="rounded-full bg-stone-50 p-4 text-stone-400 mb-4">
                    <PackageX className="h-10 w-10" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">No products match your criteria</h3>
                  <p className="text-stone-500 text-xs mt-2 max-w-xs leading-relaxed">
                    Try searching for another keyword or check our other category items.
                  </p>
                  <button
                    onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                    className="mt-6 text-xs font-bold text-primary border border-primary/20 bg-primary-light hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-white border border-stone-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-cream transition flex flex-col justify-between"
                    >
                      {/* Product Image */}
                      <div className="relative h-52 w-full overflow-hidden bg-stone-100 shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-w-7xl) 33vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-3 right-3 text-[10px] font-bold text-stone-900 bg-white/95 px-2 py-0.5 rounded shadow-sm">
                          {product.priceRange}
                        </span>
                      </div>

                      {/* Info Panel */}
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <span className="block text-[10px] font-bold text-primary uppercase tracking-wider">
                            {categoriesData.find(c => c.id === product.categoryId)?.name || "Furniture"}
                          </span>
                          <h3 className="font-serif font-bold text-stone-900 text-lg mt-1 group-hover:text-primary transition leading-snug">
                            {product.name}
                          </h3>
                          <p className="text-stone-500 text-xs mt-2.5 leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                          
                          {/* Materials tags */}
                          <div className="flex flex-wrap gap-1 mt-4">
                            {product.materials.slice(0, 2).map((mat, index) => (
                              <span key={index} className="text-[9px] font-medium text-stone-500 bg-stone-50 px-2 py-0.5 rounded border border-stone-100">
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                          <Link
                            href={`/products/${product.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-stone-900 group-hover:text-primary transition"
                          >
                            Specs & Gallery
                            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                          
                          <button
                            onClick={() => openQuoteModal(product.name)}
                            className="rounded-lg bg-primary hover:bg-primary-hover text-white text-[10px] font-bold py-1.5 px-3 transition cursor-pointer"
                          >
                            Inquire Quote
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <ProductsCatalog />
    </Suspense>
  );
}
