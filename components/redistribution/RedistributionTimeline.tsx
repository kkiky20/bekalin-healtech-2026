import { RedistributionRecord } from "@/types/redistribution";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export function RedistributionTimeline({ status }: { status: RedistributionRecord["status"] }) {
  const steps = [
    { key: "DRAFT", label: "Request Approved" },
    { key: "ALLOCATED", label: "Stock Allocated" },
    { key: "PROCESSING", label: "Processing" },
    { key: "IN_DELIVERY", label: "In Delivery" },
    { key: "COMPLETED", label: "Completed" }
  ];

  const currentIndex = steps.findIndex(s => s.key === status) === -1 
    ? (status === "READY" ? 0 : 1) // fallback mapping
    : steps.findIndex(s => s.key === status);

  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between relative">
        {/* Connector Line Desktop */}
        <div className="hidden md:block absolute top-4 left-6 right-6 h-0.5 bg-muted z-0" />
        
        {steps.map((step, idx) => {
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          
          return (
            <div key={step.key} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 mb-6 md:mb-0">
              {/* Connector Line Mobile */}
              {idx < steps.length - 1 && (
                <div className="md:hidden absolute left-[11px] top-6 w-0.5 h-full bg-muted -z-10" />
              )}
              
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors",
                isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                isCurrent && "ring-4 ring-primary/20"
              )}>
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-3 h-3" />}
              </div>
              
              <div className="md:text-center">
                <p className={cn(
                  "text-xs font-bold tracking-tight uppercase",
                  isCompleted ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </p>
                {isCurrent && <p className="text-[10px] text-primary font-bold mt-0.5">CURRENT STAGE</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
