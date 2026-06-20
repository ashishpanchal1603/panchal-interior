"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { GA_TRACKING_ID, pageview, trackConversion } from "@/lib/gtag";

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      pageview(url);
    }
  }, [pathname, searchParams]);

  // Global click tracker for link actions
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const text = (anchor.innerText || anchor.ariaLabel || anchor.title || "").trim();

      // 1. WhatsApp Click Tracking
      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        trackConversion({
          eventName: "whatsapp_click",
          buttonSource: text || "WhatsApp Link",
          serviceSelected: "WhatsApp Chat",
        });
        return;
      }

      // 2. Phone Call Click Tracking
      if (href.startsWith("tel:")) {
        trackConversion({
          eventName: "phone_call_click",
          buttonSource: text || href,
          serviceSelected: "Phone Helpline",
        });
        return;
      }

      // 3. Instagram Click Tracking
      if (href.includes("instagram.com")) {
        trackConversion({
          eventName: "instagram_click",
          buttonSource: text || "Instagram Profile",
          serviceSelected: "Instagram Social",
        });
        return;
      }

      // 4. Project Card / Detail Click Tracking
      if (href.includes("/projects/")) {
        const projectSlug = href.split("/projects/")[1] || "Project Catalog";
        trackConversion({
          eventName: "project_card_click",
          buttonSource: text || "Project Card",
          serviceSelected: projectSlug,
        });
        return;
      }

      // 5. Service Card / Detail Click Tracking
      if (href.includes("/services/")) {
        const serviceSlug = href.split("/services/")[1] || "Services Catalog";
        trackConversion({
          eventName: "service_card_click",
          buttonSource: text || "Service Card",
          serviceSelected: serviceSlug,
        });
        return;
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
}

export default function GoogleAnalytics() {
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
}
