"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, suffix, isDecimal = false }: { value: number, suffix: string, isDecimal?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  
  const rounded = useTransform(count, (latest) => {
    if (isDecimal) {
      return (latest).toFixed(1);
    }
    return Math.round(latest).toString();
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { 
        duration: 2.5, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1
      });
      return () => controls.stop();
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref} className="inline-flex items-center text-primary">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

export function TrustIndicators() {
  const metrics = [
    {
      title: "Fasilitas Kesehatan Integrasi",
      desc: "Beroperasi di 15 provinsi, menekan angka stock-out farmasi kritis hingga 60% pada kuartal pertama.",
      value: 250,
      suffix: "+",
      isDecimal: false,
    },
    {
      title: "Volume Transaksi Data",
      desc: "Memproses lebih dari 1 juta pergerakan alat kesehatan dengan tingkat akurasi pencatatan mencapai 99.8%.",
      value: 1,
      suffix: "M+",
      isDecimal: false,
    },
    {
      title: "Uptime Server Sentral",
      desc: "Arsitektur cloud terdistribusi dengan standar enkripsi medis menjamin data logistik rumah sakit tersedia 24/7.",
      value: 99.9,
      suffix: "%",
      isDecimal: true,
    }
  ];

  return (
    <section className="py-20 md:py-28 border-y border-border bg-surface transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
            Skala Operasional BEKALIN
          </h2>
          <p className="text-muted-foreground font-medium text-lg">
            Dipercaya oleh institusi kesehatan terkemuka di Indonesia untuk menjaga kestabilan supply chain medis setiap detiknya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {metrics.map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                <Counter value={metric.value} suffix={metric.suffix} isDecimal={metric.isDecimal} />
              </h3>
              <h4 className="text-xl font-bold tracking-tight text-foreground mb-3">
                {metric.title}
              </h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
