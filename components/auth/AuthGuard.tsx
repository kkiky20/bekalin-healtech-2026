"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";

const PUBLIC_PATHS = ["/", "/login"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const isPublicPath = PUBLIC_PATHS.includes(pathname);

    // Redirect unauthenticated users trying to access protected routes
    if (!isAuthenticated && !isPublicPath) {
      router.replace("/login");
    } 
    // Redirect authenticated users away from the login page
    else if (isAuthenticated && pathname === "/login") {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router, pathname]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  
  // Hide content while redirecting
  if (!isAuthenticated && !isPublicPath) return null;
  if (isAuthenticated && pathname === "/login") return null;

  return <>{children}</>;
}
