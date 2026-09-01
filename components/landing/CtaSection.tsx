"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-20 md:py-24 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-blue-600 dark:bg-blue-700/50 border border-transparent dark:border-blue-600/30 rounded-3xl p-8 md:p-16 text-center max-w-5xl mx-auto shadow-[0_20px_50px_rgba(37,99,235,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-sm"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-500 dark:bg-blue-500/20 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-blue-700 dark:bg-cyan-500/20 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              Bangun Clinical Supply Chain <br className="hidden md:block" /> yang Lebih Responsif.
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed">
              Satukan visibilitas stok, koordinasi distribusi, dan pengambilan keputusan dalam satu platform yang terintegrasi.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="bg-surface text-primary hover:bg-slate-100 rounded-full px-8 h-14 text-base font-bold w-full shadow-lg hover:shadow-xl transition-all">
                  Coba Demo BEKALIN
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-blue-400 dark:border-blue-500/50 bg-transparent text-white hover:bg-blue-500 dark:hover:bg-blue-600/50 hover:text-white rounded-full px-8 h-14 text-base font-semibold w-full sm:w-auto transition-colors">
                Lihat Fitur <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
