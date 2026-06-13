"use client";

import { useState, useEffect } from "react";
import { useQuoteModal } from "./QuoteModalContext";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomSelect from "./CustomSelect";

const interestOptions = [
  { value: "", label: "General Inquiry / Custom Project" },
  { value: "Custom Furniture", label: "Custom Furniture" },
  { value: "Sofa Manufacturing", label: "Sofa Manufacturing" },
  { value: "Modular Kitchen", label: "Modular Kitchen" },
  { value: "Interior Design", label: "Interior Design" },
  { value: "Electrical Work", label: "Electrical Work" },
  { value: "Painting Services", label: "Painting Services" },
  { value: "Royal Velvet Sofa Set", label: "Royal Velvet Sofa Set" },
  { value: "Classic Chesterfield Sofa", label: "Classic Chesterfield Sofa" },
  { value: "Scandinavian L-Shape Sectional", label: "Scandinavian L-Shape Sectional" },
  { value: "Floating Oak & Marble TV Console", label: "Floating Oak & Marble TV Console" },
  { value: "Luxurious Glass Profile Sliding Wardrobe", label: "Glass Profile Sliding Wardrobe" },
  { value: "Premium Teak Wood Hydraulic Storage Bed", label: "Teak Wood Hydraulic Bed" },
  { value: "German High-Gloss Acrylic Kitchen", label: "German Acrylic Modular Kitchen" },
];

export default function QuoteModal() {
  const { isOpen, closeQuoteModal, prefilledItem } = useQuoteModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Sync prefilled interest when modal opens
  useEffect(() => {
    if (prefilledItem) {
      setInterest(prefilledItem);
    } else {
      setInterest("");
    }
  }, [prefilledItem, isOpen]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset form on close
      setTimeout(() => {
        setName("");
        setPhone("");
        setEmail("");
        setInterest("");
        setMessage("");
        setSuccess(false);
        setLoading(false);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please fill in your name and phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadName: name,
          leadPhone: phone,
          leadEmail: email,
          leadMessage: `${interest ? `[Interest: ${interest}] ` : ""}${message}`,
          calcType: null,
          details: null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        // Auto close after 3 seconds
        setTimeout(() => {
          closeQuoteModal();
        }, 3000);
      } else {
        alert(data.error || "Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Quote submit error:", error);
      alert("Failed to send request due to connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuoteModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl z-10 border border-stone-100 my-8 sm:my-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50 px-6 py-4 rounded-t-2xl">
              <h3 className=" text-xl font-bold text-stone-900">
                Request a Free Quote
              </h3>
              <button
                onClick={closeQuoteModal}
                className="rounded-full p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="rounded-full bg-emerald-50 p-4 text-emerald-600 mb-4">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <h4 className="text-2xl font-bold text-stone-900 mb-2">
                    Inquiry Submitted!
                  </h4>
                  <p className="text-stone-600 max-w-sm">
                    Thank you, <span className="font-semibold">{name}</span>. Our interior design experts will contact you at <span className="font-semibold">{phone}</span> within 24 hours.
                  </p>
                  <button
                    onClick={closeQuoteModal}
                    className="mt-6 text-sm text-stone-500 hover:text-stone-800 underline transition"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 96649 56491"
                        className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ramesh@example.com"
                        className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Interested In
                    </label>
                    <CustomSelect
                      value={interest}
                      onChange={setInterest}
                      options={interestOptions}
                      placeholder="General Inquiry / Custom Project"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Project Details / Message
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your requirements, layout dimensions, preferences..."
                      className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 shadow-md transition disabled:opacity-75"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing Request...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Get My Free Quote
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
