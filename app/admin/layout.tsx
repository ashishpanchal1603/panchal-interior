import type { Metadata } from "next";
import { Suspense } from "react";
import AdminClientWrapper from "@/components/admin/AdminClientWrapper";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <AdminClientWrapper>{children}</AdminClientWrapper>
    </Suspense>
  );
}
