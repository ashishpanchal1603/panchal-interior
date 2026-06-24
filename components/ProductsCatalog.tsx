"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Product, Category } from "@/data/interiorData";
import { Search, SlidersHorizontal, ArrowRight, PackageX } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";

interface ProductsCatalogProps {
  products: Product[];
  categories: Category[];
}

export default function ProductsCatalog({ products, categories }: ProductsCatalogProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { openQuoteModal } = useQuoteModal();

  const [searchQuery, setSearchQuery] = useState("");

  const selectedCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
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
              type="button"
              onClick={() => handleCategoryChange("all")}
              className={`w-auto lg:w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                selectedCategory === "all"
                  ? "bg-primary text-white font-bold"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`w-auto lg:w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
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
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white border border-stone-200 rounded-2xl py-20 text-center">
            <div className="rounded-full bg-stone-50 p-4 text-stone-400 mb-4">
              <PackageX className="h-10 w-10" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">No products match your criteria</h3>
            <p className="text-stone-500 text-xs mt-2 max-w-xs leading-relaxed">
              Try searching for another keyword or check our other category items.
            </p>
            <button
              type="button"
              onClick={() => {
                handleCategoryChange("all");
                setSearchQuery("");
              }}
              className="mt-6 text-xs font-bold text-primary border border-primary/20 bg-primary-light hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
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
                </div>

                {/* Info Panel */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="block text-[10px] font-bold text-primary uppercase tracking-wider">
                      {categories.find((c) => c.id === product.categoryId)?.name || "Furniture"}
                    </span>
                    <h3 className="font-outfit font-semibold text-base md:text-lg leading-normal tracking-normal text-stone-900 mt-1 group-hover:text-primary transition">
                      {product.name}
                    </h3>
                    <p className="font-outfit text-sm md:text-base leading-relaxed text-stone-600 mt-2.5 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Materials tags */}
                    <div className="flex flex-wrap gap-1 mt-4">
                      {product.materials.slice(0, 2).map((mat, index) => (
                        <span
                          key={index}
                          className="font-outfit text-xs font-medium text-stone-600 bg-stone-50 px-2 py-0.5 rounded border border-stone-100"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <Link
                      href={`/products/${product.id}`}
                      aria-label={`View specifications and gallery for ${product.name}`}
                      className="font-outfit font-medium text-sm md:text-base inline-flex items-center gap-1 text-stone-900 group-hover:text-primary transition"
                    >
                      Specs & Gallery
                      <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => openQuoteModal(product.name)}
                      className="rounded-lg bg-primary hover:bg-primary-hover text-white text-[10px] font-bold py-1.5 px-3 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Get Free Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
