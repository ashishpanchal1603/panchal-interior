"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import {
  FullHomeState,
  KitchenState,
  WardrobeState,
} from "./types";

interface SuccessStateProps {
  leadName: string;
  leadPhone: string;
  calcType: "full" | "kitchen" | "wardrobe";
  fullState: FullHomeState;
  kitchenState: KitchenState;
  wardrobeState: WardrobeState;
  onReset: () => void;
  openQuoteModal: () => void;
}

export default function SuccessState({
  leadName,
  leadPhone,
  calcType,
  fullState,
  kitchenState,
  wardrobeState,
  onReset,
  openQuoteModal,
}: SuccessStateProps) {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="text-center py-10 max-w-md mx-auto space-y-6"
    >
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
        <CheckCircle className="h-10 w-10 animate-bounce" />
      </div>
      <div>
        <h3 className="font-serif text-2xl font-bold text-stone-900">
          Estimation Submitted!
        </h3>
        <p className="text-stone-500 text-sm mt-3 leading-relaxed">
          Thank you, <span className="font-bold text-stone-850">{leadName}</span>. Your custom configuration has been logged successfully. 
          Our design engineer will analyze your requirements and reach out to you within 24 hours at{" "}
          <span className="font-bold text-stone-850">{leadPhone}</span> to share your detailed budget estimate and arrange a free on-site measurement verification.
        </p>
      </div>

      <div className="pt-6 flex gap-4 justify-center">
        <button
          onClick={onReset}
          className="rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold py-2.5 px-5 text-sm transition cursor-pointer font-sans"
        >
          Calculate Another Layout
        </button>
        <button
          onClick={openQuoteModal}
          className="rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-5 text-sm transition cursor-pointer font-sans"
        >
          Consult Now
        </button>
      </div>
    </motion.div>
  );
}
