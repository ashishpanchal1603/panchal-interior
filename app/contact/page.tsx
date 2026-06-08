"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // FAQ state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const contactFaqs = [
    {
      question: "Do you charge for site visits and measurements?",
      answer: "No, site visits and measurements are completely free of charge for locations within Ahmedabad. Our supervisor will visit your site, take precise dimensions, and discuss initial layouts with no obligation.",
    },
    {
      question: "What is your warranty policy on wood furniture?",
      answer: "We offer a 5-year replacement warranty against structural termites and wood-borers on all custom furniture. All soft-closing kitchen baskets and cabinet hardware (from Hettich/Hafele) carry their respective brand warranties up to 10 years.",
    },
    {
      question: "What is the typical timeframe for a modular kitchen setup?",
      answer: "Once the 3D layout design is approved and dimensions are finalized, factory cutting and edge-banding takes 10-12 days. On-site modular assembly and countertop quartz fitting takes only 3-5 days, causing minimal disruption at your home.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    setLoading(true);
    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  const toggleFaq = (idx: number) => {
    if (openFaqIdx === idx) {
      setOpenFaqIdx(null);
    } else {
      setOpenFaqIdx(idx);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">

      {/* 1. Header Banner */}
      <section className="relative py-16 bg-stone-900 overflow-hidden text-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-stone-900/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-5">
          <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-md">
            Connect With Us
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-5">
            Contact Panchal Interior
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Have a project in mind? Reach out to our design consultants or visit our factory workshop directly in Ahmedabad.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-5 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column (5 Cols): Details & FAQs */}
        <div className="lg:col-span-5 space-y-10">

          {/* Contact Cards Block */}
          <div className="bg-white border border-stone-200/60 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Office & Factory Details
            </h2>

            <ul className="space-y-5 text-sm">
              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider">Factory Address</span>
                  <span className="block text-stone-700 font-semibold leading-relaxed mt-1">
                    Panchal Complex, Near Gota Bridge, Gota, Ahmedabad, Gujarat - 382481
                  </span>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider">Hotline Contact</span>
                  <a href="tel:+919876543210" className="block text-stone-900 font-bold hover:text-primary transition mt-1">
                    +91 9925111438
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider">Email Support</span>
                  <a href="mailto:info@panchalinterior.com" className="block text-stone-700 font-semibold hover:text-primary transition mt-1">
                    info@panchalinterior.com
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider">Operating Hours</span>
                  <span className="block text-stone-700 font-semibold mt-1">
                    Monday - Saturday: 9:00 AM - 8:00 PM <br />
                    <span className="text-stone-400 font-medium">(Sundays: Pre-booked Site Visits Only)</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact FAQs Block */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">Consultation FAQs</h3>
            <div className="space-y-3">
              {contactFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-stone-200/80 rounded-xl overflow-hidden shadow-sm bg-white"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex justify-between items-center bg-stone-50 hover:bg-stone-100/60 p-4 text-left text-stone-850 text-xs font-bold transition"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                      {faq.question}
                    </span>
                    {openFaqIdx === i ? <ChevronUp className="h-4 w-4 text-stone-500" /> : <ChevronDown className="h-4 w-4 text-stone-500" />}
                  </button>
                  {openFaqIdx === i && (
                    <div className="p-4 bg-white text-stone-600 text-xs leading-relaxed border-t border-stone-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (7 Cols): Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-stone-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-6">
              Send Us a Message
            </h2>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="rounded-full bg-emerald-50 p-4 text-emerald-600 mb-4">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">Message Sent Successfully!</h3>
                <p className="text-stone-500 text-sm mt-2 max-w-sm">
                  Thank you for reaching out. A Panchal Interior design executive will review your inquiry and get back to you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-sm text-primary hover:underline font-bold"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 99999 99999"
                      className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition text-sm"
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
                      placeholder="e.g. rajesh@example.com"
                      className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    What is this regarding?
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-800 bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition text-sm"
                  >
                    <option value="General Inquiry">General Inquiry / Information</option>
                    <option value="Custom Furniture Design">Custom Furniture Manufacturing</option>
                    <option value="Modular Kitchen Consultation">Modular Kitchen Layout Setup</option>
                    <option value="Turnkey Interior Execution">Full House Interior Design</option>
                    <option value="Site Measurement Visit">Schedule Site Measurement Visit</option>
                  </select>
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-6 shadow-md transition disabled:opacity-70 cursor-pointer"
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
        </div>

      </section>

      {/* 3. Embedded Google Maps Section */}
      <section className="max-w-7xl mx-auto px-5 mt-16">
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-stone-100 flex justify-between items-center bg-stone-50">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Visit Our Factory Workshop</h3>
              <p className="text-stone-400 text-xs mt-0.5">Explore materials, laminates, and wood logs in person.</p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary hover:underline"
            >
              Open in Google Maps
            </a>
          </div>

          <div className="h-96 w-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.366710492806!2d72.52989107604581!3d23.083652879129598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e82dc430f8f87%3A0xe54fa2373fb2e389!2sGota%20Bridge!5e0!3m2!1sen!2sin!4v1717876800000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Panchal Interior Factory Location Map"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
