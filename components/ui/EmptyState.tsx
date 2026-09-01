import { LucideIcon, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon = FileX,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-surface border border-border/50 border-dashed rounded-2xl">
      <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-6 text-muted-foreground">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground font-medium max-w-md mx-auto mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" className="font-semibold">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
