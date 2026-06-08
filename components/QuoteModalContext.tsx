"use client";

import React, { createContext, useContext, useState } from "react";

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
