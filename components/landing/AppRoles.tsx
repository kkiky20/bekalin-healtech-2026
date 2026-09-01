"use client";

import { motion } from "framer-motion";
import { Package, ShieldPlus, Stethoscope, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AppRoles() {
  const roles = [
    {
      id: "GUDANG",
      icon: <Package className="w-8 h-8 text-blue-500" />,
      title: "Admin Gudang",
      desc: "Mengelola persediaan logistik utama, memvalidasi distribusi, dan memastikan ketersediaan barang medis selalu di ambang aman.",
      color: "bg-blue-500/10 border-blue-500/20",
      accent: "group-hover:bg-blue-500"
    },
    {
      id: "CSSD",
      icon: <ShieldPlus className="w-8 h-8 text-emerald-500" />,
      title: "Admin CSSD",
      desc: "Melacak siklus sterilisasi alat kesehatan, memantau instrumen bedah, dan menentukan prioritas distribusi ke ruang operasi.",
      color: "bg-emerald-500/10 border-emerald-500/20",
      accent: "group-hover:bg-emerald-500"
    },
    {
      id: "PERAWAT",
      icon: <Stethoscope className="w-8 h-8 text-rose-500" />,
      title: "Perawat Unit",
      desc: "Mengajukan permintaan logistik harian dengan mudah, memantau status pengiriman, tanpa harus meninggalkan fokus pada pasien.",
      color: "bg-rose-500/10 border-rose-500/20",
      accent: "group-hover:bg-rose-500"
    },
    {
      id: "MANAJER",
      icon: <LineChart className="w-8 h-8 text-amber-500" />,
      title: "Manajer Operasional",
      desc: "Akses ke analitik komprehensif untuk mengevaluasi kinerja supply chain dan mengambil keputusan strategis berbasis data aktual.",
      color: "bg-amber-500/10 border-amber-500/20",
      accent: "group-hover:bg-amber-500"
    }
  ];

  return (
    <section className="py-24 bg-surface-secondary border-y border-border transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter mb-4">
              Satu Sistem, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Multiperan Terintegrasi.</span>
            </h2>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed">
              Arsitektur aplikasi BEKALIN dirancang secara spesifik untuk memfasilitasi alur kerja 4 pilar utama di rumah sakit tanpa hambatan komunikasi.
            </p>
          </div>
          <Link href="/login">
            <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-border font-bold text-foreground hover:bg-background transition-colors hover:shadow-sm">
              Coba Modul Real <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group cursor-default"
            >
              <div className="h-full p-8 rounded-3xl bg-surface border border-border shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-transform duration-300 group-hover:scale-110 ${role.color}`}>
                    {role.icon}
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight">
                    {role.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-8">
                    {role.desc}
                  </p>
                </div>
                
                <div className="relative overflow-hidden h-1 w-full bg-border rounded-full">
                  <div className={`absolute top-0 left-0 h-full w-0 transition-all duration-500 ease-out ${role.accent} group-hover:w-full`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
