"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function Preloader() {
  const pathname = usePathname();
  // Only activate preloader if the user is visiting the landing page
  const [isLoading, setIsLoading] = useState(pathname === "/");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pathname !== "/") return;

    // Disable scrolling while loading
    document.body.style.overflow = "hidden";
    
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 8;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = ""; // Re-enable scrolling
        }, 500); // Pause briefly at 100%
      }
      setProgress(current);
    }, 120);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          exit={{ 
            y: "-100%",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-6 md:p-12 bg-background text-foreground pointer-events-none"
        >
          {/* Top Header */}
          <div className="flex justify-between items-start">
            <span className="font-bold text-xl tracking-tight">BEKALIN<span className="text-primary">.</span></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">System Initializing</span>
          </div>

          {/* Bottom Area */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="overflow-hidden">
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter"
              >
                Welcome
              </motion.div>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="h-[2px] bg-border w-full md:w-48 overflow-hidden rounded-full">
                <motion.div 
                  className="h-full bg-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: "linear" }}
                />
              </div>
              <div className="text-3xl md:text-5xl font-light tabular-nums tracking-tighter min-w-[70px] text-right">
                {progress}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
