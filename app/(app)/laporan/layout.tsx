import { Metadata } from "next";
import { AnalyticsTabs } from "@/components/analytics/AnalyticsTabs";

export const metadata: Metadata = {
  title: "Laporan & Analitik | BEKALIN",
  description: "Laporan performa dan analitik BEKALIN",
};

export default function LaporanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500 pb-12">
      <AnalyticsTabs />
      {children}
    </div>
  );
}
