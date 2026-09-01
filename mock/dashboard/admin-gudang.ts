import { DashboardMetric, DashboardAlert, DashboardQueueItem, DashboardActivity, ChartDataPoint } from "@/types/dashboard";

export const gudangMetrics: DashboardMetric[] = [
  {
    id: "m1",
    title: "STOK AMAN",
    value: "87%",
    subtitle: "Persediaan dalam batas aman",
    status: "success"
  },
  {
    id: "m2",
    title: "STOK MENIPIS",
    value: "12%",
    subtitle: "Memerlukan perhatian",
    status: "warning"
  },
  {
    id: "m3",
    title: "STOK KRITIS",
    value: "3 Item",
    subtitle: "Di bawah batas minimum",
    status: "critical"
  },
  {
    id: "m4",
    title: "PERMINTAAN MASUK",
    value: "64",
    subtitle: "Permintaan aktif",
    status: "info"
  }
];

export const gudangChartData: ChartDataPoint[] = [
  { time: "08:00", demand: 32, available: 82 },
  { time: "10:00", demand: 38, available: 76 },
  { time: "12:00", demand: 45, available: 70 },
  { time: "14:00", demand: 58, available: 61 },
  { time: "16:00", demand: 64, available: 54 },
];

export const gudangAlerts: DashboardAlert[] = [
  {
    id: "a1",
    title: "Stok Kritis",
    description: "3 item mencapai batas kritis.",
    status: "critical",
    time: "Baru saja"
  },
  {
    id: "a2",
    title: "Stok Menipis",
    description: "7 item mendekati batas minimum.",
    status: "warning",
    time: "15 mnt lalu"
  },
  {
    id: "a3",
    title: "Permintaan Pending",
    description: "12 permintaan menunggu validasi.",
    status: "info",
    time: "1 jam lalu"
  },
  {
    id: "a4",
    title: "Pengiriman Tiba",
    description: "4 pengiriman dari supplier tiba.",
    status: "success",
    time: "2 jam lalu"
  }
];

export const gudangQueue: DashboardQueueItem[] = [
  {
    id: "q1",
    itemName: "Paracetamol 500mg",
    category: "Farmasi",
    currentStock: 5,
    usageRate: "20/hari",
    prediction: "< 3 jam",
    statusText: "Kritis",
    statusColor: "critical",
    actionHref: "/monitoring-stok"
  },
  {
    id: "q2",
    itemName: "NaCl 0.9% 500ml",
    category: "Farmasi",
    currentStock: 8,
    usageRate: "15/hari",
    prediction: "< 6 jam",
    statusText: "Kritis",
    statusColor: "critical",
    actionHref: "/monitoring-stok"
  },
  {
    id: "q3",
    itemName: "Sarung Tangan Non-Steril",
    category: "Consumable",
    currentStock: 120,
    usageRate: "300/hari",
    prediction: "< 12 jam",
    statusText: "Menipis",
    statusColor: "warning",
    actionHref: "/monitoring-stok"
  }
];

export const gudangActivities: DashboardActivity[] = [
  {
    id: "act1",
    time: "08:42",
    description: "Permintaan PR-2026-014 dibuat",
    unit: "IGD"
  },
  {
    id: "act2",
    time: "08:35",
    description: "Stok Paracetamol berubah (-50)",
    unit: "Farmasi"
  },
  {
    id: "act3",
    time: "08:20",
    description: "Distribusi LOG-2026-008 selesai",
    unit: "Rawat Jalan"
  }
];
