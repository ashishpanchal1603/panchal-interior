import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Outfit, Playfair_Display } from "next/font/google";
import QuoteModalProvider from "@/components/QuoteModalContext";
import ClientLayoutElements from "@/components/ClientLayoutElements";
import GoogleAnalytics from "@/components/GoogleAnalytics";


const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const productionUrl = "https://panchalinterior.com";

const metadataBaseUrl = new URL(productionUrl);

export const metadata = {
  metadataBase: metadataBaseUrl,
  title: {
    default: "Panchal Interior - Furniture & Turnkey Interior Solutions | Ahmedabad",
    template: "%s | Panchal Interior ",
  },
  description:
    "Panchal Interior  offers premium Custom Furniture, luxury Sofa Manufacturing, modular Kitchen designs, and Turnkey Home Renovation and Interior Solutions in Ahmedabad, Gujarat.",
  keywords: [
    "Panchal Interior ",
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
    title: "Panchal Interior  - Furniture & Turnkey Interior Solutions",
    description: "Premium modular kitchens, luxury sofas, custom wardrobes, and turnkey interior solutions directly from our Gota workshop with a 5-year warranty.",
    url: "/",
    siteName: "Panchal Interior ",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Panchal Interior Showroom Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Panchal Interior & Furniture Solutions | Ahmedabad",
    description: "Premium modular kitchen, custom wardrobes, and turnkey interior designs directly from our workshop with 5-year warranty.",
    images: ["/images/hero.png"],
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
      className={`${outfit.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <QuoteModalProvider>
          <GoogleAnalytics />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ClientLayoutElements />
          {process.env.NODE_ENV === "production" ? (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  if ('serviceWorker' in navigator) {
                    const register = () => {
                      navigator.serviceWorker.register('/sw.js').then(
                        function(reg) { console.log('SW registered:', reg.scope); },
                        function(err) { console.log('SW fail:', err); }
                      );
                    };
                    if (document.readyState === 'complete') {
                      register();
                    } else {
                      window.addEventListener('load', register);
                    }
                  }
                `
              }}
            />
          ) : (
            <script
              dangerouslySetInnerHTML={{
                __html: `
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
                `
              }}
            />
          )}
        </QuoteModalProvider>
      </body>
    </html>
  );
}