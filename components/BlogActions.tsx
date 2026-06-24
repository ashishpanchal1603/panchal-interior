"use client";

import React from "react";
import { Share2 } from "lucide-react";
import { useQuoteModal } from "./QuoteModalContext";
import { useToast } from "@/components/admin/Toast";

interface ShareButtonProps {
  label?: string;
}

export function ShareButton({ label = "Share Guide" }: ShareButtonProps) {
  const { showToast } = useToast();
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          showToast("Copied link to clipboard!", "success");
        })
        .catch((err) => {
          console.error("Failed to copy link:", err);
        });
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-1.5 text-stone-400 hover:text-stone-900 text-xs font-bold uppercase tracking-wider transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Share2 className="h-4 w-4 text-primary" />
      {label}
    </button>
  );
}

interface BlogCTASectionProps {
  postTitle: string;
}

export function BlogCTASection({ postTitle }: BlogCTASectionProps) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="max-w-4xl mx-auto px-5 mt-20 text-center">
      <div className="bg-stone-900 text-white rounded-2xl p-8 border border-stone-850 shadow-md">
        <h3 className="font-cormorant text-xl font-bold">Looking to design a custom modular kitchen?</h3>
        <p className="text-stone-400 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
          Discuss plywood types, hardware models, and layout solutions with our design director.
        </p>
        <button
          type="button"
          onClick={() => openQuoteModal(`Consultation from Blog: ${postTitle}`)}
          className="mt-6 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Book Free Consultation
        </button>
      </div>
    </section>
  );
}
