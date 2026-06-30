import type { Metadata } from "next";
import { landingPagesData } from "@/data/localSeoData";
import AhmedabadLandingTemplate from "@/components/AhmedabadLandingTemplate";

const config = landingPagesData["modular-kitchen-ahmedabad"];

export const metadata: Metadata = {
  title: config.title,
  description: config.metaDescription,
  alternates: {
    canonical: `/${config.slug}`,
  },
  openGraph: {
    title: config.title,
    description: config.metaDescription,
    url: `https://panchal-interior.vercel.app/${config.slug}`,
    siteName: "Panchal Interior",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://panchal-interior.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: config.h1,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.metaDescription,
    images: ["https://panchal-interior.vercel.app/og-image.jpg"],
  },
};

export default function Page() {
  return <AhmedabadLandingTemplate config={config} />;
}
