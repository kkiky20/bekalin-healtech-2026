"use client";

import { useAuthStore, Role } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && isAuthenticated && user) {
      if (!allowedRoles.includes(user.role)) {
        router.replace("/unauthorized");
      }
    }
  }, [mounted, isAuthenticated, user, allowedRoles, router]);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) return null;

  if (!allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
