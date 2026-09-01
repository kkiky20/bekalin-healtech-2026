import { DashboardMetric, DashboardQueueItem, DashboardActivity } from "@/types/dashboard";

export const perawatMetrics: DashboardMetric[] = [
  {
    id: "m1",
    title: "PERMINTAAN AKTIF",
    value: "6",
    subtitle: "Total request berjalan",
    status: "info"
  },
  {
    id: "m2",
    title: "MENUNGGU PERSETUJUAN",
    value: "2",
    subtitle: "Menunggu validasi gudang",
    status: "warning"
  },
  {
    id: "m3",
    title: "DIPROSES",
    value: "3",
    subtitle: "Sedang disiapkan",
    status: "info"
  },
  {
    id: "m4",
    title: "SELESAI",
    value: "18",
    subtitle: "Permintaan selesai bulan ini",
    status: "success"
  }
];

export const perawatRequests: DashboardQueueItem[] = [
  {
    id: "PR-2026-014",
    itemName: "Permintaan Rutin Mingguan",
    category: "5 item",
    currentStock: "1 Sep 2026", // repurposing field for date in generic table
    statusText: "Menunggu Persetujuan",
    statusColor: "warning",
    actionHref: "/permintaan"
  },
  {
    id: "PR-2026-013",
    itemName: "Permintaan Cito IGD",
    category: "3 item",
    currentStock: "31 Agu 2026",
    statusText: "Diproses",
    statusColor: "info",
    actionHref: "/permintaan"
  },
  {
    id: "PR-2026-010",
    itemName: "Permintaan Alat Steril",
    category: "8 item",
    currentStock: "30 Agu 2026",
    statusText: "Selesai",
    statusColor: "success",
    actionHref: "/permintaan"
  }
];

export const perawatActivities: DashboardActivity[] = [
  {
    id: "act1",
    time: "Hari Ini, 08:42",
    description: "Anda membuat permintaan PR-2026-014",
    unit: "IGD"
  },
  {
    id: "act2",
    time: "Kemarin, 14:30",
    description: "Permintaan PR-2026-013 mulai diproses",
    unit: "Gudang Utama"
  },
  {
    id: "act3",
    time: "30 Agu, 09:15",
    description: "Menerima barang dari permintaan PR-2026-010",
    unit: "IGD"
  }
];
