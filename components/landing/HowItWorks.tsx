"use client";

import { Eye, FileEdit, Cpu, Truck, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { Search, Send, CheckCircle, Package } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Identifikasi Kebutuhan",
      desc: "Sistem mendeteksi stok yang menipis atau user dapat mencari item secara manual melalui katalog digital.",
      color: "bg-blue-600",
    },
    {
      icon: <Send className="w-8 h-8 text-white" />,
      title: "Pengajuan & Rekomendasi",
      desc: "User membuat permintaan. BEKALIN akan merekomendasikan unit lain yang memiliki stok berlebih.",
      color: "bg-indigo-500",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      title: "Validasi Real-Time",
      desc: "Admin gudang atau kepala unit dapat menyetujui, menolak, atau menyesuaikan jumlah permintaan langsung dari dashboard.",
      color: "bg-emerald-500",
    },
    {
      icon: <Package className="w-8 h-8 text-white" />,
      title: "Distribusi Terlacak",
      desc: "Status pengiriman dapat dipantau hingga barang diterima oleh unit peminta.",
      color: "bg-amber-500",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-surface-secondary relative transition-colors duration-300 border-y border-border/50 dark:border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 relative items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-primary mb-6 border border-blue-100 dark:border-blue-500/20">
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Workflow
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl lg:text-5xl font-black tracking-tight mb-6 tracking-tight leading-[1.1]">
                Didesain Sederhana. <br />
                <span className="text-primary dark:text-blue-500">Bekerja Kompleks.</span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                Kami merancang proses kerja yang meniru kebiasaan staf rumah sakit, lalu mempercepatnya 10x lipat dengan otomasi.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-8 md:gap-12">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-background p-8 md:p-10 rounded-2xl shadow-sm border border-border sticky group hover:shadow-md transition-all hover:border-slate-300 dark:hover:border-slate-700"
                style={{ top: `${150 + (i * 20)}px` }}
              >
                <div className={`${step.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-105 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight tracking-tight mb-4 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                  {i + 1}. {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
