import React from "react";
export const unstable_instant = false;
import Link from "next/link";
import { notFound } from "next/navigation";
import { productsData, categoriesData } from "@/data/interiorData";
import { ArrowLeft, Check, Compass, Ruler, ShieldAlert, BadgeCheck } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { id } = await props.params;
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return {};
  }

  const categoryName = categoriesData.find((c) => c.id === product.categoryId)?.name || "Furniture";

  return {
    title: `${product.name} — Custom ${categoryName}`,
    description: `${product.description} Handcrafted in Ahmedabad using premium materials. Materials: ${product.materials.join(", ")}. Dimensions: ${product.dimensions}.`,
    alternates: {
      canonical: `https://panchalinterior.com/products/${product.id}`,
    },
    openGraph: {
      title: `${product.name} — Custom ${categoryName} | Panchal Interior`,
      description: `${product.description} Handcrafted in Ahmedabad using premium materials.`,
      url: `https://panchalinterior.com/products/${product.id}`,
      type: "website",
      images: [
        {
          url: "https://panchalinterior.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Custom ${categoryName} | Panchal Interior`,
      description: `${product.description} Handcrafted in Ahmedabad using premium materials.`,
      images: ["https://panchalinterior.com/og-image.jpg"],
    },
  };
}

export default async function ProductDetailPage(props: PageProps) {
  const { id } = await props.params;
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Find category name
  const categoryName = categoriesData.find((c) => c.id === product.categoryId)?.name || "Furniture";

  // Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `https://panchalinterior.com${product.image}`,
    "description": product.description,
    "sku": product.id,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "25000",
      "highPrice": "250000",
      "offerCount": "10",
      "availability": "https://schema.org/InStock",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://panchalinterior.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://panchalinterior.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://panchalinterior.com/products/${product.id}`
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* 1. Navigation Header */}
      <section className="bg-stone-50 border-b border-stone-200/50 py-5">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 text-xs font-bold uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
        {/* Left Gallery Column (6 Cols) */}
        <div className="lg:col-span-6">
          <ProductGallery images={product.gallery} productName={product.name} />
        </div>

        {/* Right Info Column (6 Cols) */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {categoryName} Collection
            </span>
            <h1 className="font-cormorant text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
              {product.name}
            </h1>

            {/* Custom info */}
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
                  <span className="block text-stone-400 text-[10px] uppercase font-semibold">
                    Materials Used
                  </span>
                  <span className="block text-stone-800 font-semibold mt-0.5">
                    {product.materials.join(", ")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-lg border border-stone-100">
                <Ruler className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <span className="block text-stone-400 text-[10px] uppercase font-semibold">
                    Dimensions
                  </span>
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
          <ProductActions productId={product.id} productName={product.name} />

          <div className="flex items-center gap-2 text-stone-400 text-[10px] font-medium justify-center">
            <ShieldAlert className="h-3.5 w-3.5 text-primary" />
            <span>5-year warranty against wood-borer termites. Pricing depends on wood species selection.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
