"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] flex items-center justify-center w-[52px] h-[52px] md:w-[60px] md:h-[60px]"
        >
          {/* Circular Progress SVG */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-md" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              strokeWidth="8"
              className="stroke-border/50 dark:stroke-border/30"
            />
            {/* Progress Track */}
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className="stroke-black dark:stroke-blue-500"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          {/* Inner Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-[6px] md:inset-[7px] rounded-full bg-background dark:bg-surface-secondary flex items-center justify-center shadow-sm border border-border/50 hover:bg-surface transition-colors focus:outline-none"
            aria-label="Kembali ke atas"
          >
            <ArrowUp className="w-5 h-5 text-foreground" strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
