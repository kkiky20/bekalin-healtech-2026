import { DashboardMetric, DashboardQueueItem, ChartDataPoint } from "@/types/dashboard";

export const manajerMetrics: DashboardMetric[] = [
  {
    id: "m1",
    title: "AVAILABILITY",
    value: "99.9%",
    subtitle: "Rata-rata ketersediaan stok",
    status: "success"
  },
  {
    id: "m2",
    title: "FULFILLMENT",
    value: "94%",
    subtitle: "Tingkat pemenuhan permintaan",
    status: "success"
  },
  {
    id: "m3",
    title: "PERMINTAAN",
    value: "128",
    subtitle: "Total request periode ini",
    status: "info"
  },
  {
    id: "m4",
    title: "DISTRIBUSI SELESAI",
    value: "96%",
    subtitle: "Tepat waktu (On-time Delivery)",
    status: "success"
  }
];

export const manajerChartData: ChartDataPoint[] = [
  { date: "25 Agu", availability: 99.5, fulfillment: 92, distribution: 95 },
  { date: "26 Agu", availability: 99.7, fulfillment: 93, distribution: 96 },
  { date: "27 Agu", availability: 99.6, fulfillment: 91, distribution: 94 },
  { date: "28 Agu", availability: 99.8, fulfillment: 94, distribution: 97 },
  { date: "29 Agu", availability: 99.9, fulfillment: 95, distribution: 96 },
  { date: "30 Agu", availability: 99.9, fulfillment: 94, distribution: 96 },
  { date: "31 Agu", availability: 99.9, fulfillment: 94, distribution: 96 },
];

export const manajerIssues: DashboardQueueItem[] = [
  {
    id: "i1",
    itemName: "Stok kritis di unit operasional",
    category: "IGD",
    currentStock: "3 item",
    statusText: "Kritis",
    statusColor: "critical",
    actionHref: "/manajemen"
  },
  {
    id: "i2",
    itemName: "Permintaan tertunda lebih dari SLA",
    category: "Rawat Jalan",
    currentStock: "5 request",
    statusText: "Warning",
    statusColor: "warning",
    actionHref: "/manajemen"
  },
  {
    id: "i3",
    itemName: "Keterlambatan alur distribusi",
    category: "CSSD",
    currentStock: "2 shipment",
    statusText: "Warning",
    statusColor: "warning",
    actionHref: "/manajemen"
  },
  {
    id: "i4",
    itemName: "Risiko stock-out dalam 24 jam",
    category: "Farmasi",
    currentStock: "4 item",
    statusText: "Kritis",
    statusColor: "critical",
    actionHref: "/manajemen"
  }
];

export const manajerInsights = [
  "3 unit mengalami peningkatan kebutuhan logistik dalam 7 hari terakhir.",
  "5 item memiliki risiko stock-out jika pola penggunaan saat ini berlanjut.",
  "Efisiensi rute distribusi meningkat 12% sejak optimasi jadwal pengiriman shift pagi."
];

export const manajerSummary = {
  totalPermintaan: 128,
  dipenuhi: 120,
  pending: 8,
  avgTime: "2,4 jam",
  redistribusi: 18
};
