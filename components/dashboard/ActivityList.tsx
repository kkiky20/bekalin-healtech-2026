"use client";

import { DashboardActivity } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface ActivityListProps {
  title: string;
  activities: DashboardActivity[];
  className?: string;
}

export function ActivityList({ title, activities, className }: ActivityListProps) {
  return (
    <div className={cn("bg-surface border border-border/50 rounded-2xl flex flex-col h-full", className)}>
      <div className="p-5 border-b border-border/50">
        <h3 className="font-bold text-foreground">{title}</h3>
      </div>
      
      <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
        <div className="relative border-l border-border/60 ml-3 space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative pl-6">
              {/* Timeline Dot */}
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-primary" />
              
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  {activity.time}
                </span>
                <p className="text-sm font-semibold text-foreground mb-1 leading-snug">
                  {activity.description}
                </p>
                <span className="text-xs font-medium text-primary">
                  {activity.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
