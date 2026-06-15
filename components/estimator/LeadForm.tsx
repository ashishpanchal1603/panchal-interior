"use client";

import { motion } from "framer-motion";
import { User, Phone, Mail, MessageSquare, ArrowRight, TrendingUp } from "lucide-react";
import {
  FullHomeState,
  KitchenState,
  WardrobeState,
} from "./types";

interface LeadFormProps {
  calcType: "full" | "kitchen" | "wardrobe";
  fullState: FullHomeState;
  kitchenState: KitchenState;
  wardrobeState: WardrobeState;
  leadName: string;
  leadPhone: string;
  leadEmail: string;
  leadMessage: string;
  isSubmitting: boolean;
  onChangeName: (val: string) => void;
  onChangePhone: (val: string) => void;
  onChangeEmail: (val: string) => void;
  onChangeMessage: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function LeadForm({
  calcType,
  fullState,
  kitchenState,
  wardrobeState,
  leadName,
  leadPhone,
  leadEmail,
  leadMessage,
  isSubmitting,
  onChangeName,
  onChangePhone,
  onChangeEmail,
  onChangeMessage,
  onSubmit,
}: LeadFormProps) {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch w-full"
    >
      {/* Left Column: Cost Display Card */}
      <div className="md:col-span-5 bg-stone-950 text-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-lg border border-stone-850">
        {/* Radial Background Accent */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a17a4c_1px,transparent_1px)] [background-size:12px_12px]" />

        <div className="relative z-10 space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Estimation Status
          </span>

          <div>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Calculation Ready!
            </h4>
            <p className="text-stone-300 text-xs mt-3 leading-relaxed">
              Submit your inquiry to calculate and unlock your custom budget estimate.
            </p>
            <p className="text-[11px] text-stone-500 mt-3 leading-relaxed">
              *Our estimate will include basic carpentry, core BWR material carcasses, hinges, edgeband gluing, and on-site alignment, customized specifically for your selection.
            </p>
          </div>

          {/* Selection Summary */}
          <div className="border-t border-stone-800/80 pt-6 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Configuration Details
            </h5>
            <ul className="text-xs text-stone-300 space-y-2">
              {calcType === "full" && (
                <>
                  <li>🏠 Config: <span className="font-bold text-white capitalize">{fullState.bhk.replace("-", " ")}</span></li>
                  <li>💎 Package: <span className="font-bold text-white capitalize">{fullState.packageTier}</span></li>
                  <li>🛠️ Included: <span className="font-bold text-white">{fullState.scope.length} rooms</span></li>
                </>
              )}
              {calcType === "kitchen" && (
                <>
                  <li>📐 Layout: <span className="font-bold text-white capitalize">{kitchenState.layout.replace("-", " ")}</span></li>
                  <li>📏 Length: <span className="font-bold text-white">{kitchenState.lengthA}ft {kitchenState.layout !== "straight" ? `x ${kitchenState.lengthB}ft` : ""}{kitchenState.layout === "u-shape" && kitchenState.lengthC ? ` x ${kitchenState.lengthC}ft` : ""}</span></li>
                  <li>✨ Shutter Finish: <span className="font-bold text-white capitalize">{kitchenState.finish}</span></li>
                </>
              )}
              {calcType === "wardrobe" && (
                <>
                  <li>🚪 Style: <span className="font-bold text-white capitalize">{wardrobeState.type.replace("-", " ")}</span></li>
                  <li>📏 Size: <span className="font-bold text-white">{wardrobeState.width}W x {wardrobeState.height}H ft</span></li>
                  <li>✨ Shutter Finish: <span className="font-bold text-white capitalize">{wardrobeState.finish}</span></li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-stone-850 flex items-center gap-2 mt-6">
          <TrendingUp className="h-4 w-4 text-primary shrink-0" />
          <span className="text-[10px] text-stone-400">
            Prices match direct-factory rates in Gota workshop, Ahmedabad.
          </span>
        </div>
      </div>

      {/* Right Column: Lead Capture Form */}
      <div className="md:col-span-7 flex flex-col justify-center">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-2">
            <h4 className="text-xl font-bold text-stone-900">Request Detailed Quote</h4>
            <p className="text-xs text-stone-500 mt-1">
              Submit your details to get a free site measurement session and fully customized 3D CAD sketch design.
            </p>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-4 w-4 text-stone-400" />
              <input
                type="text"
                required
                placeholder="e.g. Ashish Panchal"
                value={leadName}
                onChange={(e) => onChangeName(e.target.value)}
                className="w-full rounded-lg border border-stone-200 pl-10 pr-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Field */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-4 w-4 text-stone-400" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 99251 11438"
                  value={leadPhone}
                  onChange={(e) => onChangePhone(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 pl-10 pr-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm transition"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-stone-400" />
                <input
                  type="email"
                  placeholder="e.g. ashish@gmail.com"
                  value={leadEmail}
                  onChange={(e) => onChangeEmail(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 pl-10 pr-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm transition"
                />
              </div>
            </div>
          </div>

          {/* Message/Comments */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
              Project details / notes (Optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
              <textarea
                rows={2}
                placeholder="Add layout specifications, site area, preferred wood type, or timeline details..."
                value={leadMessage}
                onChange={(e) => onChangeMessage(e.target.value)}
                className="w-full rounded-lg border border-stone-200 pl-10 pr-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm resize-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80 font-sans"
          >
            {isSubmitting ? "Generating Plan..." : "Submit Quote Request"}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
