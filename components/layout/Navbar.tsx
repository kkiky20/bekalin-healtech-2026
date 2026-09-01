"use client";

import { useState, useEffect } from "react";
import { Menu, X, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-4" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`mx-auto max-w-7xl flex items-center justify-between transition-all duration-500 rounded-full px-6 md:px-8 py-3 ${
          isScrolled 
            ? "bg-surface/80 backdrop-blur-2xl border border-border/50 dark:border-border/80 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] h-16 md:h-20" 
            : "bg-transparent h-16 md:h-20"
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo-transparent.png" 
              alt="BEKALIN Logo" 
              className="h-10 md:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
            />
            <span className={`font-black text-2xl tracking-tighter ${isScrolled ? "text-foreground" : "text-foreground"}`}>
              BEKALIN<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">Fitur</a>
            <a href="#how-it-works" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">Cara Kerja</a>
            <a href="#benefits" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">Benefit</a>
            <a href="#faq" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">FAQ</a>
          </nav>

          {/* CTA & Theme */}
          <div className="hidden md:flex items-center gap-5">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">Log In</Link>
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full px-6 h-11 text-sm font-semibold shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]">
                Coba Gratis
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button 
              className="p-2 text-muted-foreground dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 bg-surface/95 /95 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-2xl md:hidden flex flex-col gap-6"
          >
            <nav className="flex flex-col gap-5">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-foreground">Fitur</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-foreground">Cara Kerja</a>
              <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-foreground">Benefit</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-foreground">FAQ</a>
            </nav>
            <div className="h-px bg-border w-full" />
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-border text-foreground hover:bg-surface-secondary">Log In</Button>
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full h-12 rounded-xl font-bold bg-primary hover:bg-primary-hover text-primary-foreground shadow-[0_0_15px_rgba(37,99,235,0.3)]">Coba Gratis</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
