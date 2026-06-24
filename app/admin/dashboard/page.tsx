"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Users,
  TrendingUp,
  Clock,
  Plus,
  ArrowRight,
  IndianRupee,
  RefreshCw,
  FolderDot,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/components/admin/Toast";
import { Customer, Estimate } from "@/lib/admin";

export default function DashboardPage() {
  const router = useRouter();
  const { fetchWithAuth } = useAdminAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEstimatesCount: 0,
    monthlyRevenue: 0,
    totalCustomersCount: 0,
    pendingProjectsCount: 0,
  });
  
  const [recentCustomers, setRecentCustomers] = useState<Customer[]>([]);
  const [recentEstimates, setRecentEstimates] = useState<Estimate[]>([]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch Estimates
      const estimatesRes = await fetchWithAuth("/api/admin/estimates");
      const estimatesData: Estimate[] = await estimatesRes.json();

      // 2. Fetch Customers
      const customersRes = await fetchWithAuth("/api/admin/customers");
      const customersData: Customer[] = await customersRes.json();

      // Calculate statistics
      const totalEstimates = estimatesData.length;
      
      // Filter out drafts for revenue calculation, and restrict to current month
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth(); // 0-11
      
      const monthlyRevenueTotal = estimatesData
        .filter((e) => {
          if (e.status !== "saved") return false;
          const eDate = new Date(e.date);
          return eDate.getFullYear() === currentYear && eDate.getMonth() === currentMonth;
        })
        .reduce((sum, e) => sum + e.grandTotal, 0);

      const pendingDrafts = estimatesData.filter((e) => e.status === "draft").length;

      setStats({
        totalEstimatesCount: totalEstimates,
        monthlyRevenue: monthlyRevenueTotal,
        totalCustomersCount: customersData.length,
        pendingProjectsCount: pendingDrafts,
      });

      // Sort and take recent entries
      // Note: API already sorts estimates by date desc
      setRecentEstimates(estimatesData.slice(0, 5));
      
      // Sort customers by createdAt desc to get recent
      const sortedCustomers = [...customersData].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setRecentCustomers(sortedCustomers.slice(0, 5));

    } catch (err) {
      console.error(err);
      showToast("Error loading dashboard metrics.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-stone-400 gap-3">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="font-semibold text-sm">Aggregating business performance stats...</span>
      </div>
    );
  }

  // Dashboard Stats card layout configuration
  const cardData = [
    {
      title: "Total Estimates",
      value: stats.totalEstimatesCount,
      sub: "All created estimates",
      icon: FileText,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 border-blue-100/50 dark:border-blue-900/30",
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(stats.monthlyRevenue),
      sub: "Non-draft this month",
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-900/30",
    },
    {
      title: "Total Clients",
      value: stats.totalCustomersCount,
      sub: "Registered customer contacts",
      icon: Users,
      color: "text-primary bg-primary-light dark:bg-primary/10 dark:text-primary border-primary/20",
    },
    {
      title: "Pending Drafts",
      value: stats.pendingProjectsCount,
      sub: "Saved estimate drafts",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 border-amber-100/50 dark:border-amber-900/30",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-outfit text-3xl font-extrabold text-stone-900 dark:text-white">
            Panchal Interior Business Suite
          </h1>
          <p className="text-stone-500 text-xs mt-0.5">Centralized studio dashboard for billing metrics, estimates, and client registers.</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={loadDashboardData}
            className="flex items-center gap-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-primary text-stone-700 dark:text-stone-300 font-bold py-2 px-4 shadow-sm transition text-xs cursor-pointer select-none active:scale-[0.98]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>

          <Link
            href="/admin/estimates/new"
            className="flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 shadow-md shadow-primary/10 transition text-xs select-none active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            New Estimate
          </Link>
        </div>
      </div>

      {/* Grid: 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white dark:bg-stone-900 border border-stone-150/40 dark:border-stone-850 rounded-2xl p-6 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow"
            >
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border ${card.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <span className="block text-2xl font-black text-stone-900 dark:text-white mt-1 leading-none truncate">
                  {card.value}
                </span>
                <span className="block text-[10px] text-stone-400 dark:text-stone-500 mt-1 truncate">
                  {card.sub}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Grid: Main Dashboard content list splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Col 1: Recent Estimates */}
        <div className="lg:col-span-8 bg-white dark:bg-stone-900 border border-stone-150/40 dark:border-stone-850 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="font-outfit font-extrabold text-stone-900 dark:text-white text-sm">
              Recent Estimates
            </h3>
            <Link
              href="/admin/estimates"
              className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline"
            >
              View All Estimates
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {recentEstimates.length === 0 ? (
            <div className="py-12 text-center text-stone-400 flex flex-col items-center gap-2 select-none">
              <FolderDot className="h-10 w-10 text-stone-300" />
              <span className="text-xs font-semibold">No estimates generated yet.</span>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 dark:divide-stone-850 overflow-x-auto">
              <table className="w-full text-left min-w-[500px] text-xs">
                <thead>
                  <tr className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    <th className="pb-2.5">Est No</th>
                    <th className="pb-2.5">Customer</th>
                    <th className="pb-2.5">Date</th>
                    <th className="pb-2.5">Type</th>
                    <th className="pb-2.5 text-right">Grand Total</th>
                    <th className="pb-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-850">
                  {recentEstimates.map((est) => (
                    <tr 
                      key={est.id} 
                      onClick={() => router.push(`/admin/estimates?id=${est.id}`)}
                      className="hover:bg-stone-50/50 dark:hover:bg-stone-950/20 cursor-pointer transition"
                    >
                      <td className="py-3.5 font-bold text-stone-900 dark:text-white">
                        {est.estimateNumber}
                      </td>
                      <td className="py-3.5 font-semibold text-stone-700 dark:text-stone-300">
                        {est.customerName}
                      </td>
                      <td className="py-3.5 text-stone-500 dark:text-stone-400">
                        {est.date}
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          est.estimateType === "material" 
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" 
                            : "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300"
                        }`}>
                          {est.estimateType === "material" ? "Material" : "Labour"}
                        </span>
                      </td>
                      <td className="py-3.5 text-right font-black text-stone-900 dark:text-white">
                        ₹{est.grandTotal.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 text-right">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                          est.status === "saved"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                        }`}>
                          {est.status === "saved" ? "Saved" : "Draft"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Col 2: Recent Customers & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Actions Panel */}
          <div className="bg-white dark:bg-stone-900 border border-stone-150/40 dark:border-stone-850 rounded-2xl shadow-sm p-6 space-y-4">
            <h3 className="font-outfit font-extrabold text-stone-900 dark:text-white text-sm border-b border-stone-100 dark:border-stone-800 pb-3">
              Suite Navigation Shortcuts
            </h3>
            
            <div className="grid grid-cols-1 gap-2.5 text-xs font-bold">
              <Link
                href="/admin/estimates/new"
                className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-primary hover:text-white dark:bg-stone-950 dark:hover:bg-stone-800/80 rounded-xl border border-stone-100 dark:border-stone-850 text-stone-800 dark:text-stone-300 transition-all select-none"
              >
                <span>➕ Generate Estimate Proposal</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              <Link
                href="/admin/customers"
                className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-primary hover:text-white dark:bg-stone-950 dark:hover:bg-stone-800/80 rounded-xl border border-stone-100 dark:border-stone-850 text-stone-800 dark:text-stone-300 transition-all select-none"
              >
                <span>👤 Add Customer File</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              <Link
                href="/admin/price-master"
                className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-primary hover:text-white dark:bg-stone-950 dark:hover:bg-stone-800/80 rounded-xl border border-stone-100 dark:border-stone-850 text-stone-800 dark:text-stone-300 transition-all select-none"
              >
                <span>🛠️ Manage central rates master</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Recent Customers List */}
          <div className="bg-white dark:bg-stone-900 border border-stone-150/40 dark:border-stone-850 rounded-2xl shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-outfit font-extrabold text-stone-900 dark:text-white text-sm">
                Recent Customer Files
              </h3>
              <Link
                href="/admin/customers"
                className="text-xs text-primary font-bold hover:underline"
              >
                View Directory
              </Link>
            </div>

            {recentCustomers.length === 0 ? (
              <div className="py-6 text-center text-stone-400 text-xs font-semibold">
                No customer directories registered.
              </div>
            ) : (
              <div className="space-y-3">
                {recentCustomers.map((cust) => (
                  <div 
                    key={cust.id} 
                    onClick={() => router.push(`/admin/customers?id=${cust.id}`)}
                    className="flex justify-between items-center p-3 hover:bg-stone-50/50 dark:hover:bg-stone-950/20 border border-stone-100 dark:border-stone-850 rounded-xl cursor-pointer transition"
                  >
                    <div className="min-w-0">
                      <h4 className="font-outfit font-extrabold text-stone-900 dark:text-stone-200 text-xs truncate">
                        {cust.name}
                      </h4>
                      <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5 truncate">
                        📞 {cust.phone}
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest shrink-0 ml-2">
                      {new Date(cust.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
