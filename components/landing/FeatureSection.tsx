"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LayoutDashboard, BellRing, ArrowRightLeft, ListOrdered, MapPin, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export function FeatureSection() {
  const features = [
    {
      id: "01",
      icon: <LayoutDashboard className="h-6 w-6 text-primary" />,
      title: "Real-Time Dashboard",
      desc: "Menampilkan kondisi stok, permintaan, dan distribusi secara langsung dan akurat.",
    },
    {
      id: "02",
      icon: <BellRing className="h-6 w-6 text-red-500" />,
      title: "Stock Critical Alert",
      desc: "Memberikan peringatan proaktif ketika stok berada di bawah batas minimum yang ditetapkan.",
    },
    {
      id: "03",
      icon: <ArrowRightLeft className="h-6 w-6 text-emerald-500" />,
      title: "Redistribution Recommendation",
      desc: "Merekomendasikan pemindahan stok antarunit sebelum melakukan pengadaan baru.",
    },
    {
      id: "04",
      icon: <ListOrdered className="h-6 w-6 text-amber-500" />,
      title: "Smart Priority Queue",
      desc: "Mengurutkan permintaan secara otomatis berdasarkan tingkat urgensi pelayanan unit.",
    },
    {
      id: "05",
      icon: <MapPin className="h-6 w-6 text-indigo-500" />,
      title: "Distribution Tracking",
      desc: "Memantau seluruh proses distribusi logistik secara real-time hingga barang diterima.",
    },
    {
      id: "06",
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
      title: "Interactive Analytics",
      desc: "Menyajikan grafik dan indikator kinerja logistik untuk mendukung evaluasi manajemen.",
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border/60 dark:border-border mb-6 shadow-sm">
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">
              Core Capabilities
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1] tracking-tighter">
            Semua yang Dibutuhkan untuk <br className="hidden md:block" />
            <span className="text-primary dark:text-blue-500">Clinical Supply Chain</span> Terpadu.
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl">
            Dari visibilitas stok hingga analitik prediktif, semuanya dirancang untuk efisiensi maksimal rumah sakit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-[250px]">
          {features.map((feature, i) => {
            const isLarge = i === 0 || i === 3;
            const spanClass = isLarge ? "md:col-span-2 lg:col-span-2" : "md:col-span-1 lg:col-span-1";
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className={`h-full group ${spanClass}`}
              >
                <Card className="border border-border/60 dark:border-border/60 shadow-sm hover:shadow-[0_8px_30px_rgba(37,99,235,0.06)] dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)] transition-all duration-300 bg-surface h-full flex flex-col justify-between hover:-translate-y-1">
                  <CardContent className="p-8 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-surface-secondary group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 border border-border-subtle transition-colors duration-300 p-3 rounded-xl group-hover:scale-105 group-hover:rotate-3">
                        {feature.icon}
                      </div>
                      <span className="text-slate-200 dark:text-foreground font-bold text-3xl transition-colors group-hover:text-blue-100 dark:group-hover:text-slate-700">{feature.id}</span>
                    </div>
                    <div>
                      <h3 className={`font-black tracking-tight mb-2 tracking-tight group-hover:text-primary dark:group-hover:text-blue-400 transition-colors ${isLarge ? 'text-2xl' : 'text-lg'}`}>
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
