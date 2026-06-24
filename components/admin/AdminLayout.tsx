"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  IndianRupee,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Sofa,
  Briefcase,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface AdminLayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function AdminLayout({ children, isDarkMode, toggleTheme }: AdminLayoutProps) {
  const pathname = usePathname();
  const { logout } = useAdminAuth();
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Estimates", href: "/admin/estimates", icon: FileText },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Price Master", href: "/admin/price-master", icon: IndianRupee },
    { label: "Leads Inbox", href: "/admin/leads", icon: MessageSquare },
    { label: "Suite Settings", href: "/admin/settings", icon: Settings },
  ];

  const getActiveTitle = () => {
    if (pathname.startsWith("/admin/dashboard")) return "Dashboard Overview";
    if (pathname.startsWith("/admin/estimates/new")) return "Create New Estimate";
    if (pathname.startsWith("/admin/estimates/edit")) return "Modify Estimate Draft";
    if (pathname.startsWith("/admin/estimates")) return "Estimates Registry";
    if (pathname.startsWith("/admin/customers")) return "Customer Master";
    if (pathname.startsWith("/admin/price-master")) return "Central Price Master";
    if (pathname.startsWith("/admin/leads")) return "Leads & Consultation Queries";
    if (pathname.startsWith("/admin/settings")) return "Suite Configurations";
    return "Admin Panel";
  };

  const activePageTitle = getActiveTitle();

  return (
    <div className="flex min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      
      {/* 1. DESKTOP SIDEBAR */}
      <motion.aside
        animate={{ width: isSidebarCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex flex-col fixed top-0 bottom-0 left-0 bg-stone-900 text-stone-200 border-r border-stone-800/60 z-30 overflow-hidden select-none"
      >
        {/* Sidebar Header Logo */}
        <div className="flex h-20 items-center gap-3 px-5 border-b border-stone-800/80">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md">
            <Sofa className="h-5.5 w-5.5" />
          </div>
          {!isSidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="font-serif leading-none"
            >
              <span className="block font-black text-sm uppercase tracking-wider text-white">
                PANCHAL STUDIO
              </span>
              <span className="block text-[8px] uppercase tracking-widest text-primary font-bold mt-1">
                Business Suite
              </span>
            </motion.div>
          )}
        </div>

        {/* Links Navigation */}
        <nav className="flex-grow py-6 px-3 space-y-1.5 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3.5 py-3 px-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/10"
                    : "text-stone-400 hover:bg-stone-800/50 hover:text-white"
                }`}
                title={link.label}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-stone-400 group-hover:text-white"}`} />
                {!isSidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="truncate"
                  >
                    {link.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-stone-800/85 space-y-1">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex w-full items-center gap-3.5 py-3 px-3.5 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-300 transition cursor-pointer hover:bg-stone-800/30"
          >
            {isSidebarCollapsed ? (
              <>
                <ChevronRight className="h-5 w-5 shrink-0" />
              </>
            ) : (
              <>
                <ChevronLeft className="h-5 w-5 shrink-0" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3.5 py-3 px-3.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-950/20 hover:text-red-300 transition cursor-pointer"
            title="Log Out"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Spacer to push content to correct alignment depending on desktop sidebar */}
      <div
        className="hidden md:block transition-all duration-300 shrink-0"
        style={{ width: isSidebarCollapsed ? 80 : 260 }}
      />

      {/* 2. MOBILE DRAWER NAVIGATION MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Side Sheet Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-stone-900 text-stone-200 border-r border-stone-850 z-50 md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex h-20 items-center justify-between px-5 border-b border-stone-800/80">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                    <Sofa className="h-5.5 w-5.5" />
                  </div>
                  <div className="font-serif leading-none">
                    <span className="block font-black text-sm uppercase tracking-wider text-white">
                      PANCHAL STUDIO
                    </span>
                    <span className="block text-[8px] uppercase tracking-widest text-primary font-bold mt-1">
                      Business Suite
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-stone-850 text-stone-400 hover:text-white transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex-grow py-6 px-4 space-y-1.5 overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3.5 py-3 px-4 rounded-xl text-sm font-semibold transition ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-stone-400 hover:bg-stone-800/50 hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-stone-800/80">
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-3.5 py-3 px-4 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-950/20 hover:text-red-300 transition cursor-pointer"
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. MAIN WORKSPACE CONTAINER */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-20 h-20 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-800/40 px-5 sm:px-8 flex justify-between items-center transition-colors duration-300 select-none">
          {/* Breadcrumb / Title area */}
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition cursor-pointer"
              title="Open Navigation"
            >
              <Menu className="h-5.5 w-5.5" />
            </button>
            
            <div className="hidden sm:block">
              <span className="block text-[10px] uppercase tracking-wider text-primary font-bold">
                Panchal Interior Business Suite
              </span>
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-white leading-tight mt-0.5">
                {activePageTitle}
              </h2>
            </div>
            <div className="sm:hidden font-serif font-bold text-base text-stone-900 dark:text-white">
              {activePageTitle}
            </div>
          </div>

          {/* Quick Actions (Theme Switch, Admin Identity) */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Dark Mode toggle icon button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/50 dark:border-stone-700/30 text-stone-600 dark:text-stone-300 hover:border-primary dark:hover:border-primary/50 transition cursor-pointer hover:scale-[1.03] active:scale-[0.97]"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5 text-stone-500" />}
            </button>

            {/* Profile visual badge */}
            <div className="hidden md:flex items-center gap-3 pl-3 border-l border-stone-200 dark:border-stone-800/70">
              <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                A
              </div>
              <div className="text-left leading-tight">
                <span className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                  Administrator
                </span>
                <span className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest">
                  Active Session
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Workspace Area */}
        <main className="flex-grow p-5 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
