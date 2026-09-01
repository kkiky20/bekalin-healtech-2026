import { RedistributionStatus } from "@/types/redistribution";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export function DistributionTimeline({ status }: { status: RedistributionStatus }) {
  const steps = [
    { key: "ALLOCATED", label: "Stok Dialokasikan" },
    { key: "PROCESSING", label: "Sedang Diproses" },
    { key: "IN_DELIVERY", label: "Dalam Pengiriman" },
    { key: "RECEIVED", label: "Sudah Diterima" },
    { key: "COMPLETED", label: "Selesai" }
  ];

  const currentIndex = steps.findIndex(s => s.key === status);

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
                "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors bg-surface border-2",
                isCompleted ? "border-primary text-primary" : "border-muted-foreground/30 text-muted-foreground/30",
                isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20 border-primary"
              )}>
                {isCompleted && !isCurrent ? <CheckCircle2 className="w-5 h-5 fill-primary text-white" /> : 
                 isCurrent ? <Circle className="w-2 h-2 fill-current" /> : 
                 <Circle className="w-2 h-2" />}
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
