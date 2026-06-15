import Link from "next/link";
import { HelpCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-stone-50 flex items-center justify-center p-5 selection:bg-primary selection:text-stone-950">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md border border-stone-200/60 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary border border-primary-cream shadow-sm">
          <HelpCircle className="h-9 w-9" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            404 Error
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-stone-900 mt-4 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-stone-500 text-sm mt-3 leading-relaxed">
            The page you are looking for does not exist or has been moved. Check the URL or return to home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link
            href="/"
            aria-label="Return to Homepage"
            className="flex-1 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3 px-4 shadow-md transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Home className="h-4 w-4" /> Home Page
          </Link>
          <Link
            href="/services"
            aria-label="Explore our services"
            className="flex-1 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-sm font-bold py-3 px-4 transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Our Services
          </Link>
        </div>
      </div>
    </div>
  );
}
