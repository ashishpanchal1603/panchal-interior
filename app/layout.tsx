import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Outfit, Playfair_Display } from "next/font/google";
import QuoteModal from "@/components/QuoteModal";
import QuoteModalProvider from "@/components/QuoteModalContext";
import FloatingButtons from "@/components/FloatingButtons";

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

export const metadata = {
  title: "Panchal Interior & Furniture | Premium Custom Home Solutions",
  description:
    "Premium Custom Furniture, Luxury Sofa Manufacturing, Modular Kitchens, and Modern Home Renovation and Interior Design Services in Ahmedabad, Gujarat.",
  keywords: "Panchal Interior, Custom Furniture, Modular Kitchen, Sofa Manufacturing, Interior Design Ahmedabad",
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
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingButtons />
          <QuoteModal />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(
                      function(reg) { console.log('SW registered:', reg.scope); },
                      function(err) { console.log('SW fail:', err); }
                    );
                  });
                }
              `
            }}
          />
        </QuoteModalProvider>
      </body>
    </html>
  );
}