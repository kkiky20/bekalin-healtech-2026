"use client";

import { motion } from "framer-motion";
import { Activity, Bell, Search, LayoutGrid, Package, ArrowRightLeft, ListOrdered, BarChart2 } from "lucide-react";

export function ProductShowcase() {
  return (
    <section className="py-20 md:py-32 bg-surface overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Kelola Clinical Supply Chain <br className="hidden md:block" /> dari Satu Sistem.
          </h2>
          <p className="text-xl text-muted-foreground">
            Interface yang intuitif dan profesional, dirancang khusus untuk memenuhi kompleksitas manajemen rumah sakit modern.
          </p>
        </div>

        {/* Browser Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative max-w-5xl mx-auto rounded-2xl border border-border bg-background shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
        >
          {/* Header Mockup */}
          <div className="bg-surface-secondary/50 border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400 dark:bg-emerald-500/80"></div>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-md px-32 py-1.5 text-xs text-muted-foreground hidden md:flex items-center gap-2 shadow-sm">
              <Activity className="h-3 w-3 text-blue-500" />
              dashboard.bekalin.id
            </div>
            <div className="w-20"></div> {/* Spacer for balance */}
          </div>

          {/* App UI Mockup */}
          <div className="flex h-[400px] md:h-[600px] bg-background/50">
            {/* Sidebar */}
            <div className="w-16 md:w-64 border-r border-border bg-surface hidden sm:flex flex-col">
              <div className="p-4 md:p-6 border-b border-border-subtle flex items-center gap-3">
                <div className="bg-blue-600 text-white p-2 rounded-lg shadow-[0_0_10px_rgba(37,99,235,0.3)]"><Activity className="h-5 w-5" /></div>
                <span className="font-bold text-lg text-foreground hidden md:block tracking-tight">BEKALIN</span>
              </div>
              <div className="p-3 flex-1">
                <div className="space-y-1">
                  {[
                    { icon: <LayoutGrid className="h-5 w-5" />, label: "Dashboard", active: true },
                    { icon: <Package className="h-5 w-5" />, label: "Persediaan", active: false },
                    { icon: <ListOrdered className="h-5 w-5" />, label: "Permintaan", active: false },
                    { icon: <ArrowRightLeft className="h-5 w-5" />, label: "Redistribusi", active: false },
                    { icon: <BarChart2 className="h-5 w-5" />, label: "Analitik", active: false },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-blue-50 dark:bg-blue-500/10 text-primary font-medium border border-blue-100 dark:border-blue-500/20' : 'text-muted-foreground hover:bg-background dark:hover:bg-slate-800 hover:text-foreground dark:hover:text-slate-200 border border-transparent'}`}>
                      {item.icon}
                      <span className="text-sm hidden md:block">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Topbar */}
              <div className="h-16 bg-surface border-b border-border flex items-center justify-between px-6">
                <h3 className="font-semibold text-foreground">Dashboard Gudang Utama</h3>
                <div className="flex items-center gap-4">
                  <div className="relative hidden md:block">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="Cari batch, supplier..." className="pl-9 pr-4 py-1.5 bg-background border border-border rounded-lg text-sm w-64 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-muted-foreground text-foreground" disabled />
                  </div>
                  <div className="relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></span>
                  </div>
                  <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/40 text-primary rounded-full flex items-center justify-center text-xs font-bold border border-blue-200 dark:border-blue-800">
                    AG
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { title: "Stok Aman", value: "87%", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/10" },
                    { title: "Waspada", value: "12%", color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/10" },
                    { title: "Bahaya (Kritis)", value: "3", suffix: " item", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/10", alert: true },
                    { title: "Permintaan Masuk", value: "64", color: "text-foreground", bg: "bg-blue-50 dark:bg-blue-900/10" },
                  ].map((kpi, i) => (
                    <div key={i} className={`bg-surface p-4 rounded-xl border border-border shadow-sm ${kpi.alert ? 'border-red-200 dark:border-red-500/30 ring-1 ring-red-100 dark:ring-red-500/20' : ''}`}>
                      <p className="text-xs font-medium text-muted-foreground mb-2">{kpi.title}</p>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</span>
                        {kpi.suffix && <span className="text-xs text-muted-foreground font-medium">{kpi.suffix}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Widgets */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-surface border border-border rounded-xl p-5 shadow-sm h-64 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-foreground text-sm">Visual Supply Dashboard</h4>
                      <div className="flex gap-2">
                        <div className="w-16 h-2 bg-muted rounded"></div>
                        <div className="w-16 h-2 bg-muted rounded"></div>
                      </div>
                    </div>
                    {/* Mock Chart Area */}
                    <div className="flex-1 relative w-full mt-4">
                      {/* Fake lines and points */}
                      <div className="absolute inset-0 flex flex-col justify-between">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-full h-px bg-muted/50"></div>
                        ))}
                      </div>
                      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0,50 Q25,30 50,40 T100,20" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                        <path d="M0,80 Q30,70 60,85 T100,60" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  <div className="bg-surface border border-border rounded-xl p-5 shadow-sm h-64 flex flex-col">
                    <h4 className="font-semibold text-foreground text-sm mb-4">Traffic Light Alert</h4>
                    <div className="space-y-4 flex-1">
                      {[
                        { label: "Stok Kritis Parenteral", desc: "Bagian Laktat & NaCl", color: "bg-red-500", count: 3 },
                        { label: "Stok Menipis", desc: "Ringer Laktat Sbox", color: "bg-amber-400", count: 8 },
                        { label: "Permintaan Pending", desc: "Menunggu validasi", color: "bg-blue-500", count: 12 },
                      ].map((alert, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 ${alert.color}`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{alert.label}</p>
                            <p className="text-[10px] text-muted-foreground">{alert.desc}</p>
                          </div>
                          <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${alert.color === 'bg-red-500' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' : 'bg-slate-100 text-muted-foreground dark:bg-slate-800 '}`}>
                            {alert.count}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
