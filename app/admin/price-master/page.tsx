"use client";

import React, { useState, useEffect } from "react";
import { Save, Plus, Trash2, RefreshCw, Undo } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/components/admin/Toast";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { PriceItem } from "@/lib/admin";

export default function PriceMasterPage() {
  const { fetchWithAuth } = useAdminAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [originalPrices, setOriginalPrices] = useState<PriceItem[]>([]);

  // Confirm Modal state
  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "danger" | "warning" | "info";
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "warning",
    onConfirm: () => {},
  });

  const triggerConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    type: "danger" | "warning" | "info" = "warning"
  ) => {
    setConfirmConfig({
      isOpen: true,
      title,
      message,
      type,
      onConfirm,
    });
  };

  const fetchPriceMaster = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth("/api/admin/price-master");
      const data = await res.json();
      setPrices(data);
      setOriginalPrices(JSON.parse(JSON.stringify(data))); // deep copy
    } catch (err) {
      console.error(err);
      showToast("Error loading price catalog.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceMaster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFieldChange = (index: number, field: keyof PriceItem, value: unknown) => {
    setPrices((prev) => {
      const copy = [...prev];
      const updated = { ...copy[index] };
      
      if (field === "name") {
        updated.name = value as string;
      } else if (field === "unit") {
        updated.unit = value as string;
      } else if (field === "materialRate") {
        updated.materialRate = Math.max(0, Number(value));
      } else if (field === "labourRate") {
        updated.labourRate = Math.max(0, Number(value));
      }

      copy[index] = updated;
      return copy;
    });
  };

  const handleAddNewItem = () => {
    const nextId = `p-cust-${Date.now()}`;
    setPrices((prev) => [
      ...prev,
      { id: nextId, name: "", unit: "sq.ft", materialRate: 0, labourRate: 0 }
    ]);
  };

  const handleDeleteItem = (index: number, name: string) => {
    triggerConfirm(
      "Delete Preset",
      `Remove item "${name || "New Row"}" from pricing master? This removes it from autocomplete presets.`,
      () => {
        setPrices((prev) => prev.filter((_, i) => i !== index));
      },
      "danger"
    );
  };

  const handleReset = () => {
    triggerConfirm(
      "Reset Unsaved Changes",
      "Reset pricing values to last saved state? All unsaved modifications will be lost.",
      () => {
        setPrices(JSON.parse(JSON.stringify(originalPrices)));
        showToast("Resetted price grid changes.", "info");
      },
      "warning"
    );
  };

  const handleSaveAll = async () => {
    // Validate
    const invalidItems = prices.some((p) => !p.name.trim());
    if (invalidItems) {
      showToast("All items must have valid descriptions/names.", "error");
      return;
    }

    setSaving(true);
    try {
      const res = await fetchWithAuth("/api/admin/price-master", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prices),
      });

      if (res.ok) {
        showToast("Pricing Master saved and updated centrally!", "success");
        setOriginalPrices(JSON.parse(JSON.stringify(prices))); // sync original state
      } else {
        showToast("Failed to save central pricing catalog.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Connection issue occurred while saving central rates.", "error");
    } finally {
      setSaving(false);
    }
  };

  const hasUnsavedChanges = JSON.stringify(prices) !== JSON.stringify(originalPrices);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-stone-400 gap-3">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="font-semibold text-sm">Accessing central price master data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up font-sans pb-16">
      
      {/* Top Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-cormorant text-3xl font-extrabold text-stone-900 dark:text-white">
            Central Price Master
          </h1>
          <p className="text-stone-500 text-xs mt-0.5">Control pricing presets that auto-fill estimates for With Material or Labour items.</p>
        </div>

        <div className="flex items-center gap-3 shrink-0 select-none">
          {/* Reset Changes button */}
          {hasUnsavedChanges && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 hover:border-red-300 text-stone-600 dark:text-stone-400 font-bold py-2 px-4 shadow-sm transition text-xs cursor-pointer"
            >
              <Undo className="h-3.5 w-3.5" />
              Reset Changes
            </button>
          )}

          {/* Add Preset Item row */}
          <button
            onClick={handleAddNewItem}
            className="flex items-center gap-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 hover:border-primary text-stone-700 dark:text-stone-300 font-bold py-2 px-4 shadow-sm transition text-xs cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Preset Item
          </button>
          
          {/* Save Master button */}
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-2 px-5 shadow-md shadow-primary/10 transition text-xs cursor-pointer disabled:opacity-75 disabled:pointer-events-none active:scale-[0.98]"
          >
            {saving ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            Save Master Rates
          </button>
        </div>
      </div>

      {/* Pricing Data Grid Table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-150/40 dark:border-stone-850 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px] text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50/50 dark:bg-stone-950/20 px-6 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-stone-500 border-b border-stone-100 dark:border-stone-850">
                <th className="py-3.5 px-6 w-12 text-stone-400">#</th>
                <th className="py-3.5 px-6">Item/Work Preset Description</th>
                <th className="py-3.5 px-4 w-32">Default Unit</th>
                <th className="py-3.5 px-4 w-48 text-right">With Material Rate (₹)</th>
                <th className="py-3.5 px-4 w-48 text-right">Labour Work Rate (₹)</th>
                <th className="py-3.5 px-6 w-16 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-850">
              {prices.map((preset, index) => (
                <tr key={preset.id} className="hover:bg-stone-50/20 dark:hover:bg-stone-950/5 align-middle">
                  {/* Index */}
                  <td className="py-3 px-6 text-stone-400 font-semibold">{index + 1}</td>
                  
                  {/* Name field */}
                  <td className="py-3 px-6 pr-4">
                    <input
                      type="text"
                      required
                      value={preset.name}
                      onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                      placeholder="Enter preset item name (e.g. Wardrobe, Modular Kitchen)"
                      className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 font-bold"
                    />
                  </td>

                  {/* Unit field */}
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      required
                      value={preset.unit}
                      onChange={(e) => handleFieldChange(index, "unit", e.target.value)}
                      placeholder="e.g. sq.ft"
                      className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 font-medium"
                    />
                  </td>

                  {/* Material Rate field */}
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      required
                      min="0"
                      value={preset.materialRate}
                      onChange={(e) => handleFieldChange(index, "materialRate", e.target.value)}
                      className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2 text-right bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 font-bold"
                    />
                  </td>

                  {/* Labour Rate field */}
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      required
                      min="0"
                      value={preset.labourRate}
                      onChange={(e) => handleFieldChange(index, "labourRate", e.target.value)}
                      className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2 text-right bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-stone-800 dark:text-stone-100 font-bold"
                    />
                  </td>

                  {/* Action delete preset */}
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => handleDeleteItem(index, preset.name)}
                      className="p-2 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-850 cursor-pointer transition"
                      title="Delete Preset"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info bar */}
        {!loading && prices.length > 0 && (
          <div className="bg-stone-50 dark:bg-stone-950/20 border-t border-stone-100 dark:border-stone-850 px-6 py-3.5 text-xs text-stone-500 font-semibold flex justify-between items-center select-none">
            <span>Registered Presets: {prices.length} items</span>
            {hasUnsavedChanges && (
              <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider animate-pulse">
                ⚠️ You have unsaved changes in pricing master!
              </span>
            )}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        message={confirmConfig.message}
        type={confirmConfig.type}
      />
    </div>
  );
}
