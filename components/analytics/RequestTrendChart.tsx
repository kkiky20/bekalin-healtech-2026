"use client";

import { RequestTrendMetric } from "@/types/analytics";
import { 
  AreaChart, 
  Area, 
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
      <div className="h-[300px] flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
        <p className="text-slate-500 text-sm font-medium">Belum ada data pada periode ini.</p>
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
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis} 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }}
            dy={10}
            minTickGap={20}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0', 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              padding: '12px 16px',
              fontWeight: 600
            }}
            labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '13px' }}
            itemStyle={{ color: '#0f172a', fontSize: '14px' }}
            labelFormatter={(label) => formatXAxis(label as string)}
            formatter={(value: any) => [value, 'Volume']}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#2563eb" 
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorCount)"
            activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 3, fill: '#2563eb' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
