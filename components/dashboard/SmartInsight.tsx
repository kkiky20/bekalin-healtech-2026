"use client";

import { cn } from "@/lib/utils";
import { Lightbulb } from "lucide-react";

interface SmartInsightProps {
  insights: string[];
  className?: string;
}

export function SmartInsight({ insights, className }: SmartInsightProps) {
  return (
    <div className={cn("bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-5 md:p-6", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-indigo-900 dark:text-indigo-300">Decision Support Insight</h3>
          <p className="text-xs font-medium text-indigo-700/70 dark:text-indigo-400/70">Sistem mendeteksi pola operasional</p>
        </div>
      </div>
      
      <ul className="space-y-3">
        {insights.map((insight, i) => (
          <li key={i} className="flex gap-3 text-sm font-medium text-indigo-800 dark:text-indigo-200">
            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5" />
            <span className="leading-relaxed">{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
