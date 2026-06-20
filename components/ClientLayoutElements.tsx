"use client";

import dynamic from "next/dynamic";

const QuoteModal = dynamic(() => import("./QuoteModal"), { ssr: false });
const FloatingButtons = dynamic(() => import("./FloatingButtons"), { ssr: false });
const MobileBottomNav = dynamic(() => import("./MobileBottomNav"), { ssr: false });
const AIChatbot = dynamic(() => import("./AIChatbot"), { ssr: false });

export default function ClientLayoutElements() {
  return (
    <>
      <FloatingButtons />
      <MobileBottomNav />
      <QuoteModal />
      <AIChatbot />
    </>
  );
}
