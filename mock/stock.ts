import { StockItem } from "@/types/stock";

export const MOCK_STOCK_DATA: StockItem[] = [
  {
    id: "item-001",
    name: "Paracetamol 500mg",
    code: "OBT-001",
    category: "Obat",
    unit: "Farmasi",
    currentStock: 125, inTransit: 0,
    minimumStock: 50,
    maximumStock: 500,
    batch: "B24081",
    expirationDate: "2027-03-12",
    supplier: "PT Kimia Farma",
    lastUpdated: "2026-09-01T08:35:00Z",
    movements: [
      { id: "mov1", date: "2026-09-01T08:35:00Z", type: "OUT", quantity: 50, description: "Distribusi ke IGD" },
      { id: "mov2", date: "2026-08-25T10:00:00Z", type: "IN", quantity: 150, description: "Penerimaan dari Supplier" },
    ],
    usageTrend: [
      { day: "Sen", usage: 12 }, { day: "Sel", usage: 15 }, { day: "Rab", usage: 18 },
      { day: "Kam", usage: 20 }, { day: "Jum", usage: 25 }, { day: "Sab", usage: 22 }, { day: "Min", usage: 28 }
    ]
  },
  {
    id: "item-002",
    name: "NaCl 0.9% 500ml",
    code: "OBT-014",
    category: "Obat",
    unit: "IGD",
    currentStock: 18, inTransit: 0,
    minimumStock: 30,
    maximumStock: 100,
    batch: "N24082",
    expirationDate: "2027-01-05",
    supplier: "PT Otsuka",
    lastUpdated: "2026-09-01T09:10:00Z",
    movements: [
      { id: "mov3", date: "2026-09-01T09:10:00Z", type: "OUT", quantity: 12, description: "Pemakaian Ruang Tindakan" },
      { id: "mov4", date: "2026-08-28T14:20:00Z", type: "IN", quantity: 30, description: "Distribusi dari Gudang Utama" },
    ],
    usageTrend: [
      { day: "Sen", usage: 5 }, { day: "Sel", usage: 8 }, { day: "Rab", usage: 7 },
      { day: "Kam", usage: 10 }, { day: "Jum", usage: 12 }, { day: "Sab", usage: 15 }, { day: "Min", usage: 10 }
    ]
  },
  {
    id: "item-003",
    name: "Set Instrumen Bedah Mayor",
    code: "CSSD-021",
    category: "Alat Steril",
    unit: "CSSD",
    currentStock: 3, inTransit: 0,
    minimumStock: 10,
    maximumStock: 20,
    batch: "CSSD2408",
    expirationDate: "2026-11-20",
    supplier: "Internal CSSD",
    lastUpdated: "2026-09-01T10:15:00Z",
    movements: [
      { id: "mov5", date: "2026-09-01T10:15:00Z", type: "OUT", quantity: 2, description: "Dipinjam IBS" },
      { id: "mov6", date: "2026-08-31T16:00:00Z", type: "IN", quantity: 5, description: "Selesai Sterilisasi" },
    ],
    usageTrend: [
      { day: "Sen", usage: 2 }, { day: "Sel", usage: 3 }, { day: "Rab", usage: 4 },
      { day: "Kam", usage: 3 }, { day: "Jum", usage: 5 }, { day: "Sab", usage: 1 }, { day: "Min", usage: 1 }
    ]
  },
  {
    id: "item-004",
    name: "Amoxicillin 500mg",
    code: "OBT-042",
    category: "Obat",
    unit: "Rawat Jalan",
    currentStock: 350, inTransit: 0,
    minimumStock: 200,
    maximumStock: 1000,
    batch: "A24099",
    expirationDate: "2026-09-15", // Expiring soon
    supplier: "PT Dexa Medica",
    lastUpdated: "2026-08-30T11:00:00Z",
    movements: [
      { id: "mov7", date: "2026-08-30T11:00:00Z", type: "OUT", quantity: 50, description: "Peresepan Pasien" }
    ],
    usageTrend: [
      { day: "Sen", usage: 30 }, { day: "Sel", usage: 45 }, { day: "Rab", usage: 40 },
      { day: "Kam", usage: 35 }, { day: "Jum", usage: 50 }, { day: "Sab", usage: 20 }, { day: "Min", usage: 10 }
    ]
  },
  {
    id: "item-005",
    name: "Infusion Set Adult",
    code: "BHP-011",
    category: "Bahan Medis Habis Pakai",
    unit: "Gudang Utama",
    currentStock: 1200, inTransit: 0,
    minimumStock: 500,
    maximumStock: 3000,
    batch: "IS2401",
    expirationDate: "2028-05-10",
    supplier: "PT OneMed",
    lastUpdated: "2026-08-25T09:00:00Z",
    movements: [
      { id: "mov8", date: "2026-08-25T09:00:00Z", type: "IN", quantity: 1000, description: "Penerimaan PO-2026-102" }
    ],
    usageTrend: [
      { day: "Sen", usage: 40 }, { day: "Sel", usage: 55 }, { day: "Rab", usage: 60 },
      { day: "Kam", usage: 50 }, { day: "Jum", usage: 70 }, { day: "Sab", usage: 65 }, { day: "Min", usage: 80 }
    ]
  },
  {
    id: "item-006",
    name: "Surgical Gloves Steril Size 7.5",
    code: "BHP-088",
    category: "Bahan Medis Habis Pakai",
    unit: "IGD",
    currentStock: 45, inTransit: 0,
    minimumStock: 100,
    maximumStock: 400,
    batch: "SG2311",
    expirationDate: "2027-11-01",
    supplier: "PT OneMed",
    lastUpdated: "2026-09-01T07:30:00Z",
    movements: [
      { id: "mov9", date: "2026-09-01T07:30:00Z", type: "OUT", quantity: 15, description: "Pemakaian Tindakan" }
    ],
    usageTrend: [
      { day: "Sen", usage: 20 }, { day: "Sel", usage: 25 }, { day: "Rab", usage: 30 },
      { day: "Kam", usage: 25 }, { day: "Jum", usage: 35 }, { day: "Sab", usage: 40 }, { day: "Min", usage: 35 }
    ]
  },
  {
    id: "item-007",
    name: "Syringe 5ml with Needle",
    code: "BHP-034",
    category: "Bahan Medis Habis Pakai",
    unit: "Rawat Inap",
    currentStock: 8, inTransit: 0,
    minimumStock: 200,
    maximumStock: 1000,
    batch: "SY2405",
    expirationDate: "2029-01-20",
    supplier: "PT Terumo",
    lastUpdated: "2026-09-01T06:00:00Z",
    movements: [
      { id: "mov10", date: "2026-09-01T06:00:00Z", type: "OUT", quantity: 42, description: "Pengambilan Darah Rutin" }
    ],
    usageTrend: [
      { day: "Sen", usage: 60 }, { day: "Sel", usage: 55 }, { day: "Rab", usage: 70 },
      { day: "Kam", usage: 65 }, { day: "Jum", usage: 80 }, { day: "Sab", usage: 75 }, { day: "Min", usage: 70 }
    ]
  },
  {
    id: "item-008",
    name: "Masker Medis 3-Ply",
    code: "BHP-099",
    category: "Bahan Medis Habis Pakai",
    unit: "Gudang Utama",
    currentStock: 5000, inTransit: 0,
    minimumStock: 2000,
    maximumStock: 10000,
    batch: "MK2408",
    expirationDate: "2028-08-01",
    supplier: "PT Sensi",
    lastUpdated: "2026-08-20T10:00:00Z",
    movements: [],
    usageTrend: []
  },
  {
    id: "item-009",
    name: "Kasa Steril 16x16",
    code: "CSSD-005",
    category: "Alat Steril",
    unit: "CSSD",
    currentStock: 250, inTransit: 0,
    minimumStock: 300, // Low stock
    maximumStock: 1000,
    batch: "KS2409",
    expirationDate: "2026-10-15",
    supplier: "Internal CSSD",
    lastUpdated: "2026-09-01T11:00:00Z",
    movements: [],
    usageTrend: []
  },
  {
    id: "item-010",
    name: "Spuit 10ml",
    code: "BHP-035",
    category: "Bahan Medis Habis Pakai",
    unit: "Rawat Inap",
    currentStock: 180, inTransit: 0,
    minimumStock: 150,
    maximumStock: 600,
    batch: "SY2406",
    expirationDate: "2025-08-10", // EXPIRED!
    supplier: "PT Terumo",
    lastUpdated: "2026-08-01T09:00:00Z",
    movements: [],
    usageTrend: []
  },
  {
    id: "item-011",
    name: "Omeprazole 20mg",
    code: "OBT-102",
    category: "Obat",
    unit: "Farmasi",
    currentStock: 800, inTransit: 0,
    minimumStock: 300,
    maximumStock: 1500,
    batch: "OM2401",
    expirationDate: "2027-05-22",
    supplier: "PT Kalbe Farma",
    lastUpdated: "2026-08-28T14:00:00Z",
    movements: [],
    usageTrend: []
  },
  {
    id: "item-012",
    name: "Alkohol Swab",
    code: "BHP-112",
    category: "Bahan Medis Habis Pakai",
    unit: "IGD",
    currentStock: 50, inTransit: 0,
    minimumStock: 500, // Critical
    maximumStock: 2000,
    batch: "AS2312",
    expirationDate: "2028-12-01",
    supplier: "PT OneMed",
    lastUpdated: "2026-09-01T12:00:00Z",
    movements: [],
    usageTrend: []
  },
  {
    id: "item-013",
    name: "Epinephrine 1mg/ml",
    code: "OBT-099",
    category: "Obat",
    unit: "IGD",
    currentStock: 12, inTransit: 0,
    minimumStock: 20, // Low
    maximumStock: 50,
    batch: "EP2402",
    expirationDate: "2026-10-01",
    supplier: "PT Dexa Medica",
    lastUpdated: "2026-08-29T08:00:00Z",
    movements: [],
    usageTrend: []
  },
  {
    id: "item-014",
    name: "Set Instrumen Partus",
    code: "CSSD-045",
    category: "Alat Steril",
    unit: "CSSD",
    currentStock: 8, inTransit: 0,
    minimumStock: 15, // Low
    maximumStock: 30,
    batch: "CSSD2408-P",
    expirationDate: "2026-11-10",
    supplier: "Internal CSSD",
    lastUpdated: "2026-09-01T09:30:00Z",
    movements: [],
    usageTrend: []
  },
  {
    id: "item-015",
    name: "IV Catheter 20G",
    code: "BHP-056",
    category: "Bahan Medis Habis Pakai",
    unit: "Rawat Inap",
    currentStock: 320, inTransit: 0,
    minimumStock: 200,
    maximumStock: 800,
    batch: "IV2407",
    expirationDate: "2029-07-15",
    supplier: "PT B. Braun",
    lastUpdated: "2026-08-31T15:00:00Z",
    movements: [],
    usageTrend: []
  }
];
