"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { ToastProvider } from "./Toast";
import AdminLayout from "./AdminLayout";

export default function AdminClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Authentication check
  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    const username = sessionStorage.getItem("admin_username");
    const password = sessionStorage.getItem("admin_password");

    if (!username || !password) {
      setIsAuthenticated(false);
      router.replace("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [pathname, router]);

  // Load and apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("admin_theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("light"); // Defaulting to light as it matches Walnut & Linen main branding
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("admin_theme", nextTheme);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-center items-center py-12 font-sans selection:bg-primary">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="mt-3 text-sm font-semibold text-stone-500">
          Checking credentials...
        </span>
      </div>
    );
  }

  // Login page bypasses layout wrapping
  if (pathname === "/admin/login") {
    return <ToastProvider>{children}</ToastProvider>;
  }

  if (isAuthenticated) {
    return (
      <ToastProvider>
        {/* Outer wrapper that binds the theme variable overrides */}
        <div className={theme === "dark" ? "dark bg-stone-50 text-stone-900 min-h-screen flex flex-col" : "bg-stone-50 text-stone-900 min-h-screen flex flex-col"}>
          <div className="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen flex flex-col transition-colors duration-300">
            <AdminLayout isDarkMode={theme === "dark"} toggleTheme={toggleTheme}>
              {children}
            </AdminLayout>
          </div>
        </div>
      </ToastProvider>
    );
  }

  return null;
}
