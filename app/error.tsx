"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-stone-50 flex items-center justify-center p-5 selection:bg-primary selection:text-stone-950">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md border border-stone-200/60 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-100/50 shadow-sm animate-pulse">
          <AlertCircle className="h-9 w-9" />
        </div>
        <div>
          <h1 className="font-cormorant text-3xl font-extrabold text-stone-900 tracking-normal">
            Something went wrong
          </h1>
          <p className="text-stone-500 text-sm mt-3 leading-relaxed">
            An unexpected error occurred while loading this page. Our team has been notified.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={reset}
            className="flex-1 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3 px-4 shadow-md transition flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
          <Link
            href="/"
            aria-label="Return to homepage"
            className="flex-1 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-sm font-bold py-3 px-4 transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Home className="h-4 w-4" /> Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
