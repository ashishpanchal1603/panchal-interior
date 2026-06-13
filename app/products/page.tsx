import React, { Suspense } from "react";
import Image from "next/image";
import { productsData, categoriesData } from "@/data/interiorData";
import ProductsCatalog from "@/components/ProductsCatalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Custom Furniture Catalog",
  description:
    "Browse our custom crafted furniture pieces, including solid teak wood beds, royal velvet sofas, sliding wardrobes, and TV units, manufactured locally in Ahmedabad.",
  alternates: {
    canonical: "https://panchalinterior.com/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-16 bg-stone-900 overflow-hidden text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Panchal Interior custom furniture catalog Gota showroom"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-15"
          />
        </div>
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
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          }
        >
          <ProductsCatalog products={productsData} categories={categoriesData} />
        </Suspense>
      </section>
    </div>
  );
}
