import { OperationalInsight } from "@/types/analytics";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  insights: OperationalInsight[];
}

export function InsightCard({ insights }: InsightCardProps) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-semibold text-slate-800">Insight Operasional</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {insights.map((insight) => (
          <div key={insight.id} className="p-5 flex items-start gap-4">
            <div className={cn(
              "shrink-0 p-2 rounded-full",
              insight.type === "CRITICAL" ? "bg-rose-100 text-rose-600" :
              insight.type === "WARNING" ? "bg-amber-100 text-amber-600" :
              insight.type === "SUCCESS" ? "bg-emerald-100 text-emerald-600" :
              "bg-blue-100 text-blue-600"
            )}>
              {insight.type === "CRITICAL" && <AlertCircle className="w-5 h-5" />}
              {insight.type === "WARNING" && <AlertTriangle className="w-5 h-5" />}
              {insight.type === "SUCCESS" && <CheckCircle2 className="w-5 h-5" />}
              {insight.type === "NEUTRAL" && <Info className="w-5 h-5" />}
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-medium text-slate-900 mb-1">{insight.title}</h4>
              <p className="text-sm text-slate-600">{insight.description}</p>
              
              {insight.actionUrl && (
                <Link 
                  href={insight.actionUrl}
                  className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Tindak Lanjut <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
