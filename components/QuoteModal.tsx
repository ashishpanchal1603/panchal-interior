"use client";

import { useState, useEffect } from "react";
import { useQuoteModal } from "./QuoteModalContext";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomSelect from "./CustomSelect";
import { trackConversion } from "@/lib/gtag";
import { useToast } from "@/components/admin/Toast";

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

const propertyTypeOptions = [
  { value: "", label: "Select Property Type" },
  { value: "1-2 BHK Flat", label: "1-2 BHK Flat" },
  { value: "3-4 BHK Flat / Penthouse", label: "3-4 BHK Flat / Penthouse" },
  { value: "Independent Villa", label: "Independent Villa" },
  { value: "Commercial / Office", label: "Commercial / Office" },
  { value: "Single Room / Custom Piece", label: "Single Room / Custom Piece" }
];

const budgetRangeOptions = [
  { value: "", label: "Select Budget Range" },
  { value: "Under ₹1.5 Lakhs", label: "Under ₹1.5 Lakhs" },
  { value: "₹1.5 Lakhs - ₹3 Lakhs", label: "₹1.5 Lakhs - ₹3 Lakhs" },
  { value: "₹3 Lakhs - ₹6 Lakhs", label: "₹3 Lakhs - ₹6 Lakhs" },
  { value: "₹6 Lakhs - ₹10 Lakhs", label: "₹6 Lakhs - ₹10 Lakhs" },
  { value: "₹10 Lakhs - ₹15 Lakhs", label: "₹10 Lakhs - ₹15 Lakhs" },
  { value: "₹15 Lakhs+", label: "₹15 Lakhs+" }
];

const timelineOptions = [
  { value: "", label: "Select Preferred Timeline" },
  { value: "Immediate (Within 15 days)", label: "Immediate (Within 15 days)" },
  { value: "Within 1 Month", label: "Within 1 Month" },
  { value: "2-3 Months", label: "2-3 Months" },
  { value: "Planning phase (> 3 months)", label: "Planning phase (> 3 months)" }
];

export default function QuoteModal() {
  const { isOpen, closeQuoteModal, prefilledItem } = useQuoteModal();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Sync prefilled interest when modal opens
  useEffect(() => {
    const targetInterest = prefilledItem || "";
    if (interest !== targetInterest) {
      const timer = setTimeout(() => {
        setInterest(targetInterest);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [prefilledItem, isOpen, interest]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setTimeout(() => {
        setName("");
        setPhone("");
        setEmail("");
        setInterest("");
        setLocation("");
        setPropertyType("");
        setBudgetRange("");
        setTimeline("");
        setMessage("");
        setSuccess(false);
        setLoading(false);
        setPhoneError("");
      }, 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast("Please fill in your name and phone number.", "error");
      return;
    }

    // Phone number validation (exactly 10 digits with optional +91 / 0)
    const cleanedPhone = phone.replace(/\D/g, "");
    const isPhoneValid = cleanedPhone.length === 10 || 
                         (cleanedPhone.length === 12 && cleanedPhone.startsWith("91")) ||
                         (cleanedPhone.length === 11 && cleanedPhone.startsWith("0"));

    if (!isPhoneValid) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
      return;
    } else {
      setPhoneError("");
    }

    setLoading(true);

    const formattedMessage = [
      interest ? `Requirement: ${interest}` : "",
      location ? `Location: ${location}` : "",
      propertyType ? `Property Type: ${propertyType}` : "",
      budgetRange ? `Budget Range: ${budgetRange}` : "",
      timeline ? `Timeline: ${timeline}` : "",
      message ? `Message: ${message}` : ""
    ].filter(Boolean).join("\n");

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
          leadMessage: formattedMessage,
          calcType: null,
          details: null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        trackConversion({
          eventName: "quote_form_submit",
          serviceSelected: interest || "General Inquiry",
          buttonSource: "quote_modal_form",
          propertyType: propertyType,
          budgetRange: budgetRange,
          timeline: timeline,
          location: location,
        });
        // Auto close after 3 seconds
        setTimeout(() => {
          closeQuoteModal();
        }, 3000);
      } else {
        showToast(data.error || "Failed to submit request. Please try again.", "error");
      }
    } catch (error) {
      console.error("Quote submit error:", error);
      showToast("Failed to send request due to connection error.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
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
            className="relative w-full h-full sm:h-auto max-h-screen sm:max-h-[90vh] sm:max-w-lg sm:rounded-2xl bg-white shadow-2xl z-10 border border-stone-100 flex flex-col sm:my-0 overflow-hidden"
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
            <div className="p-6 flex-grow overflow-y-auto">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (phoneError) setPhoneError("");
                        }}
                        placeholder="e.g. 96649 56491"
                        className={`w-full rounded-lg border px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:outline-none transition text-sm ${
                          phoneError 
                            ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400" 
                            : "border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary"
                        }`}
                      />
                      {phoneError && (
                        <p className="text-red-500 text-[10px] mt-1 font-semibold">{phoneError}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                        Location / Area in Ahmedabad *
                      </label>
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Gota / Satellite"
                        className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition text-sm"
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
                        className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                        Requirement
                      </label>
                      <CustomSelect
                        value={interest}
                        onChange={setInterest}
                        options={interestOptions}
                        placeholder="General Inquiry"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                        Property Type
                      </label>
                      <CustomSelect
                        value={propertyType}
                        onChange={setPropertyType}
                        options={propertyTypeOptions}
                        placeholder="Select Property Type"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                        Budget Range
                      </label>
                      <CustomSelect
                        value={budgetRange}
                        onChange={setBudgetRange}
                        options={budgetRangeOptions}
                        placeholder="Select Budget Range"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                        Preferred Timeline
                      </label>
                      <CustomSelect
                        value={timeline}
                        onChange={setTimeline}
                        options={timelineOptions}
                        placeholder="Select Preferred Timeline"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Project Details / Message (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your preferences..."
                      className="w-full rounded-lg border border-stone-200 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition resize-none text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 shadow-md transition disabled:opacity-75 cursor-pointer text-sm font-bold"
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
