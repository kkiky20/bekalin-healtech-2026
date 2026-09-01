"use client";

import { UsageData } from "@/types/stock";
import { DashboardChart } from "@/components/dashboard/DashboardChart";

export function StockUsageChart({ data }: { data: UsageData[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm h-full min-h-[300px] flex flex-col justify-center items-center text-center">
        <h3 className="font-bold text-foreground w-full text-left mb-6 self-start">Tren Pemakaian (7 Hari)</h3>
        <p className="text-muted-foreground text-sm font-medium">Data tren pemakaian tidak tersedia.</p>
      </div>
    );
  }

  // Convert to general ChartDataPoint type
  const chartData = data.map(d => ({
    day: d.day,
    usage: d.usage
  }));

  return (
    <DashboardChart 
      title="Tren Pemakaian"
      subtitle="Total item yang didistribusikan dalam 7 hari terakhir."
      type="line"
      data={chartData}
      xAxisKey="day"
      dataKeys={[{ key: "usage", name: "Pemakaian", color: "#6366f1" }]}
      className="h-full shadow-sm"
    />
  );
}
