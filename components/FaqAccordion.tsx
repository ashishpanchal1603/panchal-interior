"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-3 mt-6">
      {faqs.map((faq, i) => {
        const isOpen = openIdx === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;

        return (
          <div
            key={i}
            className="border border-stone-200/80 rounded-xl overflow-hidden shadow-sm bg-white"
          >
            <button
              id={buttonId}
              onClick={() => toggleFaq(i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex justify-between items-center bg-stone-50 hover:bg-stone-100/60 p-4.5 text-left text-stone-800 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="h-4.5 w-4.5 text-primary shrink-0" />
                {faq.question}
              </span>
              {isOpen ? (
                <ChevronUp className="h-4.5 w-4.5 text-stone-500 shrink-0" />
              ) : (
                <ChevronDown className="h-4.5 w-4.5 text-stone-500 shrink-0" />
              )}
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={`transition-all duration-200 ease-in-out ${
                isOpen ? "max-h-96 opacity-100 p-5 border-t border-stone-100" : "max-h-0 opacity-0 overflow-hidden"
              } bg-white text-stone-600 text-sm leading-relaxed`}
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
