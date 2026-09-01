"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Activity, ArrowRightLeft, AlertTriangle, LayoutDashboard, FileText, Truck, BarChart3, BellRing } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-50/50 dark:bg-cyan-900/10 blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-[45%_55%] gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border/80 dark:border-border shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.8)]"></span>
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Clinical Supply Chain Platform
              </span>
            </div>
            
            <div className="mb-10">
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="hero-title-massive text-foreground leading-none"
              >
                Kelola Stok Klinik
              </motion.h1>
              <motion.h1 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="hero-title-massive leading-none mt-2 md:mt-3"
              >
                <span className="text-primary">Lebih Cerdas,</span>
              </motion.h1>
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="hero-title-massive text-foreground leading-none mt-2 md:mt-3"
              >
                Layanan Optimal.
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-xl font-medium"
            >
              BEKALIN membantu rumah sakit memantau stok, mengoordinasikan kebutuhan, dan mengoptimalkan distribusi logistik klinis dalam satu sistem terintegrasi.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/login">
                <Button className="h-14 px-8 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground text-base font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1">
                  Coba Demo Gratis
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-xl px-8 h-12 text-base font-semibold border-border text-muted-foreground hover:bg-background dark:hover:bg-slate-900 hover:text-primary dark:hover:text-blue-400 transition-colors">
                Lihat Fitur <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 dark:text-emerald-400" />
                <span>Real-time visibility</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 dark:text-emerald-400" />
                <span>Smart redistribution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 dark:text-emerald-400" />
                <span>Decision support</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto w-full group"
          >
            {/* High-Fidelity Realistic Dashboard Preview */}
            <div className="relative w-full aspect-[4/3] max-w-[750px] xl:scale-105 origin-right mx-auto md:mr-0 rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col z-10">
              
              {/* App Topbar */}
              <div className="h-14 border-b border-border bg-surface flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="hidden sm:flex items-center bg-surface-secondary px-3 py-1.5 rounded-md border border-border text-xs text-muted-foreground font-medium">
                    <Activity className="w-3 h-3 mr-2 text-primary" />
                    app.bekalin.id/dashboard
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <BellRing className="w-4 h-4 text-muted-foreground" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    A
                  </div>
                </div>
              </div>
              
              {/* Dashboard Body */}
              <div className="flex flex-1 overflow-hidden bg-background">
                {/* Sidebar */}
                <div className="w-16 sm:w-48 border-r border-border bg-surface-secondary/50 p-3 flex flex-col gap-2 shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary flex items-center gap-3">
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold hidden sm:block">Dashboard</span>
                  </div>
                  <div className="p-2 rounded-lg text-muted-foreground hover:bg-surface flex items-center gap-3 transition-colors">
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-medium hidden sm:block">Permintaan</span>
                  </div>
                  <div className="p-2 rounded-lg text-muted-foreground hover:bg-surface flex items-center gap-3 transition-colors">
                    <Truck className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-medium hidden sm:block">Distribusi</span>
                  </div>
                  <div className="p-2 rounded-lg text-muted-foreground hover:bg-surface flex items-center gap-3 transition-colors">
                    <BarChart3 className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-medium hidden sm:block">Analitik</span>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
                  <h3 className="text-lg font-bold text-foreground mb-4 tracking-tight">Overview Stok (IGD)</h3>
                  
                  {/* KPI Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-surface p-3 sm:p-4 rounded-xl border border-border shadow-sm flex flex-col justify-between">
                      <span className="text-xs text-muted-foreground font-medium mb-2">Total Item Aktif</span>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-black text-foreground">1,420</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center">
                          +2.4%
                        </span>
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/20 p-3 sm:p-4 rounded-xl border border-red-200 dark:border-red-900/30 shadow-sm flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full blur-xl -mr-4 -mt-4"></div>
                      <span className="text-xs text-red-600 dark:text-red-400 font-bold mb-2">Stok Kritis</span>
                      <div className="flex items-end justify-between relative z-10">
                        <span className="text-2xl font-black text-red-600 dark:text-red-400">12</span>
                        <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">
                          Butuh Aksi
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Realistic Table */}
                  <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-surface-secondary/50">
                      <span className="text-xs font-bold text-foreground">Permintaan Mendesak</span>
                      <span className="text-[10px] text-primary font-bold cursor-pointer hover:underline">Lihat Semua</span>
                    </div>
                    <div className="divide-y divide-border">
                      <div className="p-3 sm:p-4 flex items-center justify-between hover:bg-surface-secondary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-foreground">Paracetamol Infus</div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">Dari: Poli Anak (Sisa 5 vial)</div>
                          </div>
                        </div>
                        <button className="hidden sm:block text-[10px] font-bold bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors">
                          Setujui
                        </button>
                      </div>
                      
                      <div className="p-3 sm:p-4 flex items-center justify-between hover:bg-surface-secondary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center shrink-0">
                            <ArrowRightLeft className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-foreground">Redistribusi Masker N95</div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">Rek: Gudang Utama → IGD</div>
                          </div>
                        </div>
                        <button className="hidden sm:block text-[10px] font-bold border border-border bg-surface hover:bg-surface-secondary text-foreground px-3 py-1.5 rounded-md transition-colors">
                          Tinjau
                        </button>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
