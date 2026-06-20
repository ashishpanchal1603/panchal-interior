"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sofa, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { useQuoteModal } from "./QuoteModalContext";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const { openQuoteModal } = useQuoteModal();
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const router = useRouter();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

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
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

        {/* Col 1: Brand & Intro */}
        <div className="space-y-5">
          <Link href="/" aria-label="Panchal Interior Homepage" className="flex items-center gap-2 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Sofa className="h-5.5 w-5.5" />
            </div>
            <div>
              <span className="block font-serif text-lg font-black uppercase tracking-tight leading-none">
                Panchal Interior Studio
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-wider text-primary mt-0.5 leading-none">
                Custom Furniture & Turnkey Interior Solutions
              </span>
            </div>
          </Link>
          <p className="text-sm text-stone-400 leading-relaxed">
            Ahmedabad&apos;s leading custom furniture manufacturers and turnkey interior design consultants. Delivering quality, style, and premium comfort to homes since 2011.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Panchal Interior Facebook Page" className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-stone-400 hover:bg-primary hover:text-white transition">
              <FaFacebookF className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Panchal Interior Instagram Profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-stone-400 hover:bg-primary hover:text-white transition">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Panchal Interior YouTube Channel" className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-stone-400 hover:bg-primary hover:text-white transition">
              <FaYoutube className="h-4 w-4" />
            </a>
            <a href="https://wa.me/919664956491?text=Hi%20Panchal%20Interior%20Studio%2C%0A%0AI%20need%20interior%2Ffurniture%20work.%0A%0ALocation%3A%20%0ARequirement%3A%20%0ABudget%3A%20%0APreferred%20Timeline%3A%20" target="_blank" rel="noopener noreferrer" aria-label="Contact Panchal Interior on WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-stone-400 hover:bg-primary hover:text-white transition">
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

        {/* Col 3: Local Ahmedabad Hubs */}
        <div>
          <h4 className="font-serif text-white text-base font-bold uppercase tracking-wider border-b border-stone-800 pb-3 mb-5">
            Ahmedabad Local Hubs
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/interior-designer-ahmedabad" className="hover:text-primary transition flex items-center gap-1.5 group">
                <ArrowRight className="h-3 w-3 text-stone-600 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                Interior Design
              </Link>
            </li>
            <li>
              <Link href="/custom-furniture-ahmedabad" className="hover:text-primary transition flex items-center gap-1.5 group">
                <ArrowRight className="h-3 w-3 text-stone-600 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                Custom Furniture
              </Link>
            </li>
            <li>
              <Link href="/modular-kitchen-ahmedabad" className="hover:text-primary transition flex items-center gap-1.5 group">
                <ArrowRight className="h-3 w-3 text-stone-600 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                Modular Kitchens
              </Link>
            </li>
            <li>
              <Link href="/custom-sofa-ahmedabad" className="hover:text-primary transition flex items-center gap-1.5 group">
                <ArrowRight className="h-3 w-3 text-stone-600 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                Custom Sofa Set
              </Link>
            </li>
            <li>
              <Link href="/wardrobe-design-ahmedabad" className="hover:text-primary transition flex items-center gap-1.5 group">
                <ArrowRight className="h-3 w-3 text-stone-600 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                Wardrobes & Closets
              </Link>
            </li>
            <li>
              <Link href="/tv-unit-design-ahmedabad" className="hover:text-primary transition flex items-center gap-1.5 group">
                <ArrowRight className="h-3 w-3 text-stone-600 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                TV Unit Panels
              </Link>
            </li>
            <li>
              <Link href="/home-interior-ahmedabad" className="hover:text-primary transition flex items-center gap-1.5 group">
                <ArrowRight className="h-3 w-3 text-stone-600 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                Home Renovation
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Quick Links */}
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
              <a href="tel:+919664956491" className="hover:text-white transition font-semibold text-white">
                +91 96649 56491
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
            type="button"
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