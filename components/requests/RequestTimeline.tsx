import { RequestStatus } from "@/types/request";
import { getTimelineStep } from "@/utils/request";
import { cn } from "@/lib/utils";
import { Check, Circle } from "lucide-react";

interface RequestTimelineProps {
  status: RequestStatus;
}

const STEPS = [
  { id: 0, label: "Dibuat" },
  { id: 1, label: "Validasi" },
  { id: 2, label: "Persetujuan" },
  { id: 3, label: "Pemenuhan" },
  { id: 4, label: "Pengiriman" },
  { id: 5, label: "Selesai" },
];

export function RequestTimeline({ status }: RequestTimelineProps) {
  const currentStep = getTimelineStep(status);
  
  if (currentStep === -1) {
    // If Cancelled or Rejected, just show a message instead of progress
    return (
      <div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center h-32 text-center">
        <p className="text-muted-foreground font-semibold">
          Permintaan ini telah {status === "DITOLAK" ? "Ditolak" : "Dibatalkan"}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
      <h3 className="font-bold text-foreground mb-8">Status Proses</h3>
      
      {/* Desktop Horizontal */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Progress Bar Background */}
        <div className="absolute left-6 right-6 top-5 h-1 bg-muted rounded-full" />
        {/* Active Progress Bar */}
        <div 
          className="absolute left-6 top-5 h-1 bg-primary rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `calc(${(currentStep / (STEPS.length - 1)) * 100}% - 48px)` }}
        />
        
        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          
          return (
            <div key={step.id} className="relative flex flex-col items-center gap-3 z-10 w-24">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors bg-surface",
                isCompleted ? "border-primary bg-primary text-primary-foreground" : 
                isCurrent ? "border-primary text-primary" : "border-muted text-muted-foreground"
              )}>
                {isCompleted ? <Check className="w-5 h-5" /> : <Circle className={cn("w-3 h-3 fill-current", !isCurrent && "opacity-0")} />}
              </div>
              <span className={cn(
                "text-xs font-bold text-center",
                isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical */}
      <div className="md:hidden relative border-l-2 border-muted ml-4 pl-8 space-y-8 py-2">
        {/* Active Vertical Progress */}
        <div 
          className="absolute left-[-2px] top-0 w-0.5 bg-primary transition-all duration-500 ease-in-out"
          style={{ height: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        />
        
        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          
          return (
            <div key={step.id} className="relative">
              <div className={cn(
                "absolute -left-[50px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-surface",
                isCompleted ? "border-primary bg-primary text-primary-foreground" : 
                isCurrent ? "border-primary text-primary" : "border-muted text-muted-foreground"
              )}>
                {isCompleted ? <Check className="w-4 h-4" /> : <Circle className={cn("w-2 h-2 fill-current", !isCurrent && "opacity-0")} />}
              </div>
              <div>
                <span className={cn(
                  "text-sm font-bold block pt-1.5",
                  isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
