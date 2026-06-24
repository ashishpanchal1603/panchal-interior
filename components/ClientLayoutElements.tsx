"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const QuoteModal = dynamic(() => import("./QuoteModal"), { ssr: false });
const FloatingButtons = dynamic(() => import("./FloatingButtons"), { ssr: false });
const MobileBottomNav = dynamic(() => import("./MobileBottomNav"), { ssr: false });
const AIChatbot = dynamic(() => import("./AIChatbot"), { ssr: false });

export default function ClientLayoutElements() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <>
      <FloatingButtons />
      <MobileBottomNav />
      <QuoteModal />
      <AIChatbot />
    </>
  );
}
