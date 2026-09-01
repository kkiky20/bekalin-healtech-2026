"use client";

import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, ArrowRightLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SmartDecision() {
  return (
    <section className="py-24 md:py-32 bg-background text-foreground overflow-hidden relative transition-colors duration-300">
      {/* Background Lighting/Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 dark:bg-cyan-600/20 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-secondary border border-border mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-xs font-medium tracking-wide text-primary uppercase">
                Decision Support System
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1] tracking-tight text-foreground">
              Jangan Hanya Melihat Stok. <br />
              <span className="text-primary">Ambil Keputusan dari Data.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-medium">
              BEKALIN bertindak sebagai asisten pintar Anda. Saat stok menipis, sistem proaktif merekomendasikan redistribusi antarunit sebelum Anda menyetujui pengadaan baru.
            </p>
            <Button size="lg" variant="outline" className="border-border hover:bg-surface-secondary text-foreground rounded-xl h-12 px-6 font-medium transition-colors">
              Lihat Cara Kerja <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Interactive UI Simulation */}
          <div className="relative w-full max-w-lg mx-auto lg:ml-auto">
            {/* Base Card - Critical Stock */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-md bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="text-red-500 dark:text-red-400 h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider">Critical Status</h3>
              </div>
              
              <div className="flex justify-between items-end mb-8 bg-surface-secondary rounded-xl p-5 border border-border-subtle">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">IGD</p>
                  <p className="text-xl font-black tracking-tight">Paracetamol</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Stok / Min</p>
                  <div className="flex items-baseline justify-end gap-1">
                    <p className="text-2xl font-bold text-red-500 dark:text-red-400 leading-none">5</p>
                    <span className="text-sm font-medium text-muted-foreground">/ 20</span>
                  </div>
                </div>
              </div>

              {/* Recommendation Box */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-surface-secondary rounded-xl p-5 border border-border-subtle relative overflow-hidden shadow-sm"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                <div className="flex items-center gap-2 mb-4 text-foreground text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <span className="font-medium">Stok surplus terdeteksi pada unit lain</span>
                </div>
                
                <div className="flex items-center justify-between bg-surface p-4 rounded-lg border border-border-subtle mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Source</p>
                    <p className="font-semibold text-foreground text-sm">Rawat Jalan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Available</p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">80 <span className="text-xs font-normal text-muted-foreground">Unit</span></p>
                  </div>
                </div>

                <div className="bg-primary rounded-lg p-4 shadow-md shadow-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary-foreground/90 uppercase tracking-wider">Smart Recommendation</span>
                    <ArrowRightLeft className="h-4 w-4 text-primary-foreground/80" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xl text-primary-foreground">15 Unit</p>
                      <p className="text-xs text-primary-foreground/80 font-medium">Redistribusi</p>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-xs text-primary-foreground bg-black/20 px-3 py-1.5 rounded-md">
                      <span>R.Jalan</span>
                      <ArrowRight className="h-3 w-3 text-primary-foreground/80" />
                      <span>IGD</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed font-medium">
                  Alasan: Unit target memiliki stok di bawah batas aman, unit sumber memiliki cadangan memadai.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
