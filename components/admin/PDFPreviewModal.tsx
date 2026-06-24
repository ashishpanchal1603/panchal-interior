"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Printer, Globe, MessageSquare, Sofa } from "lucide-react";
import { Estimate, CompanyDetails } from "@/lib/admin";

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimate: Estimate;
  companyDetails: CompanyDetails;
}

const translations = {
  en: {
    estimate: "ESTIMATE PROPOSAL",
    estimateNumber: "Estimate Number",
    date: "Date",
    customerDetails: "Customer Information",
    customerName: "Customer Name",
    mobileNumber: "Mobile Number",
    siteAddress: "Site Address",
    estimateType: "Estimate Type",
    withMaterial: "With Material",
    labourWork: "Labour Work",
    itemName: "Item Description",
    unit: "Unit",
    quantity: "Qty",
    rate: "Rate",
    amount: "Amount",
    subtotal: "Subtotal",
    discount: "Discount",
    gst: "GST",
    grandTotal: "Grand Total",
    terms: "Terms & Conditions",
    signature: "Authorized Signature",
    footerMsg: "Thank you for choosing Panchal Interior Studio. We design your dreams into reality.",
    notes: "Special Notes / Comments",
    whatsappMsg: "Share via WhatsApp",
    printPDF: "Print / Save PDF"
  },
  gu: {
    estimate: "અંદાજ પત્ર (ESTIMATE)",
    estimateNumber: "અંદાજ નંબર",
    date: "તારીખ",
    customerDetails: "ગ્રાહકની વિગતો",
    customerName: "ગ્રાહકનું નામ",
    mobileNumber: "મોબાઈલ નંબર",
    siteAddress: "સાઈટ સરનામું",
    estimateType: "કામનો પ્રકાર",
    withMaterial: "મટીરીયલ સાથે",
    labourWork: "મજૂરી કામ (લેબર વર્ક)",
    itemName: "વસ્તુ/કામનું નામ",
    unit: "યુનિટ",
    quantity: "નંગ / માપ",
    rate: "ભાવ (દરો)",
    amount: "રકમ",
    subtotal: "પેટા સરવાળો",
    discount: "વળતર (ડિસ્કાઉન્ટ)",
    gst: "જીએસટી (GST)",
    grandTotal: "કુલ રકમ",
    terms: "નિયમો અને શરતો",
    signature: "અધિકૃત સહી",
    footerMsg: "પંચાલ ઈન્ટીરીયર સ્ટુડિયો પસંદ કરવા બદલ આભાર. અમે તમારા સપનાના ઘરને સાકાર કરીએ છીએ.",
    notes: "ખાસ નોંધ / વિગતો",
    whatsappMsg: "વોટ્સએપ શેર",
    printPDF: "પ્રિન્ટ / પીડીએફ ડાઉનલોડ"
  }
};

