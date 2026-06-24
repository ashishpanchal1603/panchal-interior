"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import CustomSelect from "./CustomSelect";
import { trackConversion } from "@/lib/gtag";
import { useToast } from "@/components/admin/Toast";

const subjectOptions = [
  { value: "General Inquiry", label: "General Inquiry / Information" },
  { value: "Custom Furniture Design", label: "Custom Furniture Manufacturing" },
  { value: "Modular Kitchen Consultation", label: "Modular Kitchen Layout Setup" },
  { value: "Turnkey Interior Execution", label: "Full House Interior Design" },
  { value: "Site Measurement Visit", label: "Schedule Site Measurement Visit" },
];

export default function ContactForm() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");

  // Honeypot field to trap spam bots
  const [botField, setBotField] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast("Please enter your name and phone number.", "error");
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
          leadMessage: `[Subject: ${subject}] ${message}`,
          calcType: null,
          details: null,
          website: botField, // Honeypot field sent to backend
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        trackConversion({
          eventName: "quote_form_submit",
          serviceSelected: subject,
          buttonSource: "contact_form",
        });
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
        setBotField("");
      } else {
        showToast(data.error || "Failed to submit inquiry. Please try again.", "error");
      }
    } catch (error) {
      console.error("Contact submit error:", error);
      showToast("Connection error. Failed to send message.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-stone-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
      <h2 className="font-cormorant text-xl sm:text-2xl font-bold text-stone-900 mb-6">
        Send Us a Message
      </h2>

      {success ? (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="rounded-full bg-emerald-50 p-4 text-emerald-600 mb-4">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h3 className="text-xl font-bold text-stone-900">Message Sent Successfully!</h3>
          <p className="text-stone-500 text-sm mt-2 max-w-sm">
            Thank you for reaching out. A Panchal Interior design executive will review your inquiry and get back to you shortly.
          </p>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="mt-6 text-sm text-primary hover:underline font-bold"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot field: invisible to users, but bots will fill it */}
          <div className="absolute opacity-0 -z-50 h-0 w-0 pointer-events-none" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              type="text"
              name="website"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rajesh Shah"
              className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                placeholder="e.g. +91 99999 99999"
                className={`w-full rounded-lg border px-4 py-2.5 text-stone-800 focus:outline-none transition text-sm ${
                  phoneError 
                    ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400" 
                    : "border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary"
                }`}
              />
              {phoneError && (
                <p className="text-red-500 text-[10px] mt-1 font-semibold">{phoneError}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rajesh@example.com"
                className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              What is this regarding?
            </label>
            <CustomSelect
              value={subject}
              onChange={setSubject}
              options={subjectOptions}
              placeholder="General Inquiry / Information"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Describe your requirements
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your space layout, sizing requirements, budget, preferred materials, or timelines..."
              className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition resize-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-6 shadow-md transition disabled:opacity-70 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="h-4.5 w-4.5" />
                Send My Inquiry
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
