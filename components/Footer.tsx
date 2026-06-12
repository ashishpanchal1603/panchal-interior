"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sofa, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { useQuoteModal } from "./QuoteModalContext";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const { openQuoteModal } = useQuoteModal();
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleCopyrightClick = () => {
    const now = Date.now();
    if (now - lastClickTime > 1500) {
      setClickCount(1);
    } else {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      if (newCount >= 5) {
        setClickCount(0);
        router.push("/admin/login");
      }
    }
    setLastClickTime(now);
  };


  const servicesLinks = [
    { label: "Custom Furniture", href: "/services/custom-furniture" },
    { label: "Sofa Manufacturing", href: "/services/sofa-manufacturing" },
    { label: "Modular Kitchen", href: "/services/modular-kitchen" },
    { label: "Interior Design", href: "/services/interior-design" },
    { label: "Electrical Work", href: "/services/electrical-work" },
    { label: "Painting Services", href: "/services/painting-services" },
  ];

  const quickLinks = [
    { label: "About Our Story", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Furniture Catalog", href: "/products" },
    { label: "Completed Projects", href: "/projects" },
    { label: "Latest Blogs & Guide", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Col 1: Brand & Intro */}
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-2 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Sofa className="h-5.5 w-5.5" />
            </div>
            <div>
              <span className="block font-serif text-lg font-black uppercase tracking-tight leading-none">
                Panchal Interior
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-wider text-primary mt-0.5 leading-none">
                Furniture & Interior Solutions
              </span>
            </div>
          </Link>
          <p className="text-sm text-stone-400 leading-relaxed">
            Ahmedabad's leading bespoke furniture manufacturers and interior designer consultants. Delivering quality, style, and luxury comfort to homes since 2011.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-stone-400 hover:bg-primary hover:text-white transition">
              <FaFacebookF className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-stone-400 hover:bg-primary hover:text-white transition">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-stone-400 hover:bg-primary hover:text-white transition">
              <FaYoutube className="h-4 w-4" />
            </a>
            <a href="https://wa.me/919925111438" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-stone-400 hover:bg-primary hover:text-white transition">
              <FaWhatsapp className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <h4 className="font-serif text-white text-base font-bold uppercase tracking-wider border-b border-stone-800 pb-3 mb-5">
            Our Services
          </h4>
          <ul className="space-y-3 text-sm">
            {servicesLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary transition flex items-center gap-1.5 group">
                  <ArrowRight className="h-3 w-3 text-stone-600 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div>
          <h4 className="font-serif text-white text-base font-bold uppercase tracking-wider border-b border-stone-800 pb-3 mb-5">
            Quick Navigation
          </h4>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary transition flex items-center gap-1.5 group">
                  <ArrowRight className="h-3 w-3 text-stone-600 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact & Showroom */}
        <div>
          <h4 className="font-serif text-white text-base font-bold uppercase tracking-wider border-b border-stone-800 pb-3 mb-5">
            Get In Touch
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-stone-400 leading-relaxed">
                Panchal Complex, Near Gota Bridge, Gota, Ahmedabad, Gujarat - 382481
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <a href="tel:+919925111438" className="hover:text-white transition font-semibold text-white">
                +91 9925111438
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <a href="mailto:info@panchalinterior.com" className="hover:text-white transition text-stone-400">
                info@panchalinterior.com
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Clock className="h-5 w-5 text-primary shrink-0" />
              <span className="text-stone-400">
                Mon - Sat: 9:00 AM - 8:00 PM
              </span>
            </li>
          </ul>

          <button
            onClick={() => openQuoteModal()}
            className="w-full mt-6 rounded-lg bg-stone-900 border border-stone-800 text-primary hover:bg-primary hover:text-white font-bold py-2 px-4 shadow-sm hover:border-primary transition text-sm cursor-pointer"
          >
            Request Site Consultation
          </button>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-5 mt-16 pt-8 border-t border-stone-900 text-xs text-stone-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="cursor-default select-none" onClick={handleCopyrightClick}>© {currentYear} Panchal Interior & Furniture. All rights reserved.</p>
        <p className="flex gap-4">
          <Link href="/contact" className="hover:text-stone-300 transition">Privacy Policy</Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-stone-300 transition">Terms of Service</Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-stone-300 transition">Sitemap</Link>
        </p>
      </div>
    </footer>
  );
}