export default function PDFPreviewModal({ isOpen, onClose, estimate, companyDetails }: PDFPreviewModalProps) {
  const [lang, setLang] = useState<"en" | "gu">("en");
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  if (!isOpen) return null;
  if (!mounted) return null;

  const t = translations[lang];
  const typeLabel = estimate.estimateType === "material" ? t.withMaterial : t.labourWork;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const formattedTotal = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(estimate.grandTotal);

    const shareText = `Dear *${estimate.customerName}*,\n\nGreetings from *Panchal Interior Studio*! \n\nPlease find the Estimate details for your project:\n\n*Estimate No*: ${estimate.estimateNumber}\n*Date*: ${estimate.date}\n*Type*: ${estimate.estimateType === "material" ? "With Material" : "Labour Work"}\n*Grand Total*: ${formattedTotal}\n\nWe look forward to creating something beautiful for your space.\n\nThank you for choosing Panchal Interior Studio.`;

    const encodedText = encodeURIComponent(shareText);
    const cleanPhone = estimate.customerPhone.trim().replace(/\D/g, "");
    
    // Formatting for Indian mobile numbers if length is 10
    const finalPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    window.open(`https://wa.me/${finalPhone}?text=${encodedText}`, "_blank");
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4 print-modal-container">
      {/* 1. Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-stone-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity print:hidden"
      />

      {/* 2. Modal Body */}
      <div className="relative bg-stone-50 dark:bg-stone-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200/80 dark:border-stone-800/80 overflow-hidden flex flex-col z-50 h-[90vh] print:h-auto print:w-full print:border-none print:shadow-none print:bg-white print:rounded-none print:static print:overflow-visible">
        
        {/* Modal Top Actions Toolbar (Hidden on print) */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-stone-200/60 dark:border-stone-800/80 gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm font-bold text-stone-900 dark:text-white">
              Estimate Preview: {estimate.estimateNumber}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Language toggle selector */}
            <button
              onClick={() => setLang(lang === "en" ? "gu" : "en")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-300 hover:border-primary transition cursor-pointer select-none active:scale-[0.98]"
            >
              <Globe className="h-4 w-4 text-primary" />
              <span>{lang === "en" ? "ગુજરાતી (Gujarati)" : "English"}</span>
            </button>

            {/* WhatsApp button */}
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer select-none active:scale-[0.98]"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{t.whatsappMsg}</span>
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition cursor-pointer select-none active:scale-[0.98]"
            >
              <Printer className="h-4 w-4" />
              <span>{t.printPDF}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-xl text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition cursor-pointer ml-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 3. SCROLLABLE ESTIMATE PREVIEW CONTAINER */}
        <div className="flex-grow overflow-y-auto p-6 sm:p-10 bg-white dark:bg-white text-stone-900 print:overflow-visible print:p-0">
          
          {/* Printable Page Structure */}
          <div className="max-w-3xl mx-auto space-y-8 print:w-full print:max-w-none">
            
            {/* Header Block: Logo & Invoice details */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-stone-200/80 pb-6">
              {/* Company Logo/Name info */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shrink-0">
                  <Sofa className="h-6.5 w-6.5" />
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-black uppercase tracking-tight text-stone-900 leading-none">
                    Panchal Interior
                  </h1>
                  <span className="block text-[9px] uppercase tracking-widest text-primary font-bold mt-1">
                    Furniture & Turnkey Solutions
                  </span>
                </div>
              </div>

              {/* Estimate Title & Number metadata */}
              <div className="text-left sm:text-right font-sans">
                <h2 className="font-serif text-xl font-bold tracking-wider text-primary">
                  {t.estimate}
                </h2>
                <div className="mt-1.5 text-xs font-semibold text-stone-500 space-y-0.5">
                  <p><span className="font-bold text-stone-800">{t.estimateNumber}:</span> {estimate.estimateNumber}</p>
                  <p><span className="font-bold text-stone-800">{t.date}:</span> {estimate.date}</p>
                  <p><span className="font-bold text-stone-800">{t.estimateType}:</span> {typeLabel}</p>
                </div>
              </div>
            </div>

            {/* Address Details Area (Grid Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
              {/* Studio Info */}
              <div className="space-y-1">
                <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                  From Studio
                </span>
                <h3 className="font-serif font-extrabold text-stone-900 text-sm">{companyDetails.name}</h3>
                <p className="text-stone-500">{companyDetails.address}</p>
                <p className="text-stone-500">📞 {companyDetails.phone}</p>
                <p className="text-stone-500">✉️ {companyDetails.email}</p>
              </div>

              {/* Client Info */}
              <div className="space-y-1">
                <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                  Prepared For
                </span>
                <h3 className="font-serif font-extrabold text-stone-900 text-sm">{estimate.customerName}</h3>
                <p className="text-stone-500"><span className="font-bold text-stone-800">{t.mobileNumber}:</span> {estimate.customerPhone}</p>
                {estimate.siteAddress && (
                  <p className="text-stone-500">
                    <span className="font-bold text-stone-800">{t.siteAddress}:</span> {estimate.siteAddress}
                  </p>
                )}
              </div>
            </div>

            {/* Items Table details */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-50 text-[10px] font-extrabold uppercase tracking-wider text-stone-600 border-b border-stone-200">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">{t.itemName}</th>
                    <th className="py-2.5 px-3">{t.unit}</th>
                    <th className="py-2.5 px-3 text-right">{t.quantity}</th>
                    <th className="py-2.5 px-3 text-right">{t.rate}</th>
                    <th className="py-2.5 px-3 text-right">{t.amount}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {estimate.items.map((item, index) => (
                    <tr key={index} className="hover:bg-stone-50/30">
                      <td className="py-3 px-3 text-stone-400">{index + 1}</td>
                      <td className="py-3 px-3 font-semibold text-stone-900">{item.itemName}</td>
                      <td className="py-3 px-3 text-stone-500 font-medium">{item.unit}</td>
                      <td className="py-3 px-3 text-right font-medium">{item.quantity}</td>
                      <td className="py-3 px-3 text-right font-medium">₹{item.rate.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-bold text-stone-900">₹{item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations summaries & Notes (Grid layout side-by-side) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-stone-200">
              {/* Notes or message */}
              <div className="md:col-span-7 space-y-2 text-xs">
                {estimate.notes && (
                  <div className="bg-stone-50/60 p-4 rounded-2xl border border-stone-100">
                    <h4 className="font-serif font-bold text-stone-800 mb-1">{t.notes}</h4>
                    <p className="text-stone-500 leading-relaxed italic">{estimate.notes}</p>
                  </div>
                )}
              </div>

              {/* Subtotal block calculation */}
              <div className="md:col-span-5 text-xs font-semibold text-stone-500 space-y-2 border-l border-stone-100 pl-6 md:pl-8">
                <div className="flex justify-between">
                  <span>{t.subtotal}:</span>
                  <span className="font-bold text-stone-900">₹{estimate.subtotal.toLocaleString()}</span>
                </div>
                {estimate.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>{t.discount} ({estimate.discount}%):</span>
                    <span className="font-bold">-₹{((estimate.subtotal * estimate.discount) / 100).toLocaleString()}</span>
                  </div>
                )}
                {estimate.gst > 0 && (
                  <div className="flex justify-between">
                    <span>{t.gst} ({estimate.gst}%):</span>
                    <span className="font-bold text-stone-900">
                      ₹{(((estimate.subtotal * (1 - estimate.discount / 100)) * estimate.gst) / 100).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-stone-900 font-extrabold border-t border-stone-200/80 pt-2 bg-stone-50/40 p-2 rounded-lg">
                  <span className="text-primary">{t.grandTotal}:</span>
                  <span className="text-primary">₹{estimate.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Terms and Conditions and Signature layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-stone-200">
              {/* Terms */}
              <div className="space-y-2 text-[10px] text-stone-400 leading-relaxed">
                <h4 className="font-serif font-bold text-stone-700 text-xs">{t.terms}</h4>
                <ol className="list-decimal pl-4 space-y-1">
                  {estimate.termsAndConditions.map((clause, index) => (
                    <li key={index}>{clause}</li>
                  ))}
                </ol>
              </div>

              {/* Sign Area */}
              <div className="flex flex-col justify-end items-end h-full min-h-[100px] text-right text-[10px] text-stone-400 font-semibold pr-4">
                <div className="border-t border-stone-300 w-44 pt-2 text-center mt-auto">
                  <p className="font-bold text-stone-800 text-xs uppercase tracking-wider">{companyDetails.name}</p>
                  <p className="mt-0.5">{t.signature}</p>
                </div>
              </div>
            </div>

            {/* Invoice footer message */}
            <div className="border-t border-stone-100 pt-6 text-center text-[10px] text-stone-400 select-none">
              <p className="font-semibold italic">{t.footerMsg}</p>
              <p className="mt-1 uppercase tracking-widest text-[8px] text-stone-300">Panchal Interior Business Suite Document</p>
            </div>

          </div>

        </div>

      </div>

      {/* Global CSS Inject to support print layouts (window.print()) natively */}
      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            background: white !important;
          }
          body * {
            visibility: hidden;
          }
          .print\\:hidden {
            display: none !important;
          }
          #print-iframe-loader,
          .fixed:not(.print-modal-container),
          header,
          aside,
          button,
          nav {
            display: none !important;
          }
          .print-modal-container,
          .relative.bg-stone-50 {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            z-index: auto !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
            visibility: visible !important;
          }
          .relative.bg-stone-50 * {
            visibility: visible !important;
          }
          .overflow-y-auto {
            overflow: visible !important;
          }
          /* Ensure headers do not get clipped */
          @page {
            size: A4;
            margin: 1.5cm;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
