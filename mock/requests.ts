import { LogisticsRequest } from "@/types/request";
import { MOCK_STOCK_DATA } from "@/mock/stock";

export const MOCK_REQUEST_DATA: LogisticsRequest[] = [
  {
    id: "PR-2026-015",
    unit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    createdAt: "2026-09-01T08:42:00Z",
    updatedAt: "2026-09-01T08:42:00Z",
    status: "MENUNGGU_VALIDASI",
    priority: "TINGGI",
    note: "Kebutuhan segera untuk shift malam",
    items: [
      { id: "ri-1", stockItemId: "item-001", name: "Paracetamol 500mg", category: "Obat", unitType: "Box", quantity: 10 },
      { id: "ri-2", stockItemId: "item-002", name: "NaCl 0.9% 500ml", category: "Obat", unitType: "Botol", quantity: 5, note: "Stok ruangan habis" },
    ]
  },
  {
    id: "PR-2026-014",
    unit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    createdAt: "2026-08-31T15:30:00Z",
    updatedAt: "2026-08-31T16:00:00Z",
    status: "DIPROSES",
    priority: "KRITIS",
    note: "Permintaan cito (segera)",
    items: [
      { id: "ri-3", stockItemId: "item-013", name: "Epinephrine 1mg/ml", category: "Obat", unitType: "Ampul", quantity: 20 },
      { id: "ri-4", stockItemId: "item-012", name: "Alkohol Swab", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 5 },
    ]
  },
  {
    id: "PR-2026-013",
    unit: "Rawat Jalan",
    requesterName: "Perawat Poliklinik",
    createdAt: "2026-08-31T10:00:00Z",
    updatedAt: "2026-08-31T10:15:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-5", stockItemId: "item-004", name: "Amoxicillin 500mg", category: "Obat", unitType: "Strip", quantity: 50 },
    ]
  },
  {
    id: "PR-2026-012",
    unit: "Rawat Inap",
    requesterName: "Kepala Ruangan Teratai",
    createdAt: "2026-08-30T09:00:00Z",
    updatedAt: "2026-08-30T14:00:00Z",
    status: "DALAM_PENGIRIMAN",
    priority: "NORMAL",
    items: [
      { id: "ri-6", stockItemId: "item-007", name: "Syringe 5ml with Needle", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 20 },
      { id: "ri-7", stockItemId: "item-015", name: "IV Catheter 20G", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 10 },
    ]
  },
  {
    id: "PR-2026-011",
    unit: "CSSD",
    requesterName: "Petugas CSSD",
    createdAt: "2026-08-29T11:00:00Z",
    updatedAt: "2026-08-29T11:30:00Z",
    status: "MENUNGGU_PERSETUJUAN",
    priority: "TINGGI",
    note: "Untuk persiapan operasi besok",
    items: [
      { id: "ri-8", stockItemId: "item-009", name: "Kasa Steril 16x16", category: "Alat Steril", unitType: "Pack", quantity: 100 },
    ]
  },
  {
    id: "PR-2026-010",
    unit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    createdAt: "2026-08-28T13:00:00Z",
    updatedAt: "2026-08-28T14:30:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-9", stockItemId: "item-006", name: "Surgical Gloves Steril Size 7.5", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 30 },
    ]
  },
  {
    id: "PR-2026-009",
    unit: "Farmasi",
    requesterName: "Apoteker Jaga",
    createdAt: "2026-08-28T08:00:00Z",
    updatedAt: "2026-08-28T10:00:00Z",
    status: "DITOLAK",
    priority: "RENDAH",
    note: "Stok masih tersedia di depo lain",
    items: [
      { id: "ri-10", stockItemId: "item-011", name: "Omeprazole 20mg", category: "Obat", unitType: "Box", quantity: 50 },
    ]
  },
  {
    id: "PR-2026-008",
    unit: "Rawat Jalan",
    requesterName: "Perawat Poliklinik",
    createdAt: "2026-08-27T09:15:00Z",
    updatedAt: "2026-08-27T09:15:00Z",
    status: "DIBATALKAN",
    priority: "NORMAL",
    note: "Salah input jumlah",
    items: [
      { id: "ri-11", stockItemId: "item-008", name: "Masker Medis 3-Ply", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 5 },
    ]
  },
  {
    id: "PR-2026-007",
    unit: "CSSD",
    requesterName: "Petugas CSSD",
    createdAt: "2026-08-27T14:00:00Z",
    updatedAt: "2026-08-27T15:00:00Z",
    status: "DISETUJUI",
    priority: "TINGGI",
    items: [
      { id: "ri-12", stockItemId: "item-003", name: "Set Instrumen Bedah Mayor", category: "Alat Steril", unitType: "Set", quantity: 2 },
    ]
  },
  {
    id: "PR-2026-006",
    unit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    createdAt: "2026-08-26T20:00:00Z",
    updatedAt: "2026-08-26T21:00:00Z",
    status: "SELESAI",
    priority: "KRITIS",
    items: [
      { id: "ri-13", stockItemId: "item-013", name: "Epinephrine 1mg/ml", category: "Obat", unitType: "Ampul", quantity: 15 },
    ]
  },
  {
    id: "PR-2026-005",
    unit: "Rawat Inap",
    requesterName: "Kepala Ruangan Melati",
    createdAt: "2026-08-26T08:00:00Z",
    updatedAt: "2026-08-26T08:00:00Z",
    status: "DRAFT",
    priority: "RENDAH",
    items: [
      { id: "ri-14", stockItemId: "item-010", name: "Spuit 10ml", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 5 },
    ]
  },
  {
    id: "PR-2026-004",
    unit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    createdAt: "2026-08-25T14:00:00Z",
    updatedAt: "2026-08-25T16:30:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-15", stockItemId: "item-001", name: "Paracetamol 500mg", category: "Obat", unitType: "Box", quantity: 15 },
      { id: "ri-16", stockItemId: "item-002", name: "NaCl 0.9% 500ml", category: "Obat", unitType: "Botol", quantity: 20 },
    ]
  },
  {
    id: "PR-2026-003",
    unit: "Farmasi",
    requesterName: "Apoteker Jaga",
    createdAt: "2026-08-24T09:00:00Z",
    updatedAt: "2026-08-24T11:00:00Z",
    status: "SELESAI",
    priority: "TINGGI",
    items: [
      { id: "ri-17", stockItemId: "item-004", name: "Amoxicillin 500mg", category: "Obat", unitType: "Strip", quantity: 100 },
    ]
  },
  {
    id: "PR-2026-002",
    unit: "Rawat Inap",
    requesterName: "Kepala Ruangan Anggrek",
    createdAt: "2026-08-23T10:00:00Z",
    updatedAt: "2026-08-23T11:30:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-18", stockItemId: "item-015", name: "IV Catheter 20G", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 10 },
      { id: "ri-19", stockItemId: "item-008", name: "Masker Medis 3-Ply", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 50 },
    ]
  },
  {
    id: "PR-2026-001",
    unit: "CSSD",
    requesterName: "Petugas CSSD",
    createdAt: "2026-08-22T08:00:00Z",
    updatedAt: "2026-08-22T10:00:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-20", stockItemId: "item-014", name: "Set Instrumen Partus", category: "Alat Steril", unitType: "Set", quantity: 5 },
    ]
  }
];
