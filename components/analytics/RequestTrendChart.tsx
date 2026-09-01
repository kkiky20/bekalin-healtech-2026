"use client";

import { RequestTrendMetric } from "@/types/analytics";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface RequestTrendChartProps {
  data: RequestTrendMetric[];
}

export function RequestTrendChart({ data }: RequestTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-xl">
        <p className="text-slate-500 text-sm">Belum ada data pada periode ini.</p>
      </div>
    );
  }

  // Format date for tooltip and axis
  const formatXAxis = (tickItem: string) => {
    try {
      const date = new Date(tickItem);
      return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(date);
    } catch {
      return tickItem;
    }
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis} 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelFormatter={(label) => formatXAxis(label as string)}
            formatter={(value: number) => [value, 'Request']}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }}
            activeDot={{ r: 6, stroke: '#bfdbfe', strokeWidth: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
