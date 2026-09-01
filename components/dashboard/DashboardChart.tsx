"use client";

import { cn } from "@/lib/utils";
import { ChartDataPoint } from "@/types/dashboard";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar, Legend } from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface DashboardChartProps {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  type: "line" | "area" | "bar";
  dataKeys: { key: string; color: string; name?: string }[];
  xAxisKey: string;
  className?: string;
}

export function DashboardChart({ title, subtitle, data, type, dataKeys, xAxisKey, className }: DashboardChartProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const textColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "#334155" : "#e2e8f0";
  const tooltipBg = isDark ? "#0f172a" : "#ffffff";
  const tooltipBorder = isDark ? "#1e293b" : "#e2e8f0";
  const tooltipText = isDark ? "#f8fafc" : "#0f172a";

  if (!mounted) return <div className={cn("bg-surface border border-border/50 rounded-2xl min-h-[400px]", className)} />;

  return (
    <div className={cn("bg-surface border border-border/50 rounded-2xl p-5 md:p-6 flex flex-col", className)}>
      <div className="mb-6">
        <h3 className="font-bold text-foreground text-lg">{title}</h3>
        {subtitle && <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey={xAxisKey} stroke={textColor} fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', color: tooltipText, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '13px', fontWeight: 600 }}
                labelStyle={{ fontSize: '12px', color: textColor, marginBottom: '4px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              {dataKeys.map((dk) => (
                <Line key={dk.key} type="monotone" dataKey={dk.key} name={dk.name || dk.key} stroke={dk.color} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              ))}
            </LineChart>
          ) : type === "area" ? (
             <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey={xAxisKey} stroke={textColor} fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', color: tooltipText, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '13px', fontWeight: 600 }}
                labelStyle={{ fontSize: '12px', color: textColor, marginBottom: '4px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              {dataKeys.map((dk) => (
                <Area key={dk.key} type="monotone" dataKey={dk.key} name={dk.name || dk.key} stroke={dk.color} fill={dk.color} fillOpacity={0.2} strokeWidth={3} />
              ))}
            </AreaChart>
          ) : (
             <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey={xAxisKey} stroke={textColor} fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', color: tooltipText, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '13px', fontWeight: 600 }}
                labelStyle={{ fontSize: '12px', color: textColor, marginBottom: '4px' }}
                cursor={{ fill: isDark ? '#1e293b' : '#f1f5f9' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              {dataKeys.map((dk) => (
                <Bar key={dk.key} dataKey={dk.key} name={dk.name || dk.key} fill={dk.color} radius={[4, 4, 0, 0]} maxBarSize={50} />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
