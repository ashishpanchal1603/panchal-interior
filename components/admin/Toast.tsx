"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 3.5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Overlay Portal Container */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = toast.type === "success" 
              ? CheckCircle 
              : toast.type === "error" 
              ? XCircle 
              : Info;

            const bgClass = toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/80 dark:border-emerald-900/50 dark:text-emerald-300"
              : toast.type === "error"
              ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/80 dark:border-red-900/50 dark:text-red-300"
              : "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/80 dark:border-amber-900/50 dark:text-amber-300";

            const iconColorClass = toast.type === "success"
              ? "text-emerald-500"
              : toast.type === "error"
              ? "text-red-500"
              : "text-primary";

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`pointer-events-auto border rounded-2xl p-4 flex gap-3 shadow-lg backdrop-blur-md items-start font-sans ${bgClass}`}
              >
                <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${iconColorClass}`} />
                <div className="flex-grow">
                  <p className="text-sm font-semibold leading-relaxed">
                    {toast.message}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 p-0.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
