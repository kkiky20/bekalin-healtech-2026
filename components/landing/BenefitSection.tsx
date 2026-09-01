"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function BenefitSection() {
  const benefits = [
    "Meningkatkan visibilitas persediaan logistik pada seluruh unit pelayanan.",
    "Mempercepat proses distribusi melalui sistem permintaan digital.",
    "Mengurangi risiko stock-out pada saat pelayanan kritis.",
    "Mengurangi risiko overstock dan kedaluwarsa melalui redistribusi.",
    "Mendukung pengambilan keputusan berbasis data melalui analitik.",
    "Meningkatkan efisiensi operasional serta kualitas pelayanan kepada pasien.",
  ];

  return (
    <section id="benefits" className="py-20 md:py-32 bg-surface transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              Impact untuk <br />
              <span className="text-emerald-600 dark:text-emerald-400">Rumah Sakit</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              BEKALIN dirancang tidak hanya untuk sekadar memindahkan pencatatan dari kertas ke digital, tetapi untuk mengoptimalkan cara rumah sakit mengelola supply chain mereka agar lebih responsif dan hemat biaya.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl transform translate-x-4 translate-y-4 -z-10"></div>
            <div className="bg-surface border border-border rounded-3xl p-8 md:p-12 shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-border-subtle pb-6 group">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Efisiensi Distribusi</p>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">+40%</p>
                  </div>
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b border-border-subtle pb-6 group">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Risiko Stock-Out</p>
                    <p className="text-3xl font-bold text-primary">-60%</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  </div>
                </div>
                <div className="pt-2 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                    Prototype / Demo Metrics
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
