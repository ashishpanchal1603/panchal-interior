"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/admin/Toast";
import ConfirmModal from "@/components/admin/ConfirmModal";
import {
  Users,
  Search,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Trash2,
  CheckCircle,
  Clock,
  Briefcase,
  TrendingUp,
  LogOut,
} from "lucide-react";

interface Lead {
  id: string;
  leadName: string;
  leadPhone: string;
  leadEmail: string;
  leadMessage: string;
  calcType: string;
  details: unknown;
  createdAt: string;
  status: string;
}

export default function AdminLeadsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);

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
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchLeads = async (u?: string, p?: string) => {
    setLoading(true);
    setError("");
    const username = u || sessionStorage.getItem("admin_username") || "";
    const password = p || sessionStorage.getItem("admin_password") || "";
    try {
      const response = await fetch("/api/admin/leads", {
        headers: {
          "x-admin-username": username,
          "x-admin-password": password,
        },
      });
      if (response.status === 401) {
        sessionStorage.removeItem("admin_username");
        sessionStorage.removeItem("admin_password");
        router.replace("/admin/login");
        throw new Error("Session expired or invalid credentials.");
      }
      if (!response.ok) {
        throw new Error("Failed to fetch leads from API.");
      }
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      const errorObject = err as Error;
      console.error(errorObject);
      setError(errorObject.message || "Failed to load leads database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const username = sessionStorage.getItem("admin_username");
    const password = sessionStorage.getItem("admin_password");
    if (!username || !password) {
      router.replace("/admin/login");
    } else {
      const timer = setTimeout(() => {
        setIsVerifying(false);
        fetchLeads(username, password);
      }, 0);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_username");
    sessionStorage.removeItem("admin_password");
    router.replace("/admin/login");
  };

  // Toggle Lead Status (Pending <-> Contacted)
  const toggleStatus = async (leadId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Pending" ? "Contacted" : "Pending";
    const username = sessionStorage.getItem("admin_username") || "";
    const password = sessionStorage.getItem("admin_password") || "";
    try {
      const response = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-username": username,
          "x-admin-password": password,
        },
        body: JSON.stringify({ id: leadId, status: nextStatus }),
      });

      if (response.status === 401) {
        showToast("Session expired or unauthorized. Please re-authenticate.", "error");
        sessionStorage.removeItem("admin_username");
        sessionStorage.removeItem("admin_password");
        router.replace("/admin/login");
        return;
      }

      if (response.ok) {
        setLeads((prevLeads) =>
          prevLeads.map((l) => (l.id === leadId ? { ...l, status: nextStatus } : l))
        );
        showToast("Updated lead status successfully.", "success");
      } else {
        showToast("Failed to update status on server.", "error");
      }
    } catch (err) {
      console.error("Status update error:", err);
      showToast("Network error updating status.", "error");
    }
  };

  // Delete Lead
  const deleteLead = (leadId: string) => {
    triggerConfirm(
      "Delete Lead Request",
      "Are you sure you want to delete this lead? This action cannot be undone.",
      async () => {
        const username = sessionStorage.getItem("admin_username") || "";
        const password = sessionStorage.getItem("admin_password") || "";
        try {
          const response = await fetch(`/api/admin/leads?id=${leadId}`, {
            method: "DELETE",
            headers: {
              "x-admin-username": username,
              "x-admin-password": password,
            },
          });

          if (response.status === 401) {
            showToast("Session expired or unauthorized. Please re-authenticate.", "error");
            sessionStorage.removeItem("admin_username");
            sessionStorage.removeItem("admin_password");
            router.replace("/admin/login");
            return;
          }

          if (response.ok) {
            setLeads((prevLeads) => prevLeads.filter((l) => l.id !== leadId));
            showToast("Inquiry lead record deleted successfully.", "success");
          } else {
            showToast("Failed to delete lead from server.", "error");
          }
        } catch (err) {
          console.error("Delete lead error:", err);
          showToast("Network error deleting lead.", "error");
        }
      },
      "danger"
    );
  };

  // Calculations for stats
  const totalLeads = leads.length;
  const pendingLeads = leads.filter((l) => l.status === "Pending").length;
  const contactedLeads = leads.filter((l) => l.status === "Contacted").length;
  
  const fullHomeCount = leads.filter((l) => l.calcType === "full").length;
  const kitchenCount = leads.filter((l) => l.calcType === "kitchen").length;
  const wardrobeCount = leads.filter((l) => l.calcType === "wardrobe").length;

  // Filtered leads list
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.leadPhone.includes(searchTerm) ||
      (lead.leadEmail && lead.leadEmail.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "general" && (!lead.calcType || lead.calcType === "general")) ||
      lead.calcType === typeFilter;

    const matchesStatus =
      statusFilter === "all" ||
      lead.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Renders specific design choices inline
  const renderSpecs = (lead: Lead) => {
    if (!lead.calcType || lead.calcType === "general") {
      return <span className="text-stone-400 italic">General Info Request</span>;
    }

    const details = lead.details as {
      bhk?: string;
      packageTier?: string;
      scope?: string[];
      layout?: string;
      lengthA?: number;
      lengthB?: number;
      lengthC?: number;
      finish?: string;
      type?: string;
      width?: number;
      height?: number;
    };
    if (!details) return null;

    if (lead.calcType === "full") {
      return (
        <div className="space-y-1 font-sans text-xs">
          <p>🏠 <span className="font-bold text-stone-900">BHK:</span> {(details.bhk || "").toUpperCase()}</p>
          <p>💎 <span className="font-bold text-stone-900">Tier:</span> {(details.packageTier || "").toUpperCase()}</p>
          <p className="flex flex-wrap gap-1 mt-1">
            {details.scope?.map((s: string) => (
              <span key={s} className="px-1.5 py-0.5 rounded bg-primary-light text-primary border border-primary/20 text-[9px] font-bold uppercase">
                {s}
              </span>
            ))}
          </p>
        </div>
      );
    }

    if (lead.calcType === "kitchen") {
      const lengthA = details.lengthA || 0;
      const lengthB = details.lengthB || 0;
      const lengthC = details.lengthC || 0;
      const layout = details.layout || "";
      const runningFeet = layout === "straight" 
        ? lengthA 
        : layout === "u-shape" 
        ? (lengthA + lengthB + (lengthC || 8)) 
        : (lengthA + lengthB);
      return (
        <div className="space-y-1 font-sans text-xs">
          <p>📐 <span className="font-bold text-stone-900">Layout:</span> {layout.replace("-", " ").toUpperCase()}</p>
          <p>📏 <span className="font-bold text-stone-900">Size:</span> {lengthA}ft {lengthB ? `x ${lengthB}ft` : ""}{layout === "u-shape" && lengthC ? ` x ${lengthC}ft` : ""}</p>
          <p>✨ <span className="font-bold text-stone-900">Total Length:</span> {runningFeet} running ft</p>
          <p>🎨 <span className="font-bold text-stone-900">Finish:</span> {(details.finish || "").toUpperCase()}</p>
        </div>
      );
    }

    if (lead.calcType === "wardrobe") {
      const width = details.width || 0;
      const height = details.height || 0;
      const area = width * height;
      return (
        <div className="space-y-1 font-sans text-xs">
          <p>🚪 <span className="font-bold text-stone-900">Style:</span> {(details.type || "").toUpperCase()}</p>
          <p>📏 <span className="font-bold text-stone-900">Size:</span> {width}W x {height}H ft</p>
          <p>📐 <span className="font-bold text-stone-900">Area:</span> {area} sq.ft</p>
          <p>🎨 <span className="font-bold text-stone-900">Finish:</span> {(details.finish || "").toUpperCase()}</p>
        </div>
      );
    }

    return null;
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="mt-3 text-sm font-semibold text-stone-500">Checking credentials...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200/60 pb-6">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light px-3 py-1 rounded-full border border-primary/20">
              Admin Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
              Leads & Inquiries Dashboard
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Manage estimator submissions and customer consultations.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => fetchLeads()}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-white border border-stone-200 hover:border-primary hover:text-primary text-stone-700 font-bold py-2.5 px-4 shadow-sm transition text-sm cursor-pointer disabled:opacity-70"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh Leads
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold py-2.5 px-4 shadow-sm transition text-sm cursor-pointer border border-transparent"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Total inquiries */}
          <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary-light text-primary flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-stone-400 uppercase tracking-wider">Total Queries</span>
              <span className="block text-2xl font-extrabold text-stone-900 mt-0.5">{totalLeads}</span>
            </div>
          </div>

          {/* Card 2: Pending Alerts */}
          <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-stone-400 uppercase tracking-wider">Pending Alert</span>
              <span className="block text-2xl font-extrabold text-amber-600 mt-0.5">{pendingLeads}</span>
            </div>
          </div>

          {/* Card 3: Contacted Leads */}
          <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-stone-400 uppercase tracking-wider">Contacted</span>
              <span className="block text-2xl font-extrabold text-emerald-600 mt-0.5">{contactedLeads}</span>
            </div>
          </div>

          {/* Card 4: Category distribution */}
          <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="text-xs text-stone-600 font-medium space-y-0.5 w-full">
              <div className="flex justify-between">
                <span>🏠 Full Home:</span>
                <span className="font-bold text-stone-900">{fullHomeCount}</span>
              </div>
              <div className="flex justify-between">
                <span>🍳 Kitchens:</span>
                <span className="font-bold text-stone-900">{kitchenCount}</span>
              </div>
              <div className="flex justify-between">
                <span>🚪 Wardrobes:</span>
                <span className="font-bold text-stone-900">{wardrobeCount}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Filter Controls Panel */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by name, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-primary text-sm bg-stone-50/50"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap gap-4 w-full md:w-auto justify-end">
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Inquiry Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-700 bg-white focus:outline-none focus:border-primary"
              >
                <option value="all">All Types</option>
                <option value="full">🏠 Full Home</option>
                <option value="kitchen">🍳 Kitchen</option>
                <option value="wardrobe">🚪 Wardrobe</option>
                <option value="general">💬 General Consultation</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-700 bg-white focus:outline-none focus:border-primary"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">🕒 Pending</option>
                <option value="Contacted">✅ Contacted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-sm text-red-600">
            ⚠️ <strong>Error:</strong> {error}
          </div>
        )}

        {/* Leads List / Table */}
        <div className="bg-white border border-stone-100 rounded-2xl shadow-sm overflow-hidden min-h-[300px] flex flex-col justify-between">
          {loading ? (
            <div className="flex-grow flex flex-col items-center justify-center py-20 text-stone-400 gap-3 select-none">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              <span className="font-semibold text-sm">Loading database entries...</span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center py-20 text-stone-400 text-center px-4 select-none">
              <Users className="h-12 w-12 text-stone-300 mb-3" />
              <h4 className="font-serif text-lg font-bold text-stone-800">No Inquiries Found</h4>
              <p className="text-xs text-stone-500 max-w-xs mt-1">
                {searchTerm || typeFilter !== "all" || statusFilter !== "all"
                  ? "Try adjusting your search criteria or type filters."
                  : "New inquiries will appear here automatically once submitted."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 overflow-x-auto">
              
              {/* Header labels */}
              <div className="hidden md:grid grid-cols-12 gap-4 bg-stone-50/50 px-6 py-3 text-left text-[10px] font-extrabold uppercase tracking-wider text-stone-500 border-b border-stone-100">
                <div className="col-span-3">Customer Contact Info</div>
                <div className="col-span-2">Inquiry Type</div>
                <div className="col-span-3">Specifications</div>
                <div className="col-span-2">Notes / Messages</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Lead rows */}
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-stone-50/40 transition items-center"
                >
                  {/* Col 1: Customer Contact info */}
                  <div className="col-span-1 md:col-span-3 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-stone-900 text-sm sm:text-base leading-tight">
                        {lead.leadName}
                      </span>
                      <span
                        onClick={() => toggleStatus(lead.id, lead.status)}
                        className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border cursor-pointer select-none transition ${
                          lead.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200/50 hover:bg-amber-100"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200/50 hover:bg-emerald-100"
                        }`}
                      >
                        {lead.status === "Pending" ? "🕒 Pending" : "✅ Contacted"}
                      </span>
                    </div>

                    <div className="text-xs text-stone-600 space-y-0.5">
                      <p className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-stone-400" />
                        <a href={`tel:${lead.leadPhone}`} className="hover:text-primary hover:underline font-semibold">
                          {lead.leadPhone}
                        </a>
                      </p>
                      {lead.leadEmail && (
                        <p className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-stone-400" />
                          <a href={`mailto:${lead.leadEmail}`} className="hover:text-primary hover:underline text-[11px] truncate block max-w-[180px]">
                            {lead.leadEmail}
                          </a>
                        </p>
                      )}
                      <p className="flex items-center gap-1.5 text-[10px] text-stone-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(lead.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Col 2: Inquiry Type Badge */}
                  <div className="col-span-1 md:col-span-2">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                      lead.calcType === "full"
                        ? "bg-blue-50 text-blue-700 border-blue-100"
                        : lead.calcType === "kitchen"
                        ? "bg-orange-50 text-orange-700 border-orange-100"
                        : lead.calcType === "wardrobe"
                        ? "bg-purple-50 text-purple-700 border-purple-100"
                        : "bg-stone-50 text-stone-700 border-stone-200"
                    }`}>
                      {lead.calcType === "full" && "🏠 Full Home"}
                      {lead.calcType === "kitchen" && "🍳 Kitchen"}
                      {lead.calcType === "wardrobe" && "🚪 Wardrobe"}
                      {(!lead.calcType || lead.calcType === "general") && "💬 General Inquiry"}
                    </span>
                  </div>

                  {/* Col 3: Specifications specs */}
                  <div className="col-span-1 md:col-span-3 bg-stone-50/50 border border-stone-100 rounded-xl p-3">
                    {renderSpecs(lead)}
                  </div>

                  {/* Col 4: Messages */}
                  <div className="col-span-1 md:col-span-2">
                    {lead.leadMessage ? (
                      <div className="flex gap-1.5 items-start text-xs text-stone-500 leading-relaxed bg-stone-50/20 rounded p-2">
                        <MessageSquare className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
                        <p className="line-clamp-3 hover:line-clamp-none transition-all duration-300 cursor-pointer">
                          {lead.leadMessage}
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-stone-300 italic">No message notes</span>
                    )}
                  </div>

                  {/* Col 5: Actions */}
                  <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end gap-3 items-center">
                    <button
                      onClick={() => toggleStatus(lead.id, lead.status)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-lg border transition cursor-pointer select-none ${
                        lead.status === "Pending"
                          ? "bg-white border-stone-200 hover:border-emerald-600 hover:text-emerald-600 text-stone-600"
                          : "bg-stone-100 border-transparent hover:bg-stone-200 text-stone-600"
                      }`}
                    >
                      {lead.status === "Pending" ? "Mark Contacted" : "Mark Pending"}
                    </button>
                    
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="rounded-lg p-2 text-stone-400 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 transition cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              ))}

            </div>
          )}
          
          {/* Footer stats bar */}
          {!loading && filteredLeads.length > 0 && (
            <div className="bg-stone-50 border-t border-stone-100 px-6 py-3.5 text-xs text-stone-500 font-semibold flex items-center justify-between select-none">
              <span>Showing {filteredLeads.length} of {totalLeads} total inquires.</span>
              <span className="text-[10px] text-stone-400 flex items-center gap-1 uppercase tracking-wider">
                <TrendingUp className="h-3.5 w-3.5 text-primary" /> Ahmedabad Direct Factory Leads database.
              </span>
            </div>
          )}
        </div>

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
