"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/components/admin/Toast";
import EstimateForm from "@/components/admin/EstimateForm";
import { Estimate } from "@/lib/admin";

interface EditEstimateClientPageProps {
  id: string;
}

export default function EditEstimateClientPage({ id }: EditEstimateClientPageProps) {
  const router = useRouter();
  const { fetchWithAuth } = useAdminAuth();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  useEffect(() => {
    async function loadEstimate() {
      try {
        setLoading(true);
        const res = await fetchWithAuth(`/api/admin/estimates?id=${id}`);
        if (!res.ok) {
          showToast("Failed to fetch estimate record.", "error");
          router.push("/admin/estimates");
          return;
        }
        const data = await res.json();
        setEstimate(data);
      } catch (err) {
        console.error(err);
        showToast("Error retrieving estimate details.", "error");
        router.push("/admin/estimates");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadEstimate();
    }
  }, [id, fetchWithAuth, showToast, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-stone-400 gap-3">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="font-semibold text-sm">Retrieving estimate draft details...</span>
      </div>
    );
  }

  if (!estimate) {
    return (
      <div className="text-center py-20 text-stone-500">
        <p>Estimate record not found.</p>
        <button
          onClick={() => router.push("/admin/estimates")}
          className="mt-4 inline-flex items-center gap-2 text-primary font-bold hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Estimates Registry
        </button>
      </div>
    );
  }

  return <EstimateForm initialData={estimate} />;
}
