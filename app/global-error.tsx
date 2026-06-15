"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global crash:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-stone-50 flex items-center justify-center p-5 selection:bg-primary selection:text-stone-950 font-sans">
        <div className="max-w-md w-full bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-100/50 shadow-sm animate-pulse">
            <AlertCircle className="h-9 w-9" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-black text-stone-900 tracking-tight">
              Critical system error
            </h1>
            <p className="text-stone-500 text-sm mt-3 leading-relaxed">
              We encountered a critical crash while loading the application core shell. Please reload to recover.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={reset}
              className="w-full rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3.5 px-6 shadow-md transition flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <RefreshCw className="h-4 w-4" /> Recover System
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
