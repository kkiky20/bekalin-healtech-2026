import { OperationalInsight } from "@/types/analytics";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  insights: OperationalInsight[];
}

export function InsightCard({ insights }: InsightCardProps) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden h-full flex flex-col">
      <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Insight Sistem
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-md">Real-time</span>
      </div>
      <div className="divide-y divide-slate-100 flex-1 overflow-y-auto custom-scrollbar">
        {insights.map((insight) => (
          <div key={insight.id} className="p-6 flex items-start gap-4 hover:bg-slate-50/50 transition-colors group">
            <div className={cn(
              "shrink-0 p-2.5 rounded-xl border shadow-sm transition-transform group-hover:scale-110",
              insight.type === "CRITICAL" ? "bg-rose-50 border-rose-100 text-rose-600" :
              insight.type === "WARNING" ? "bg-amber-50 border-amber-100 text-amber-600" :
              insight.type === "SUCCESS" ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
              "bg-blue-50 border-blue-100 text-blue-600"
            )}>
              {insight.type === "CRITICAL" && <AlertCircle className="w-5 h-5" />}
              {insight.type === "WARNING" && <AlertTriangle className="w-5 h-5" />}
              {insight.type === "SUCCESS" && <CheckCircle2 className="w-5 h-5" />}
              {insight.type === "NEUTRAL" && <Info className="w-5 h-5" />}
            </div>
            
            <div className="flex-1 pt-0.5">
              <h4 className="text-sm font-bold text-slate-900 mb-1 leading-tight">{insight.title}</h4>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-3">{insight.description}</p>
              
              {insight.actionUrl && (
                <Link 
                  href={insight.actionUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-all"
                >
                  Tindak Lanjut <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
