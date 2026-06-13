"use client";

import React from "react";
import { useQuoteModal } from "./QuoteModalContext";

interface BookConsultationButtonProps {
  label: string;
  className?: string;
  productOrServiceName?: string;
  style?: React.CSSProperties;
}

export default function BookConsultationButton({
  label,
  className = "",
  productOrServiceName = "",
  style,
}: BookConsultationButtonProps) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <button
      type="button"
      onClick={() => openQuoteModal(productOrServiceName)}
      className={className}
      style={style}
    >
      {label}
    </button>
  );
}
