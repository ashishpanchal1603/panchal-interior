"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeImg, setActiveImg] = useState(images[0] || "");

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-96 sm:h-[450px] w-full bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
        <Image
          src={activeImg}
          alt={productName}
          fill
          sizes="(max-w-7xl) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => {
            const isActive = activeImg === img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImg(img)}
                aria-label={`View gallery image ${idx + 1}`}
                className={`relative h-20 w-20 shrink-0 rounded-lg overflow-hidden border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive ? "border-primary shadow-sm" : "border-stone-200 hover:border-stone-400"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
