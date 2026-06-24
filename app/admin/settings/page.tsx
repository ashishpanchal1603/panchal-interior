"use client";

import React, { useState, useEffect } from "react";
import { Save, Plus, Trash2, RefreshCw, FileText, Settings, Key, Building2 } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/components/admin/Toast";
import { AdminSettings } from "@/lib/admin";

export default function SettingsPage() {
  const { fetchWithAuth } = useAdminAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [gstRate, setGstRate] = useState(18);
  const [defaultDiscount, setDefaultDiscount] = useState(0);
  const [estimatePrefix, setEstimatePrefix] = useState("");
  const [nextEstimateNumber, setNextEstimateNumber] = useState(1);

  // Terms and conditions clauses
  const [terms, setTerms] = useState<string[]>([]);
  const [newTermClause, setNewTermClause] = useState("");

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth("/api/admin/settings");
      const data: AdminSettings = await res.json();

      setName(data.companyDetails.name);
      setPhone(data.companyDetails.phone);
      setEmail(data.companyDetails.email);
      setAddress(data.companyDetails.address);

      setGstRate(data.gstRate);
      setDefaultDiscount(data.defaultDiscount || 0);
      setEstimatePrefix(data.estimatePrefix);
      setNextEstimateNumber(data.nextEstimateNumber);
      setTerms(data.defaultTerms || []);
    } catch (err) {
      console.error(err);
      showToast("Error retrieving settings configuration.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTerm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTermClause.trim()) return;
    setTerms((prev) => [...prev, newTermClause.trim()]);
    setNewTermClause("");
    showToast("Added clause to draft terms list.", "info");
  };

  const handleRemoveTerm = (index: number) => {
    setTerms((prev) => prev.filter((_, i) => i !== index));
    showToast("Removed clause from draft terms list.", "info");
  };

  const handleSaveSettings = async () => {
    if (!name || !phone || !email || !address) {
      showToast("Please complete all fields in Studio Information.", "error");
      return;
    }

    setSaving(true);
    try {
      const payload: AdminSettings = {
        companyDetails: { name, phone, email, address },
        gstRate,
        defaultDiscount,
        estimatePrefix,
        nextEstimateNumber,
        defaultTerms: terms,
      };

      const res = await fetchWithAuth("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast("Configurations saved successfully!", "success");
      } else {
        showToast("Failed to save settings.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Connection error occurred while saving.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-stone-400 gap-3">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="font-semibold text-sm">Accessing suite configurations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up font-sans pb-16">
      
      {/* Top Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200/60 dark:border-stone-800/40 pb-6 select-none">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-stone-900 dark:text-white">
            Suite Configurations
          </h1>
          <p className="text-stone-500 text-xs mt-0.5">Manage default tax values, estimate tracking prefixes, and boilerplate terms.</p>
        </div>

        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 shadow-md shadow-primary/10 transition text-xs cursor-pointer disabled:opacity-75 disabled:pointer-events-none active:scale-[0.98] shrink-0"
        >
          {saving ? (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: Company Profile */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-150/40 dark:border-stone-850 shadow-sm space-y-5">
            <h3 className="font-serif font-extrabold text-stone-900 dark:text-white text-sm border-b border-stone-100 dark:border-stone-800 pb-3 flex items-center gap-2">
              <Building2 className="h-4.5 w-4.5 text-primary" />
              Studio Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Studio Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 font-semibold text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Contact Phone
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 text-xs font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Studio Office Address
                </label>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Terms and conditions boilerplate list */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-150/40 dark:border-stone-850 shadow-sm space-y-5">
            <h3 className="font-serif font-extrabold text-stone-900 dark:text-white text-sm border-b border-stone-100 dark:border-stone-800 pb-3 flex items-center gap-2">
              <FileText className="h-4.5 w-4.5 text-primary" />
              Standard Terms & Conditions Presets
            </h3>

            <div className="space-y-4 text-xs select-none">
              {/* Add form */}
              <form onSubmit={handleAddTerm} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter a new term clause (e.g. 50% advance to start project)..."
                  value={newTermClause}
                  onChange={(e) => setNewTermClause(e.target.value)}
                  className="block flex-grow border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 text-xs"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white px-4 py-2 rounded-xl font-bold transition cursor-pointer shrink-0 select-none"
                >
                  <Plus className="h-4 w-4" />
                  Add Clause
                </button>
              </form>

              {/* List */}
              <div className="divide-y divide-stone-100 dark:divide-stone-850 border border-stone-100 dark:border-stone-800 rounded-2xl bg-stone-50/20 max-h-72 overflow-y-auto pr-1">
                {terms.length === 0 ? (
                  <p className="p-4 text-stone-400 italic text-center">No boilerplate terms defined.</p>
                ) : (
                  terms.map((clause, index) => (
                    <div key={index} className="flex justify-between items-start gap-4 p-3 hover:bg-stone-50/50 dark:hover:bg-stone-950/25">
                      <div className="flex gap-2">
                        <span className="font-bold text-stone-400 shrink-0">{index + 1}.</span>
                        <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-xs">{clause}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveTerm(index)}
                        className="p-1 hover:bg-red-50 text-stone-400 hover:text-red-600 rounded-lg transition shrink-0 cursor-pointer"
                        title="Remove clause"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Billing defaults config */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Default values card */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-150/40 dark:border-stone-850 shadow-sm space-y-5">
            <h3 className="font-serif font-extrabold text-stone-900 dark:text-white text-sm border-b border-stone-100 dark:border-stone-800 pb-3 flex items-center gap-2">
              <Settings className="h-4.5 w-4.5 text-primary" />
              Tax & Estimate Defaults
            </h3>

            <div className="space-y-4 text-xs font-semibold text-stone-500">
              {/* GST rate */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Default GST Percentage (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 text-xs font-bold"
                />
              </div>

              {/* Discount Percentage */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Default Discount Percentage (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={defaultDiscount}
                  onChange={(e) => setDefaultDiscount(Number(e.target.value))}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* Autonumber counter tracking card */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-150/40 dark:border-stone-850 shadow-sm space-y-5">
            <h3 className="font-serif font-extrabold text-stone-900 dark:text-white text-sm border-b border-stone-100 dark:border-stone-800 pb-3 flex items-center gap-2">
              <Key className="h-4.5 w-4.5 text-primary" />
              Invoice Tracking Counters
            </h3>

            <div className="space-y-4 text-xs font-semibold text-stone-500">
              {/* Prefix */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Estimate Prefix Code
                </label>
                <input
                  type="text"
                  value={estimatePrefix}
                  onChange={(e) => setEstimatePrefix(e.target.value)}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 text-xs font-bold"
                />
              </div>

              {/* Next Sequence number */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Next Sequence Number
                </label>
                <input
                  type="number"
                  min="1"
                  value={nextEstimateNumber}
                  onChange={(e) => setNextEstimateNumber(Number(e.target.value))}
                  className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 text-xs font-bold"
                />
              </div>

              <div className="bg-stone-50 dark:bg-stone-950/20 p-3.5 border border-stone-100 dark:border-stone-850 rounded-xl leading-relaxed text-[10px] text-stone-400 select-none">
                <span>The next estimate generated will receive the number:</span>
                <span className="block text-stone-800 dark:text-stone-300 font-bold mt-1 text-xs uppercase tracking-widest">
                  {estimatePrefix}{String(nextEstimateNumber).padStart(3, "0")}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
