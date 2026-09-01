"use client";

import { Activity, BarChart3, Building2, Cpu, FileText, Truck } from "lucide-react";
import { motion } from "framer-motion";

export function SolutionSection() {
  const coreFeatures = [
    { icon: <Activity className="w-4 h-4 text-primary" />, label: "Monitoring Stok" },
    { icon: <FileText className="w-4 h-4 text-primary" />, label: "Request & Validasi" },
    { icon: <Truck className="w-4 h-4 text-primary" />, label: "Distribusi / Redistribusi" }
  ];

  return (
    <section className="py-24 md:py-32 bg-surface-secondary transition-colors duration-300 relative overflow-hidden border-y border-border/50">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold tracking-wide text-primary uppercase">
              Seamless Integration
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 tracking-tight">
            Menghubungkan Seluruh <br className="hidden md:block" />
            <span className="text-primary">Clinical Supply Chain.</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            Satu platform sentral untuk memantau stok, mengajukan kebutuhan, memperoleh rekomendasi redistribusi, dan membantu manajemen mengambil keputusan berbasis data.
          </p>
        </motion.div>

        {/* Robust Flow Architecture */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 relative">
            
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0">
              <motion.div 
                className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
                animate={{ left: ['-30%', '100%'] }}
                transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
              />
            </div>
            
            {/* Mobile Connecting Line */}
            <div className="block lg:hidden absolute top-0 left-1/2 w-0.5 h-full bg-border -translate-x-1/2 z-0">
              <motion.div 
                className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-transparent via-primary to-transparent"
                animate={{ top: ['-20%', '100%'] }}
                transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
              />
            </div>

            {/* Left Node: Input */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative z-10 w-full lg:w-72 bg-surface border border-border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-surface-secondary border border-border-subtle flex items-center justify-center mb-4">
                <Building2 className="w-7 h-7 text-muted-foreground" />
              </div>
              <h4 className="font-black tracking-tight text-lg mb-2">Unit Pelayanan</h4>
              <p className="text-sm text-muted-foreground font-medium">
                Poli, IGD, Ranap, Apotek sebagai titik awal data & stok persediaan.
              </p>
            </motion.div>

            {/* Center Node: BEKALIN Core */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-20 w-full lg:w-96 bg-surface border-2 border-primary/20 rounded-3xl p-6 md:p-8 text-center shadow-xl shadow-primary/5"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-3xl animate-pulse"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-primary shadow-lg shadow-primary/30 flex items-center justify-center mb-6">
                  <Cpu className="w-10 h-10 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-primary text-xl mb-6">BEKALIN Core Engine</h4>
                
                <div className="flex flex-col gap-3 text-left">
                  {coreFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 bg-background border border-border rounded-xl p-3">
                      <div className="bg-primary/10 p-1.5 rounded-lg">
                        {feature.icon}
                      </div>
                      <span className="font-semibold text-sm text-foreground">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Node: Output */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10 w-full lg:w-72 bg-surface border border-border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-surface-secondary border border-border-subtle flex items-center justify-center mb-4">
                <BarChart3 className="w-7 h-7 text-emerald-500" />
              </div>
              <h4 className="font-black tracking-tight text-lg mb-2">Analytics & Target</h4>
              <p className="text-sm text-muted-foreground font-medium">
                Penyaluran ke unit tujuan dan insight untuk manajemen rumah sakit.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
