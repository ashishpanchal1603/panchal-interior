"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Menu,
  X,
  Sofa,
  ChevronDown,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { useQuoteModal } from "./QuoteModalContext";

export default function Navbar() {
  const pathname = usePathname();
  const { openQuoteModal } = useQuoteModal();
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
      label: "Services",
      href: "/services",
      hasDropdown: true,
    },
    {
      label: "Products",
      href: "/products",
      hasDropdown: true,
    },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{
        y: -60,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="sticky top-0 z-50 w-full border-b border-stone-100 bg-white/95 backdrop-blur-md shadow-sm"
    >
      {/* Top Bar */}

      <div className="hidden md:block bg-stone-900 text-stone-300 text-xs py-2 px-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>
            📍 Factory Address: Near Gota Bridge,
            Ahmedabad, Gujarat
          </p>

          <div className="flex gap-4">
            <span>
              Mon - Sat: 9:00 AM - 8:00 PM
            </span>

            <span>|</span>

            <a
              href="mailto:info@panchalinterior.com"
              className="hover:text-white transition"
            >
              info@panchalinterior.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">

        {/* Logo */}

        <Link
          href="/"
          aria-label="Panchal Interior Homepage"
          className="flex items-center gap-3 group"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-md transition group-hover:scale-105">
            <Sofa className="h-6 w-6" />
          </div>

          <div>
            <span className="block text-xl font-black uppercase leading-none">
              Panchal Interior
            </span>

            <span className="block text-[10px] uppercase tracking-wider text-primary font-semibold mt-1">
              Furniture & Interior Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden lg:flex items-center gap-8">

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative flex items-center gap-1 py-2 text-sm font-bold transition-all duration-300 ${isActive(link.href)
                ? "text-primary"
                : "text-stone-800 hover:text-primary"
                }`}
            >
              <span className="relative">
                {link.label}

                {!isActive(link.href) && (
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                )}
              </span>

              {link.hasDropdown && (
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${isActive(link.href)
                    ? "rotate-180"
                    : ""
                    }`}
                />
              )}

              {isActive(link.href) && (
                <motion.span
                  layoutId="active-nav"
                  className="  rounded-full bg-primary"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Section */}

        <div className="hidden md:flex items-center gap-6">

          <a
            href="tel:+919664956491"
            aria-label="Call Panchal Interior customer hotline number"
            className="flex items-center gap-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition">
              <Phone className="h-4 w-4" />
            </div>

            <div>
              <span className="block text-xs text-stone-500 uppercase">
                Call Us Now
              </span>

              <span className="block font-bold group-hover:text-primary transition">
                +91 96649 56491
              </span>
            </div>
          </a>

          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-bold shadow-sm hover:shadow-md transition"
          >
            Get Free Quote
          </button>
        </div>

        {/* Mobile Toggle */}

        <div className="flex lg:hidden items-center gap-3">

          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            className="p-2 rounded-lg hover:bg-stone-100"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}

      <AnimatePresence>

        {mobileMenuOpen && (

          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="overflow-hidden border-t border-stone-100 bg-white lg:hidden"
          >

            <div className="px-5 py-6 space-y-3">

              {navLinks.map((link) => (

                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className={`block rounded-lg px-4 py-3 font-semibold transition ${isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-stone-50"
                    }`}
                >
                  {link.label}
                </Link>

              ))}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="mt-3 w-full rounded-lg bg-primary text-white py-3 font-bold"
              >
                Get Free Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}