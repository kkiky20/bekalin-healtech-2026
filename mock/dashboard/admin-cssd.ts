import { DashboardMetric, DashboardAlert, DashboardQueueItem, DashboardActivity, ChartDataPoint } from "@/types/dashboard";

export const cssdMetrics: DashboardMetric[] = [
  {
    id: "m1",
    title: "ALAT TERSEDIA",
    value: "94%",
    subtitle: "Instrumen steril siap pakai",
    status: "success"
  },
  {
    id: "m2",
    title: "PROSES STERILISASI",
    value: "18",
    subtitle: "Set instrumen dalam mesin",
    status: "warning"
  },
  {
    id: "m3",
    title: "PERMINTAAN PRIORITAS",
    value: "5",
    subtitle: "Kebutuhan operasi urgen",
    status: "critical"
  },
  {
    id: "m4",
    title: "DISTRIBUSI AKTIF",
    value: "7",
    subtitle: "Sedang dikirim ke unit",
    status: "info"
  }
];

export const cssdChartData: ChartDataPoint[] = [
  { name: "Tersedia", value: 450 },
  { name: "Dalam Sterilisasi", value: 85 },
  { name: "Dipinjam", value: 120 },
  { name: "Perlu Maintenance", value: 12 },
];

export const cssdAlerts: DashboardAlert[] = [
  {
    id: "a1",
    title: "Dalam Sterilisasi",
    description: "Set Instrumen Bedah — 3 set sedang diproses.",
    status: "warning",
    time: "10 mnt lalu"
  },
  {
    id: "a2",
    title: "Prioritas Permintaan",
    description: "Permintaan IGD — 2 set membutuhkan prioritas segera.",
    status: "critical",
    time: "20 mnt lalu"
  },
  {
    id: "a3",
    title: "Distribusi Berjalan",
    description: "Distribusi CSSD-2026-08 sedang dalam perjalanan.",
    status: "info",
    time: "45 mnt lalu"
  }
];

export const cssdActivities: DashboardActivity[] = [
  {
    id: "act1",
    time: "09:15",
    description: "Siklus Autoclave #04 selesai",
    unit: "Ruang Steril"
  },
  {
    id: "act2",
    time: "08:50",
    description: "Set Bedah Mayor dipinjam",
    unit: "IBS (Kamar Operasi)"
  },
  {
    id: "act3",
    time: "08:10",
    description: "Penerimaan instrumen kotor",
    unit: "Ruang Dekontaminasi"
  }
];
