import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import QuoteModalProvider from "@/components/QuoteModalContext";
import ClientLayoutElements from "@/components/ClientLayoutElements";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from "react";
import { ToastProvider } from "@/components/admin/Toast";
import StructuredData from "@/components/StructuredData";
import { getOrganizationSchema } from "@/lib/schema";


const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const productionUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://panchal-interior.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: {
    default: "Panchal Interior - Furniture & Turnkey Interior Solutions | Ahmedabad",
    template: "%s | Panchal Interior",
  },
  description:
    "Panchal Interior offers premium Custom Furniture, luxury Sofa Manufacturing, modular Kitchen designs, and Turnkey Home Renovation and Interior Solutions in Ahmedabad, Gujarat.",
  applicationName: "Panchal Interior",
  creator: "Panchal Interior",
  publisher: "Panchal Interior",
  category: "Interior Design",
  keywords: [
    "Panchal Interior",
    "Custom Furniture Ahmedabad",
    "Modular Kitchen Ahmedabad",
    "Sofa Manufacturing Ahmedabad",
    "Interior Designer Ahmedabad",
    "Wardrobe Designer Ahmedabad",
    "Turnkey Interior Solutions Ahmedabad",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Panchal Interior - Furniture & Turnkey Interior Solutions",
    description: "Premium modular kitchens, luxury sofas, custom wardrobes, and turnkey interior solutions directly from our Gota workshop with a 5-year warranty.",
    url: "/",
    siteName: "Panchal Interior",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 1024,
        alt: "Panchal Interior - Furniture & Turnkey Interior Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Panchal Interior & Furniture Solutions | Ahmedabad",
    description: "Premium modular kitchen, custom wardrobes, and turnkey interior designs directly from our workshop with 5-year warranty.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <ToastProvider>
          <QuoteModalProvider>
            <StructuredData data={getOrganizationSchema()} />
            <GoogleAnalytics />
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            <main className="flex-grow">{children}</main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <Suspense fallback={null}>
            <ClientLayoutElements />
          </Suspense>
          <Script id="service-worker-handling" strategy="lazyOnload">
            {process.env.NODE_ENV === "production" ? `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(reg) { console.log('SW registered:', reg.scope); },
                    function(err) { console.log('SW fail:', err); }
                  );
                });
              }
            ` : `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for (let registration of registrations) {
                    registration.unregister().then(function(unregistered) {
                      if (unregistered) {
                        console.log('SW unregistered in development:', registration.scope);
                      }
                    });
                  }
                });
              }
            `}
          </Script>
          </QuoteModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}