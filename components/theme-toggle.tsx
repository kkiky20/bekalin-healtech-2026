"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-20 h-9 rounded-full bg-surface-secondary border border-border animate-pulse"></div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center h-9 w-20 rounded-full bg-surface-secondary border border-border p-1 transition-colors hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      aria-label="Toggle Theme"
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Track Background Sliding Pill */}
      <div 
        className={`absolute h-7 w-9 rounded-full bg-surface shadow-sm border border-border-subtle transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${isDark ? 'translate-x-9' : 'translate-x-0'}`} 
      />

      <div className="relative z-10 flex w-full justify-between items-center px-1.5 text-muted-foreground">
        <Sun className={`h-3.5 w-3.5 transition-colors duration-300 ${!isDark ? 'text-primary' : ''}`} />
        <Moon className={`h-3.5 w-3.5 transition-colors duration-300 ${isDark ? 'text-primary' : ''}`} />
      </div>
    </button>
  );
}
