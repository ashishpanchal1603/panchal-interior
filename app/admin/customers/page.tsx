"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Plus,
  RefreshCw,
  Edit2,
  Trash2,
  X,
  History,
  FileText,
  User,
  CheckCircle,
  Clock,
  Briefcase,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/components/admin/Toast";
import { Customer, Estimate } from "@/lib/admin";

function CustomersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchWithAuth } = useAdminAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);

  // Search filter
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // History Panel state
  const [activeHistoryClient, setActiveHistoryClient] = useState<Customer | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch customers
      const custRes = await fetchWithAuth("/api/admin/customers");
      const custData = await custRes.json();
      setCustomers(custData);

      // Fetch estimates for history tracking
      const estRes = await fetchWithAuth("/api/admin/estimates");
      const estData = await estRes.json();
      setEstimates(estData);
    } catch (err) {
      console.error(err);
      showToast("Error loading customer registry details.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle deep linking for client history check
  useEffect(() => {
    const id = searchParams.get("id");
    if (id && customers.length > 0) {
      const match = customers.find((c) => c.id === id);
      if (match) {
        setActiveHistoryClient(match);
      }
    }
  }, [searchParams, customers]);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedCustomerId(null);
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setIsModalOpen(true);
  };

  const openEditModal = (cust: Customer) => {
    setModalMode("edit");
    setSelectedCustomerId(cust.id);
    setName(cust.name);
    setPhone(cust.phone);
    setEmail(cust.email || "");
    setAddress(cust.address);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast("Please provide client name and phone.", "error");
      return;
    }

    try {
      const payload = { name, phone, email, address };
      let res;

      if (modalMode === "create") {
        res = await fetchWithAuth("/api/admin/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetchWithAuth("/api/admin/customers", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, id: selectedCustomerId }),
        });
      }

      if (res.ok) {
        showToast(modalMode === "create" ? "Added customer successfully." : "Updated customer profile.", "success");
        setIsModalOpen(false);
        loadData();
      } else {
        const errData = await res.json();
        showToast(errData.error || "Save operation failed.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Save operation failed due to connection issue.", "error");
    }
  };

  const handleDelete = async (id: string, customerName: string) => {
    if (!confirm(`Delete registry for ${customerName}? This does not clear their estimate records.`)) {
      return;
    }

    try {
      const res = await fetchWithAuth(`/api/admin/customers?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showToast(`Cleared registry details for ${customerName}.`, "success");
        if (activeHistoryClient?.id === id) {
          setActiveHistoryClient(null);
        }
        loadData();
      } else {
        showToast("Delete operation failed.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error occurred during delete.", "error");
    }
  };

  // History Computations
  const clientEstimates = estimates.filter((e) => e.customerId === activeHistoryClient?.id);
  const totalInvoiced = clientEstimates
    .filter((e) => e.status === "saved")
    .reduce((sum, e) => sum + e.grandTotal, 0);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in-up font-sans relative">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-stone-900 dark:text-white">
            Client Registry
          </h1>
          <p className="text-stone-500 text-xs mt-0.5">Manage customer directory data and track proposal history timelines.</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 hover:border-primary text-stone-700 dark:text-stone-300 font-bold py-2 px-4 shadow-sm transition text-xs cursor-pointer select-none disabled:opacity-70"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh Directory
          </button>
          
          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 shadow-md shadow-primary/10 transition text-xs cursor-pointer select-none"
          >
            <Plus className="h-4 w-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Grid containing list and potential sidebar drawers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPONENT: Registry Directory List */}
        <div className={`${activeHistoryClient ? "lg:col-span-7" : "lg:col-span-12"} transition-all duration-300 space-y-4`}>
          
          {/* Search bar */}
          <div className="bg-white dark:bg-stone-900 border border-stone-155/50 dark:border-stone-850 rounded-2xl p-5 shadow-sm select-none">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search clients by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:border-primary text-xs bg-stone-50/50 dark:bg-stone-950 text-stone-800 dark:text-stone-100"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-stone-900 border border-stone-150/40 dark:border-stone-850 rounded-2xl shadow-sm overflow-hidden min-h-[350px] flex flex-col justify-between">
            {loading ? (
              <div className="flex-grow flex flex-col items-center justify-center py-24 text-stone-400 gap-3">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                <span className="font-semibold text-sm">Accessing customer index...</span>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center py-24 text-stone-400 text-center px-4 select-none">
                <User className="h-12 w-12 text-stone-300 mb-3" />
                <h4 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">No Customers Found</h4>
                <p className="text-xs text-stone-500 max-w-xs mt-1">
                  Try adjusting your query or create a new client file profile.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100 dark:divide-stone-850 overflow-x-auto">
                <table className="w-full text-left min-w-[500px] text-xs">
                  <thead>
                    <tr className="bg-stone-50/50 dark:bg-stone-950/20 px-6 py-3.5 text-[10px] font-extrabold uppercase tracking-wider text-stone-500 border-b border-stone-100 dark:border-stone-850">
                      <th className="py-3 px-6">Client Name</th>
                      <th className="py-3 px-4">Contact Phone</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Site Location</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-850">
                    {filteredCustomers.map((cust) => (
                      <tr 
                        key={cust.id}
                        onClick={() => setActiveHistoryClient(cust)}
                        className={`cursor-pointer transition hover:bg-stone-50/40 dark:hover:bg-stone-950/10 ${
                          activeHistoryClient?.id === cust.id ? "bg-primary-light/40 dark:bg-primary/5" : ""
                        }`}
                      >
                        <td className="py-4 px-6 font-serif font-bold text-stone-900 dark:text-white text-sm">
                          {cust.name}
                        </td>
                        <td className="py-4 px-4 text-stone-700 dark:text-stone-300 font-semibold">
                          {cust.phone}
                        </td>
                        <td className="py-4 px-4 text-stone-500 dark:text-stone-400">
                          {cust.email || <span className="text-stone-300 italic">No email</span>}
                        </td>
                        <td className="py-4 px-4 text-stone-500 dark:text-stone-400 max-w-[150px] truncate">
                          {cust.address}
                        </td>
                        <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setActiveHistoryClient(cust)}
                              className="rounded-lg p-2 text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-850 hover:text-primary transition cursor-pointer"
                              title="Interaction History"
                            >
                              <History className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => openEditModal(cust)}
                              className="rounded-lg p-2 text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-850 hover:text-stone-700 dark:hover:text-stone-200 transition cursor-pointer"
                              title="Edit Profile"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(cust.id, cust.name)}
                              className="rounded-lg p-2 text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 transition cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {!loading && filteredCustomers.length > 0 && (
              <div className="bg-stone-50 dark:bg-stone-950/20 border-t border-stone-100 dark:border-stone-850 px-6 py-3.5 text-xs text-stone-500 font-semibold">
                Registered Client Volume: {customers.length}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COMPONENT: Customer Interaction history timeline sheet */}
        <AnimatePresence>
          {activeHistoryClient && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="col-span-1 lg:col-span-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lg rounded-2xl p-6 space-y-6"
            >
              {/* Drawer Top Header */}
              <div className="flex justify-between items-start border-b border-stone-100 dark:border-stone-800 pb-3 select-none">
                <div>
                  <h3 className="font-serif font-black text-stone-900 dark:text-white text-base">
                    Client History Details
                  </h3>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">Interaction Timeline</p>
                </div>
                <button
                  onClick={() => setActiveHistoryClient(null)}
                  className="p-1 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-850 text-stone-400 hover:text-stone-700 dark:hover:text-stone-250 cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Client Profile details brief card */}
              <div className="bg-stone-50/50 dark:bg-stone-950/40 p-4 rounded-xl border border-stone-100 dark:border-stone-850 text-xs space-y-1.5">
                <h4 className="font-serif font-bold text-stone-900 dark:text-stone-200 text-sm leading-none">{activeHistoryClient.name}</h4>
                <p className="text-stone-500 dark:text-stone-400">📞 {activeHistoryClient.phone}</p>
                {activeHistoryClient.email && <p className="text-stone-500 dark:text-stone-400">✉️ {activeHistoryClient.email}</p>}
                <p className="text-stone-500 dark:text-stone-400 pt-1.5 border-t border-stone-100 dark:border-stone-800 mt-2 leading-relaxed">
                  📍 <span className="font-bold text-stone-800 dark:text-stone-300">Site Location:</span> {activeHistoryClient.address}
                </p>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-2 gap-3 text-xs leading-none">
                <div className="bg-stone-50/40 dark:bg-stone-950/20 p-3 rounded-lg border border-stone-100 dark:border-stone-850">
                  <span className="block text-[9px] font-bold text-stone-400 uppercase">Created Proposals</span>
                  <span className="block text-lg font-black text-stone-900 dark:text-white mt-1.5">{clientEstimates.length}</span>
                </div>
                <div className="bg-stone-50/40 dark:bg-stone-950/20 p-3 rounded-lg border border-stone-100 dark:border-stone-850">
                  <span className="block text-[9px] font-bold text-stone-400 uppercase">Saved Revenue</span>
                  <span className="block text-lg font-black text-primary mt-1.5">
                    ₹{totalInvoiced.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              {/* Estimates list timeline */}
              <div className="space-y-3">
                <h4 className="font-serif font-extrabold text-stone-800 dark:text-stone-300 text-xs">Generated Estimate timelines</h4>
                
                {clientEstimates.length === 0 ? (
                  <p className="text-xs text-stone-400 italic">No estimates associated with this client profile.</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {clientEstimates.map((est) => (
                      <div 
                        key={est.id}
                        onClick={() => router.push(`/admin/estimates?id=${est.id}`)}
                        className="flex items-center justify-between p-3 bg-stone-50 hover:bg-primary-light/30 dark:bg-stone-950/40 dark:hover:bg-primary/5 rounded-xl border border-stone-100 dark:border-stone-850 cursor-pointer transition text-xs"
                      >
                        <div className="min-w-0">
                          <span className="font-bold text-stone-800 dark:text-stone-200">{est.estimateNumber}</span>
                          <div className="text-[10px] text-stone-400 dark:text-stone-500 flex gap-2 mt-0.5">
                            <span>{est.date}</span>
                            <span>•</span>
                            <span className="uppercase">{est.estimateType === "material" ? "Material" : "Labour"}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block font-bold text-stone-900 dark:text-white">₹{est.grandTotal.toLocaleString("en-IN")}</span>
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase mt-1 ${
                            est.status === "saved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                          }`}>
                            {est.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. ADD / EDIT REGISTRY DIALOG MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-stone-900 dark:bg-black"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-stone-900 max-w-md w-full rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl relative overflow-hidden z-50 p-6 space-y-5"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3 select-none">
                <h3 className="font-serif font-black text-stone-900 dark:text-white text-base">
                  {modalMode === "create" ? "Add Client Register" : "Modify Client Profile"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-850 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-xs text-stone-800 dark:text-stone-100"
                    placeholder="e.g. Ashish Panchal"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-xs text-stone-800 dark:text-stone-100"
                    placeholder="e.g. 9664956491"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-xs text-stone-800 dark:text-stone-100"
                    placeholder="e.g. ashish@gmail.com"
                  />
                </div>

                {/* Site Address */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                    Site Location Address
                  </label>
                  <textarea
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="block w-full border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2 bg-stone-50/50 dark:bg-stone-950 focus:outline-none focus:border-primary text-xs text-stone-800 dark:text-stone-100"
                    placeholder="Provide layout plot address or home installation address..."
                  />
                </div>

                <div className="border-t border-stone-100 dark:border-stone-800 pt-4 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-bold transition cursor-pointer select-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition cursor-pointer select-none"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function CustomersPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20 text-stone-400 gap-3">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="font-semibold text-sm">Loading customer index...</span>
      </div>
    }>
      <CustomersContent />
    </Suspense>
  );
}
