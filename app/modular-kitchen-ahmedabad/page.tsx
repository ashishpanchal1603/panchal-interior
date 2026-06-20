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
    url: `/${config.slug}`,
    siteName: "Panchal Interior ",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: config.hero.image,
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
    images: [config.hero.image],
  },
};

export default function Page() {
  return <AhmedabadLandingTemplate config={config} />;
}
