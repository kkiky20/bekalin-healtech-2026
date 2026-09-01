import { Role } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

interface RoleBadgeProps {
  role: Role;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const badgeStyles: Record<Role, string> = {
    ADMIN_GUDANG: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
    ADMIN_CSSD: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
    PERAWAT: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800/50",
    MANAJER: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
  };

  const roleLabels: Record<Role, string> = {
    ADMIN_GUDANG: "Admin Gudang",
    ADMIN_CSSD: "Admin CSSD",
    PERAWAT: "Perawat",
    MANAJER: "Manajer",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border",
        badgeStyles[role],
        className
      )}
    >
      {roleLabels[role]}
    </span>
  );
}
