"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Info, X } from "lucide-react";
import { motion } from "framer-motion";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
}: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const typeStyles = {
    danger: {
      bg: "bg-red-600 hover:bg-red-700 text-white",
      text: "text-red-650",
      border: "border-red-100 dark:border-red-950",
      iconBg: "bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400",
    },
    warning: {
      bg: "bg-amber-600 hover:bg-amber-700 text-white",
      text: "text-amber-650",
      border: "border-amber-100 dark:border-amber-950",
      iconBg: "bg-amber-100 dark:bg-amber-950/50 text-amber-650 dark:text-amber-400",
    },
    info: {
      bg: "bg-primary hover:bg-primary-hover text-white",
      text: "text-primary",
      border: "border-stone-100 dark:border-stone-850",
      iconBg: "bg-primary/10 text-primary",
    },
  };

  const currentStyles = typeStyles[type];

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] overflow-y-auto font-sans flex items-center justify-center p-4">
      {/* Backdrop blur overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} 
        className="fixed inset-0 bg-stone-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative bg-white dark:bg-stone-900 w-full max-w-md rounded-2xl shadow-2xl border border-stone-200/80 dark:border-stone-800/80 overflow-hidden p-6 z-50 flex flex-col gap-4"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-xl text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title and Icon */}
        <div className="flex items-start gap-4 pr-6">
          <div className={`p-3 rounded-xl shrink-0 ${currentStyles.iconBg}`}>
            {type === "info" ? <Info className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white leading-tight">
              {title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mt-1.5">
              {message}
            </p>
          </div>
        </div>

        {/* Buttons Action Toolbar */}
        <div className="flex justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-stone-200 dark:border-stone-750 text-stone-700 dark:text-stone-300 bg-transparent rounded-xl text-xs font-bold transition hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer active:scale-[0.98] select-none"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer active:scale-[0.98] select-none ${currentStyles.bg}`}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
