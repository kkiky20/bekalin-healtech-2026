"use client";

import { Database, FileText, EyeOff, LineChart, Truck } from "lucide-react";
import { motion } from "framer-motion";

export function ProblemSection() {
  const problems = [
    {
      icon: <Database className="h-5 w-5 text-amber-600" />,
      title: "Data Belum Terintegrasi",
      desc: "Informasi stok tersebar, tidak diperbarui secara real-time.",
    },
    {
      icon: <FileText className="h-5 w-5 text-amber-600" />,
      title: "Permintaan Manual",
      desc: "Proses koordinasi yang lambat dan rentan kesalahan pencatatan.",
    },
    {
      icon: <EyeOff className="h-5 w-5 text-amber-600" />,
      title: "Minim Visibilitas",
      desc: "Satu unit kehabisan stok, sementara unit lain memiliki stok berlebih.",
    },
    {
      icon: <LineChart className="h-5 w-5 text-amber-600" />,
      title: "Perencanaan Kurang Akurat",
      desc: "Pengadaan tidak berbasis data, meningkatkan risiko overstock & kedaluwarsa.",
    },
    {
      icon: <Truck className="h-5 w-5 text-amber-600" />,
      title: "Monitoring Terbatas",
      desc: "Sulit melacak proses distribusi logistik dari gudang ke unit tujuan.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-surface transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-secondary border border-border mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-amber-500"></span>
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                The Challenge
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1] tracking-tighter text-balance">
              Masalah Logistik Klinis <br className="hidden md:block" /> Tidak Hanya Tentang Stok.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              Stok mungkin tersedia, tetapi belum tentu tersedia di unit yang membutuhkannya pada waktu yang tepat. Visibilitas yang buruk adalah akar masalah dari inefisiensi rumah sakit.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[27px] w-px bg-slate-200 dark:bg-slate-800 z-0 hidden md:block"></div>
            <div className="flex flex-col gap-8 md:gap-10">
              {problems.map((problem, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  className="relative z-10 flex gap-5 md:gap-6 group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="relative w-14 h-14 shrink-0 rounded-2xl border border-border shadow-[0_4px_12px_rgb(0,0,0,0.03)] dark:shadow-none group-hover:border-amber-200 dark:group-hover:border-amber-500/50 transition-all overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-surface z-0"></div>
                    <div className="absolute inset-0 bg-amber-50 dark:bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                    <div className="relative z-20 transition-transform group-hover:scale-110">
                      {problem.icon}
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-lg text-foreground mb-1.5 tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{problem.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                      {problem.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
