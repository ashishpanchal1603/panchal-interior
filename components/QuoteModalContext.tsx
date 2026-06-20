"use client";

import React, { createContext, useContext, useState } from "react";
import { trackConversion } from "@/lib/gtag";

interface QuoteModalContextType {
  isOpen: boolean;
  openQuoteModal: (productOrServiceName?: string) => void;
  closeQuoteModal: () => void;
  prefilledItem: string;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(
  undefined
);

export default function QuoteModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefilledItem, setPrefilledItem] = useState("");

  const openQuoteModal = (productOrServiceName?: string) => {
    if (productOrServiceName) {
      setPrefilledItem(productOrServiceName);
    } else {
      setPrefilledItem("");
    }
    setIsOpen(true);

    const isConsultation = productOrServiceName?.toLowerCase().includes("consultation");
    trackConversion({
      eventName: isConsultation ? "free_consultation_click" : "get_quote_click",
      serviceSelected: productOrServiceName || "General Enquiry",
      buttonSource: "quote_modal_trigger",
    });
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
    setPrefilledItem("");
  };

  return (
    <QuoteModalContext.Provider
      value={{ isOpen, openQuoteModal, closeQuoteModal, prefilledItem }}
    >
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (context === undefined) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
}
