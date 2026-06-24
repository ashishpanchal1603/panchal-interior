"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Plus,
  RefreshCw,
  Eye,
  Trash2,
  Copy,
  FolderOpen,
  Calendar,
  Share2,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/components/admin/Toast";
import PDFPreviewModal from "@/components/admin/PDFPreviewModal";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { Estimate, CompanyDetails } from "@/lib/admin";

function EstimatesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchWithAuth } = useAdminAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    name: "Panchal Interior",
    phone: "+91 96649 56491",
    email: "info@panchalinterior.com",
    address: "Panchal Complex, Gota, Ahmedabad"
  });

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal State
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
    onConfirm: () => { },
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

  const fetchEstimatesData = async () => {
    try {
      setLoading(true);

      // Load estimates
      const res = await fetchWithAuth("/api/admin/estimates");
      const data = await res.json();
      setEstimates(data);

      // Load company details from settings
      const settingsRes = await fetchWithAuth("/api/admin/settings");
      const settingsData = await settingsRes.json();
      if (settingsData.companyDetails) {
        setCompanyDetails(settingsData.companyDetails);
      }
    } catch (err) {
      console.error(err);
      showToast("Error loading estimates.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstimatesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Deep-linking preview modal handler
  useEffect(() => {
    const id = searchParams.get("id");
    if (id && estimates.length > 0) {
      const match = estimates.find((e) => e.id === id);
      if (match) {
        setSelectedEstimate(match);
        setIsPreviewOpen(true);
      }
    }
  }, [searchParams, estimates]);

  // Delete estimate
  const handleDelete = (e: React.MouseEvent, id: string, estNum: string) => {
    e.stopPropagation(); // Avoid triggering row click
    triggerConfirm(
      "Delete Estimate",
      `Are you sure you want to delete estimate ${estNum}? This cannot be undone.`,
      async () => {
        try {
          const res = await fetchWithAuth(`/api/admin/estimates?id=${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            showToast(`Estimate ${estNum} deleted.`, "success");
            setEstimates((prev) => prev.filter((est) => est.id !== id));
            if (selectedEstimate?.id === id) {
              setIsPreviewOpen(false);
            }
          } else {
            showToast("Failed to delete estimate.", "error");
          }
        } catch (err) {
          console.error(err);
          showToast("Error executing delete command.", "error");
        }
      },
      "danger"
    );
  };

  // Duplicate estimate (creates a new draft copied from old one)
  const handleDuplicate = (e: React.MouseEvent, original: Estimate) => {
    e.stopPropagation();
    triggerConfirm(
      "Duplicate Estimate",
      `Duplicate estimate ${original.estimateNumber}?`,
      async () => {
        try {
          showToast("Duplicating estimate details...", "info");

          const duplicatePayload = {
            customerId: original.customerId,
            customerName: original.customerName,
            customerPhone: original.customerPhone,
            siteAddress: original.siteAddress,
            date: new Date().toISOString().split("T")[0], // Reset to today
            estimateType: original.estimateType,
            status: "draft", // Forces draft on duplicate
            items: original.items,
            subtotal: original.subtotal,
            discount: original.discount,
            gst: original.gst,
            grandTotal: original.grandTotal,
            language: original.language,
            termsAndConditions: original.termsAndConditions,
            notes: original.notes ? `${original.notes} (Duplicated)` : "Duplicated proposal",
          };

          const res = await fetchWithAuth("/api/admin/estimates", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(duplicatePayload),
          });

          if (res.ok) {
            const data = await res.json();
            showToast(`Created draft duplicate: ${data.estimate.estimateNumber}`, "success");
            fetchEstimatesData(); // Reload list
          } else {
            showToast("Failed to duplicate estimate.", "error");
          }
        } catch (err) {
          console.error(err);
          showToast("Error duplicating estimate details.", "error");
        }
      },
      "info"
    );
  };

  const openPreview = (e: React.MouseEvent, estimate: Estimate) => {
    e.stopPropagation();
    setSelectedEstimate(estimate);
    setIsPreviewOpen(true);
    // Add query parameter without reload for link preservation
    router.replace(`/admin/estimates?id=${estimate.id}`);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setSelectedEstimate(null);
    router.replace("/admin/estimates"); // clear URL param
  };

  // Filters logic
  const filteredEstimates = estimates.filter((est) => {
    const matchesSearch =
      est.estimateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      est.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      est.customerPhone.includes(searchTerm);

    const matchesType = typeFilter === "all" || est.estimateType === typeFilter;
    const matchesStatus = statusFilter === "all" || est.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in-up font-sans">

      {/* Action Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-cormorant text-3xl font-extrabold text-stone-900 dark:text-white">
            Estimates Registry
          </h1>
          <p className="text-stone-500 text-xs mt-0.5">Manage, print, and duplicate cost estimates for clients.</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={fetchEstimatesData}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 hover:border-primary text-stone-700 dark:text-stone-300 font-bold py-2 px-4 shadow-sm transition text-xs cursor-pointer select-none disabled:opacity-70"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh List
          </button>

          <Link
            href="/admin/estimates/new"
            className="flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 shadow-md shadow-primary/10 transition text-xs select-none"
          >
            <Plus className="h-4 w-4" />
            New Estimate
          </Link>
        </div>
      </div>

      {/* Filter Toolbar controls */}
      <div className="bg-white dark:bg-stone-900 border border-stone-150/40 dark:border-stone-850 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center select-none">

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by client or estimate number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:border-primary text-xs bg-stone-50/50 dark:bg-stone-950 text-stone-800 dark:text-stone-100"
          />
        </div>

        {/* Dropdowns filters */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto justify-end">
          <div>
            <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Estimate Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-stone-200 dark:border-stone-850 rounded-xl px-3 py-1.5 text-xs text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 focus:outline-none focus:border-primary"
            >
              <option value="all">All Types</option>
              <option value="material">With Material</option>
              <option value="labour">Labour Work</option>
            </select>
          </div>

          <div>
            <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-stone-200 dark:border-stone-850 rounded-xl px-3 py-1.5 text-xs text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 focus:outline-none focus:border-primary"
            >
              <option value="all">All Statuses</option>
              <option value="saved">Saved Proposals</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main List Workspace */}
      <div className="bg-white dark:bg-stone-900 border border-stone-150/40 dark:border-stone-850 rounded-2xl shadow-sm overflow-hidden min-h-[350px] flex flex-col justify-between">
        {loading ? (
          <div className="flex-grow flex flex-col items-center justify-center py-24 text-stone-400 gap-3">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            <span className="font-semibold text-sm">Accessing estimates registry...</span>
          </div>
        ) : filteredEstimates.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center py-24 text-stone-400 text-center px-4 select-none">
            <FolderOpen className="h-12 w-12 text-stone-300 mb-3" />
            <h4 className="font-cormorant text-lg font-bold text-stone-800 dark:text-stone-200">No Estimates Found</h4>
            <p className="text-xs text-stone-500 max-w-xs mt-1">
              {searchTerm || typeFilter !== "all" || statusFilter !== "all"
                ? "No records matched your search query filters."
                : "Create your first estimate by clicking the New Estimate button."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-850 overflow-x-auto">

            {/* Desktop Table Headers */}
            <div className="hidden md:grid grid-cols-12 gap-4 bg-stone-50/50 dark:bg-stone-950/20 px-6 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-wider text-stone-500 border-b border-stone-100 dark:border-stone-850">
              <div className="col-span-2">Est Number</div>
              <div className="col-span-3">Customer Contact Info</div>
              <div className="col-span-2">Estimate Type</div>
              <div className="col-span-2 text-right">Grand Total</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* List Row Items */}
            {filteredEstimates.map((est) => (
              <div
                key={est.id}
                onClick={(e) => openPreview(e, est)}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-stone-50/30 dark:hover:bg-stone-950/10 transition items-center cursor-pointer"
              >
                {/* Est Number */}
                <div className="col-span-1 md:col-span-2 font-cormorant font-black text-stone-900 dark:text-white text-sm sm:text-base">
                  {est.estimateNumber}
                </div>

                {/* Customer Details */}
                <div className="col-span-1 md:col-span-3 space-y-1">
                  <span className="block font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {est.customerName}
                  </span>
                  <div className="text-[11px] text-stone-400 dark:text-stone-500 flex flex-col sm:flex-row gap-1 sm:gap-3">
                    <span>📞 {est.customerPhone}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {est.date}
                    </span>
                  </div>
                </div>

                {/* Type Badge */}
                <div className="col-span-1 md:col-span-2">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${est.estimateType === "material"
                      ? "bg-blue-50 text-blue-700 border-blue-150/40 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/30"
                      : "bg-orange-50 text-orange-700 border-orange-150/40 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-900/30"
                    }`}>
                    {est.estimateType === "material" ? "🏠 With Material" : "🛠️ Labour Work"}
                  </span>
                </div>

                {/* Amount */}
                <div className="col-span-1 md:col-span-2 text-left md:text-right font-black text-stone-900 dark:text-white text-base">
                  ₹{est.grandTotal.toLocaleString("en-IN")}
                </div>

                {/* Status */}
                <div className="col-span-1 md:col-span-1 text-left md:text-center">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest border ${est.status === "saved"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/30"
                      : "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/30"
                    }`}>
                    {est.status === "saved" ? "Saved" : "Draft"}
                  </span>
                </div>

                {/* Row actions */}
                <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end gap-2.5 items-center">
                  {/* Action duplicate */}
                  <button
                    onClick={(e) => handleDuplicate(e, est)}
                    className="rounded-lg p-2 text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-850 hover:text-stone-700 dark:hover:text-stone-200 border border-transparent transition cursor-pointer"
                    title="Duplicate Estimate"
                  >
                    <Copy className="h-4 w-4" />
                  </button>

                  {/* Action edit draft */}
                  {est.status === "draft" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/admin/estimates/edit/${est.id}`);
                      }}
                      className="rounded-lg py-1 px-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-[10px] font-bold text-stone-700 dark:text-stone-300 transition cursor-pointer border border-transparent"
                      title="Edit Draft"
                    >
                      Resume
                    </button>
                  )}

                  {/* Action view */}
                  <button
                    onClick={(e) => openPreview(e, est)}
                    className="rounded-lg p-2 text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-850 hover:text-primary border border-transparent transition cursor-pointer"
                    title="Print / View Invoice"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  {/* Action delete */}
                  <button
                    onClick={(e) => handleDelete(e, est.id, est.estimateNumber)}
                    className="rounded-lg p-2 text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 border border-transparent hover:border-red-200/20 transition cursor-pointer"
                    title="Delete Record"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}

        {/* Footer info stats bar */}
        {!loading && filteredEstimates.length > 0 && (
          <div className="bg-stone-50 dark:bg-stone-950/20 border-t border-stone-100 dark:border-stone-850 px-6 py-3.5 text-xs text-stone-500 font-semibold flex items-center justify-between">
            <span>Showing {filteredEstimates.length} of {estimates.length} proposals.</span>
            <span className="text-[10px] text-stone-400 flex items-center gap-1 uppercase tracking-wider">
              Panchal Interior suite
            </span>
          </div>
        )}
      </div>

      {/* 4. RENDER PDF PREVIEW MODAL */}
      {selectedEstimate && (
        <PDFPreviewModal
          isOpen={isPreviewOpen}
          onClose={closePreview}
          estimate={selectedEstimate}
          companyDetails={companyDetails}
        />
      )}

      {/* 5. CONFIRMATION DIALOG */}
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

export default function EstimatesPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20 text-stone-400 gap-3">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="font-semibold text-sm">Loading estimates suite...</span>
      </div>
    }>
      <EstimatesContent />
    </Suspense>
  );
}
