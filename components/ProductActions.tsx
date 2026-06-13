"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useQuoteModal } from "./QuoteModalContext";

interface ProductActionsProps {
  productId: string;
  productName: string;
}

export default function ProductActions({ productId, productName }: ProductActionsProps) {
  const { openQuoteModal } = useQuoteModal();

  const waMessage = encodeURIComponent(
    `Hello Panchal Interior, I would like to get customization options and price estimate for the product: "${productName}" (ID: ${productId}).`
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 border-t border-stone-100 pt-8">
      <a
        href={`https://wa.me/919664956491?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 shadow-md transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <FaWhatsapp className="h-5 w-5" />
        Inquire on WhatsApp
      </a>
      <button
        type="button"
        onClick={() => openQuoteModal(productName)}
        className="flex-1 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-6 shadow-md transition duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Request Custom Estimate
      </button>
    </div>
  );
}
