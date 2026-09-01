import { StockItem } from "@/types/stock";

export const MOCK_STOCK_DATA: StockItem[] = [
  {
    id: "item-001",
    name: "Paracetamol 500mg",
    code: "OBT-001",
    category: "Obat",
    unit: "Farmasi",
    currentStock: 125,
    inTransit: 0,
    minimumStock: 50,
    maximumStock: 500,
    batch: "B24081",
    expirationDate: "2027-03-12",
    supplier: "PT Kimia Farma",
    lastUpdated: "2026-09-01T08:35:00Z",
    movements: [
      { id: "mov1", date: "2026-09-01T08:35:00Z", type: "OUT", quantity: 50, description: "Distribusi ke IGD" },
      { id: "mov2", date: "2026-08-25T10:00:00Z", type: "IN", quantity: 150, description: "Penerimaan dari Supplier" }
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
    currentStock: 18,
    inTransit: 0,
    minimumStock: 30,
    maximumStock: 100,
    batch: "N24082",
    expirationDate: "2027-01-05",
    supplier: "PT Otsuka",
    lastUpdated: "2026-09-01T09:10:00Z",
    movements: [
      { id: "mov3", date: "2026-09-01T09:10:00Z", type: "OUT", quantity: 12, description: "Pemakaian Ruang Tindakan" },
      { id: "mov4", date: "2026-08-28T14:20:00Z", type: "IN", quantity: 30, description: "Distribusi dari Gudang Utama" }
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
    currentStock: 3,
    inTransit: 0,
    minimumStock: 10,
    maximumStock: 20,
    batch: "CSSD2408",
    expirationDate: "2026-11-20",
    supplier: "Internal CSSD",
    lastUpdated: "2026-09-01T10:15:00Z",
    movements: [
      { id: "mov5", date: "2026-09-01T10:15:00Z", type: "OUT", quantity: 2, description: "Dipinjam IBS" },
      { id: "mov6", date: "2026-08-31T16:00:00Z", type: "IN", quantity: 5, description: "Selesai Sterilisasi" }
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
    currentStock: 350,
    inTransit: 0,
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
    currentStock: 1200,
    inTransit: 0,
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
    currentStock: 45,
    inTransit: 0,
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
    currentStock: 8,
    inTransit: 0,
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
    currentStock: 5000,
    inTransit: 0,
    minimumStock: 2000,
    maximumStock: 10000,
    batch: "MK2408",
    expirationDate: "2028-08-01",
    supplier: "PT Sensi",
    lastUpdated: "2026-08-20T10:00:00Z",
    movements: [
      { id: "mov11", date: "2026-08-20T10:00:00Z", type: "IN", quantity: 2000, description: "Penerimaan Stok Pusat" }
    ],
    usageTrend: [
      { day: "Sen", usage: 150 }, { day: "Sel", usage: 180 }, { day: "Rab", usage: 200 },
      { day: "Kam", usage: 175 }, { day: "Jum", usage: 210 }, { day: "Sab", usage: 190 }, { day: "Min", usage: 160 }
    ]
  },
  {
    id: "item-009",
    name: "Kasa Steril 16x16",
    code: "CSSD-005",
    category: "Alat Steril",
    unit: "CSSD",
    currentStock: 250,
    inTransit: 0,
    minimumStock: 300,
    maximumStock: 1000,
    batch: "KS2409",
    expirationDate: "2026-10-15",
    supplier: "Internal CSSD",
    lastUpdated: "2026-09-01T11:00:00Z",
    movements: [
      { id: "mov12", date: "2026-09-01T11:00:00Z", type: "OUT", quantity: 50, description: "Distribusi Kamar Operasi" }
    ],
    usageTrend: [
      { day: "Sen", usage: 35 }, { day: "Sel", usage: 40 }, { day: "Rab", usage: 45 },
      { day: "Kam", usage: 50 }, { day: "Jum", usage: 60 }, { day: "Sab", usage: 30 }, { day: "Min", usage: 25 }
    ]
  },
  {
    id: "item-010",
    name: "Spuit 10ml",
    code: "BHP-035",
    category: "Bahan Medis Habis Pakai",
    unit: "Rawat Inap",
    currentStock: 180,
    inTransit: 0,
    minimumStock: 150,
    maximumStock: 600,
    batch: "SY2406",
    expirationDate: "2025-08-10", // EXPIRED
    supplier: "PT Terumo",
    lastUpdated: "2026-08-01T09:00:00Z",
    movements: [
      { id: "mov13", date: "2026-08-01T09:00:00Z", type: "OUT", quantity: 20, description: "Pemakaian Injeksi Pasien" }
    ],
    usageTrend: [
      { day: "Sen", usage: 25 }, { day: "Sel", usage: 30 }, { day: "Rab", usage: 28 },
      { day: "Kam", usage: 35 }, { day: "Jum", usage: 40 }, { day: "Sab", usage: 30 }, { day: "Min", usage: 22 }
    ]
  },
  {
    id: "item-011",
    name: "Omeprazole 20mg",
    code: "OBT-102",
    category: "Obat",
    unit: "Farmasi",
    currentStock: 800,
    inTransit: 0,
    minimumStock: 300,
    maximumStock: 1500,
    batch: "OM2401",
    expirationDate: "2027-05-22",
    supplier: "PT Kalbe Farma",
    lastUpdated: "2026-08-28T14:00:00Z",
    movements: [
      { id: "mov14", date: "2026-08-28T14:00:00Z", type: "IN", quantity: 500, description: "Restock Bulanan" }
    ],
    usageTrend: [
      { day: "Sen", usage: 45 }, { day: "Sel", usage: 50 }, { day: "Rab", usage: 48 },
      { day: "Kam", usage: 55 }, { day: "Jum", usage: 60 }, { day: "Sab", usage: 40 }, { day: "Min", usage: 35 }
    ]
  },
  {
    id: "item-012",
    name: "Alkohol Swab",
    code: "BHP-112",
    category: "Bahan Medis Habis Pakai",
    unit: "IGD",
    currentStock: 50,
    inTransit: 0,
    minimumStock: 500,
    maximumStock: 2000,
    batch: "AS2312",
    expirationDate: "2028-12-01",
    supplier: "PT OneMed",
    lastUpdated: "2026-09-01T12:00:00Z",
    movements: [
      { id: "mov15", date: "2026-09-01T12:00:00Z", type: "OUT", quantity: 50, description: "Pemakaian IGD Shift Pagi" }
    ],
    usageTrend: [
      { day: "Sen", usage: 80 }, { day: "Sel", usage: 90 }, { day: "Rab", usage: 85 },
      { day: "Kam", usage: 100 }, { day: "Jum", usage: 110 }, { day: "Sab", usage: 95 }, { day: "Min", usage: 90 }
    ]
  },
  {
    id: "item-013",
    name: "Epinephrine 1mg/ml",
    code: "OBT-099",
    category: "Obat",
    unit: "IGD",
    currentStock: 12,
    inTransit: 0,
    minimumStock: 20,
    maximumStock: 50,
    batch: "EP2402",
    expirationDate: "2026-10-01",
    supplier: "PT Dexa Medica",
    lastUpdated: "2026-08-29T08:00:00Z",
    movements: [
      { id: "mov16", date: "2026-08-29T08:00:00Z", type: "OUT", quantity: 5, description: "Resusitasi Pasien Kritis" }
    ],
    usageTrend: [
      { day: "Sen", usage: 2 }, { day: "Sel", usage: 4 }, { day: "Rab", usage: 1 },
      { day: "Kam", usage: 3 }, { day: "Jum", usage: 5 }, { day: "Sab", usage: 6 }, { day: "Min", usage: 2 }
    ]
  },
  {
    id: "item-014",
    name: "Set Instrumen Partus",
    code: "CSSD-045",
    category: "Alat Steril",
    unit: "CSSD",
    currentStock: 8,
    inTransit: 0,
    minimumStock: 15,
    maximumStock: 30,
    batch: "CSSD2408-P",
    expirationDate: "2026-11-10",
    supplier: "Internal CSSD",
    lastUpdated: "2026-09-01T09:30:00Z",
    movements: [
      { id: "mov17", date: "2026-09-01T09:30:00Z", type: "OUT", quantity: 3, description: "Distribusi VK Bersalin" }
    ],
    usageTrend: [
      { day: "Sen", usage: 3 }, { day: "Sel", usage: 4 }, { day: "Rab", usage: 2 },
      { day: "Kam", usage: 5 }, { day: "Jum", usage: 4 }, { day: "Sab", usage: 6 }, { day: "Min", usage: 3 }
    ]
  },
  {
    id: "item-015",
    name: "IV Catheter 20G",
    code: "BHP-056",
    category: "Bahan Medis Habis Pakai",
    unit: "Rawat Inap",
    currentStock: 320,
    inTransit: 0,
    minimumStock: 200,
    maximumStock: 800,
    batch: "IV2407",
    expirationDate: "2029-07-15",
    supplier: "PT B. Braun",
    lastUpdated: "2026-08-31T15:00:00Z",
    movements: [
      { id: "mov18", date: "2026-08-31T15:00:00Z", type: "OUT", quantity: 30, description: "Pemasangan Infus Pasien Baru" }
    ],
    usageTrend: [
      { day: "Sen", usage: 25 }, { day: "Sel", usage: 30 }, { day: "Rab", usage: 28 },
      { day: "Kam", usage: 35 }, { day: "Jum", usage: 40 }, { day: "Sab", usage: 32 }, { day: "Min", usage: 28 }
    ]
  },
  {
    id: "item-016",
    name: "Cefotaxime 1g Injeksi",
    code: "OBT-055",
    category: "Obat",
    unit: "ICU",
    currentStock: 35,
    inTransit: 0,
    minimumStock: 30,
    maximumStock: 150,
    batch: "CF2411",
    expirationDate: "2027-04-18",
    supplier: "PT Dexa Medica",
    lastUpdated: "2026-09-01T07:00:00Z",
    movements: [
      { id: "mov19", date: "2026-09-01T07:00:00Z", type: "OUT", quantity: 10, description: "Terapi Antibiotik Pasien ICU" }
    ],
    usageTrend: [
      { day: "Sen", usage: 6 }, { day: "Sel", usage: 8 }, { day: "Rab", usage: 7 },
      { day: "Kam", usage: 9 }, { day: "Jum", usage: 10 }, { day: "Sab", usage: 8 }, { day: "Min", usage: 7 }
    ]
  },
  {
    id: "item-017",
    name: "Set Instrumen Kuretase",
    code: "CSSD-032",
    category: "Alat Steril",
    unit: "CSSD",
    currentStock: 5,
    inTransit: 0,
    minimumStock: 8,
    maximumStock: 15,
    batch: "CSSD2409-K",
    expirationDate: "2026-10-25",
    supplier: "Internal CSSD",
    lastUpdated: "2026-08-30T16:00:00Z",
    movements: [
      { id: "mov20", date: "2026-08-30T16:00:00Z", type: "OUT", quantity: 2, description: "Tindakan Kebidanan" }
    ],
    usageTrend: [
      { day: "Sen", usage: 1 }, { day: "Sel", usage: 2 }, { day: "Rab", usage: 1 },
      { day: "Kam", usage: 3 }, { day: "Jum", usage: 2 }, { day: "Sab", usage: 1 }, { day: "Min", usage: 2 }
    ]
  },
  {
    id: "item-018",
    name: "Plester Micropore 1 inch",
    code: "BHP-067",
    category: "Bahan Medis Habis Pakai",
    unit: "Rawat Jalan",
    currentStock: 40,
    inTransit: 0,
    minimumStock: 30,
    maximumStock: 120,
    batch: "MP2403",
    expirationDate: "2028-02-14",
    supplier: "PT 3M Indonesia",
    lastUpdated: "2026-08-31T11:20:00Z",
    movements: [
      { id: "mov21", date: "2026-08-31T11:20:00Z", type: "OUT", quantity: 10, description: "Fiksasi Balutan Poli Bedah" }
    ],
    usageTrend: [
      { day: "Sen", usage: 8 }, { day: "Sel", usage: 10 }, { day: "Rab", usage: 12 },
      { day: "Kam", usage: 9 }, { day: "Jum", usage: 14 }, { day: "Sab", usage: 7 }, { day: "Min", usage: 5 }
    ]
  },
  {
    id: "item-019",
    name: "Ondansetron 4mg Injeksi",
    code: "OBT-078",
    category: "Obat",
    unit: "IGD",
    currentStock: 65,
    inTransit: 0,
    minimumStock: 50,
    maximumStock: 200,
    batch: "ON2408",
    expirationDate: "2027-06-30",
    supplier: "PT Kalbe Farma",
    lastUpdated: "2026-09-01T08:00:00Z",
    movements: [
      { id: "mov22", date: "2026-09-01T08:00:00Z", type: "OUT", quantity: 15, description: "Injeksi Anti-Mual IGD" }
    ],
    usageTrend: [
      { day: "Sen", usage: 12 }, { day: "Sel", usage: 15 }, { day: "Rab", usage: 14 },
      { day: "Kam", usage: 18 }, { day: "Jum", usage: 20 }, { day: "Sab", usage: 16 }, { day: "Min", usage: 15 }
    ]
  },
  {
    id: "item-020",
    name: "Foley Catheter No 16",
    code: "BHP-043",
    category: "Bahan Medis Habis Pakai",
    unit: "Rawat Inap",
    currentStock: 15,
    inTransit: 0,
    minimumStock: 50,
    maximumStock: 200,
    batch: "FC2404",
    expirationDate: "2028-09-12",
    supplier: "PT OneMed",
    lastUpdated: "2026-09-01T06:45:00Z",
    movements: [
      { id: "mov23", date: "2026-09-01T06:45:00Z", type: "OUT", quantity: 8, description: "Kateterisasi Pasien Rawat Inap" }
    ],
    usageTrend: [
      { day: "Sen", usage: 10 }, { day: "Sel", usage: 12 }, { day: "Rab", usage: 11 },
      { day: "Kam", usage: 14 }, { day: "Jum", usage: 15 }, { day: "Sab", usage: 12 }, { day: "Min", usage: 9 }
    ]
  },
  {
    id: "item-021",
    name: "Set Balut Bedah Minor",
    code: "CSSD-018",
    category: "Alat Steril",
    unit: "Kamar Operasi",
    currentStock: 14,
    inTransit: 0,
    minimumStock: 10,
    maximumStock: 25,
    batch: "CSSD2408-M",
    expirationDate: "2026-11-05",
    supplier: "Internal CSSD",
    lastUpdated: "2026-08-31T14:15:00Z",
    movements: [
      { id: "mov24", date: "2026-08-31T14:15:00Z", type: "IN", quantity: 5, description: "Selesai Autoclave" }
    ],
    usageTrend: [
      { day: "Sen", usage: 4 }, { day: "Sel", usage: 5 }, { day: "Rab", usage: 6 },
      { day: "Kam", usage: 4 }, { day: "Jum", usage: 7 }, { day: "Sab", usage: 3 }, { day: "Min", usage: 2 }
    ]
  },
  {
    id: "item-022",
    name: "Ketorolac 30mg Injeksi",
    code: "OBT-089",
    category: "Obat",
    unit: "Kamar Operasi",
    currentStock: 180,
    inTransit: 0,
    minimumStock: 80,
    maximumStock: 400,
    batch: "KT2410",
    expirationDate: "2027-08-20",
    supplier: "PT Kimia Farma",
    lastUpdated: "2026-08-30T17:00:00Z",
    movements: [
      { id: "mov25", date: "2026-08-30T17:00:00Z", type: "OUT", quantity: 25, description: "Analgesik Pasca Operasi" }
    ],
    usageTrend: [
      { day: "Sen", usage: 20 }, { day: "Sel", usage: 22 }, { day: "Rab", usage: 25 },
      { day: "Kam", usage: 24 }, { day: "Jum", usage: 28 }, { day: "Sab", usage: 15 }, { day: "Min", usage: 10 }
    ]
  },
  {
    id: "item-023",
    name: "Underpad Non-Woven 60x90",
    code: "BHP-072",
    category: "Bahan Medis Habis Pakai",
    unit: "Rawat Inap",
    currentStock: 120,
    inTransit: 0,
    minimumStock: 100,
    maximumStock: 500,
    batch: "UP2406",
    expirationDate: "2029-03-01",
    supplier: "PT Sensi",
    lastUpdated: "2026-09-01T05:30:00Z",
    movements: [
      { id: "mov26", date: "2026-09-01T05:30:00Z", type: "OUT", quantity: 40, description: "Pergantian Alas Pasien Tirah Baring" }
    ],
    usageTrend: [
      { day: "Sen", usage: 30 }, { day: "Sel", usage: 35 }, { day: "Rab", usage: 38 },
      { day: "Kam", usage: 42 }, { day: "Jum", usage: 45 }, { day: "Sab", usage: 40 }, { day: "Min", usage: 35 }
    ]
  },
  {
    id: "item-024",
    name: "Set Laparatomi Dewasa",
    code: "CSSD-009",
    category: "Alat Steril",
    unit: "CSSD",
    currentStock: 2,
    inTransit: 0,
    minimumStock: 6,
    maximumStock: 12,
    batch: "CSSD2407-L",
    expirationDate: "2026-10-01",
    supplier: "Internal CSSD",
    lastUpdated: "2026-09-01T08:15:00Z",
    movements: [
      { id: "mov27", date: "2026-09-01T08:15:00Z", type: "OUT", quantity: 1, description: "Operasi Cito Bedah Digestif" }
    ],
    usageTrend: [
      { day: "Sen", usage: 1 }, { day: "Sel", usage: 2 }, { day: "Rab", usage: 2 },
      { day: "Kam", usage: 1 }, { day: "Jum", usage: 3 }, { day: "Sab", usage: 1 }, { day: "Min", usage: 1 }
    ]
  },
  {
    id: "item-025",
    name: "Diazepam 5mg/ml Injeksi",
    code: "OBT-063",
    category: "Obat",
    unit: "IGD",
    currentStock: 25,
    inTransit: 0,
    minimumStock: 20,
    maximumStock: 80,
    batch: "DZ2405",
    expirationDate: "2026-09-28", // Expiring soon
    supplier: "PT Kimia Farma",
    lastUpdated: "2026-08-31T20:00:00Z",
    movements: [
      { id: "mov28", date: "2026-08-31T20:00:00Z", type: "OUT", quantity: 4, description: "Penanganan Kejang Pasien IGD" }
    ],
    usageTrend: [
      { day: "Sen", usage: 3 }, { day: "Sel", usage: 2 }, { day: "Rab", usage: 4 },
      { day: "Kam", usage: 5 }, { day: "Jum", usage: 4 }, { day: "Sab", usage: 6 }, { day: "Min", usage: 3 }
    ]
  },
  {
    id: "item-026",
    name: "Handschoen Non-Steril Size M",
    code: "BHP-015",
    category: "Bahan Medis Habis Pakai",
    unit: "Gudang Utama",
    currentStock: 3500,
    inTransit: 0,
    minimumStock: 1500,
    maximumStock: 6000,
    batch: "GL2409",
    expirationDate: "2028-11-30",
    supplier: "PT Shamrock",
    lastUpdated: "2026-08-25T13:30:00Z",
    movements: [
      { id: "mov29", date: "2026-08-25T13:30:00Z", type: "IN", quantity: 2000, description: "Penerimaan PO Gudang" }
    ],
    usageTrend: [
      { day: "Sen", usage: 180 }, { day: "Sel", usage: 210 }, { day: "Rab", usage: 230 },
      { day: "Kam", usage: 200 }, { day: "Jum", usage: 250 }, { day: "Sab", usage: 190 }, { day: "Min", usage: 170 }
    ]
  },
  {
    id: "item-027",
    name: "Set Histerektomi",
    code: "CSSD-050",
    category: "Alat Steril",
    unit: "CSSD",
    currentStock: 4,
    inTransit: 0,
    minimumStock: 5,
    maximumStock: 10,
    batch: "CSSD2408-H",
    expirationDate: "2026-12-15",
    supplier: "Internal CSSD",
    lastUpdated: "2026-08-29T10:00:00Z",
    movements: [
      { id: "mov30", date: "2026-08-29T10:00:00Z", type: "OUT", quantity: 1, description: "Jadwal Operasi Kandungan" }
    ],
    usageTrend: [
      { day: "Sen", usage: 1 }, { day: "Sel", usage: 1 }, { day: "Rab", usage: 2 },
      { day: "Kam", usage: 1 }, { day: "Jum", usage: 2 }, { day: "Sab", usage: 0 }, { day: "Min", usage: 1 }
    ]
  },
  {
    id: "item-028",
    name: "Salbutamol Nebules 2.5mg",
    code: "OBT-033",
    category: "Obat",
    unit: "IGD",
    currentStock: 95,
    inTransit: 0,
    minimumStock: 80,
    maximumStock: 300,
    batch: "SB2401",
    expirationDate: "2027-10-10",
    supplier: "PT GlaxoSmithKline",
    lastUpdated: "2026-09-01T09:40:00Z",
    movements: [
      { id: "mov31", date: "2026-09-01T09:40:00Z", type: "OUT", quantity: 18, description: "Nebulisasi Pasien Asma Akut" }
    ],
    usageTrend: [
      { day: "Sen", usage: 15 }, { day: "Sel", usage: 20 }, { day: "Rab", usage: 18 },
      { day: "Kam", usage: 22 }, { day: "Jum", usage: 25 }, { day: "Sab", usage: 20 }, { day: "Min", usage: 18 }
    ]
  },
  {
    id: "item-029",
    name: "Urine Bag 2000ml",
    code: "BHP-062",
    category: "Bahan Medis Habis Pakai",
    unit: "Rawat Inap",
    currentStock: 280,
    inTransit: 0,
    minimumStock: 150,
    maximumStock: 600,
    batch: "UB2402",
    expirationDate: "2029-05-15",
    supplier: "PT OneMed",
    lastUpdated: "2026-08-30T10:00:00Z",
    movements: [
      { id: "mov32", date: "2026-08-30T10:00:00Z", type: "OUT", quantity: 20, description: "Distribusi ke Ruang Rawat" }
    ],
    usageTrend: [
      { day: "Sen", usage: 18 }, { day: "Sel", usage: 22 }, { day: "Rab", usage: 20 },
      { day: "Kam", usage: 25 }, { day: "Jum", usage: 28 }, { day: "Sab", usage: 24 }, { day: "Min", usage: 20 }
    ]
  },
  {
    id: "item-030",
    name: "Set Cabut Jahit (Off Hecting)",
    code: "CSSD-012",
    category: "Alat Steril",
    unit: "Rawat Jalan",
    currentStock: 18,
    inTransit: 0,
    minimumStock: 12,
    maximumStock: 30,
    batch: "CSSD2409-O",
    expirationDate: "2026-11-18",
    supplier: "Internal CSSD",
    lastUpdated: "2026-08-31T09:00:00Z",
    movements: [
      { id: "mov33", date: "2026-08-31T09:00:00Z", type: "IN", quantity: 8, description: "Pengambilan dari CSSD" }
    ],
    usageTrend: [
      { day: "Sen", usage: 5 }, { day: "Sel", usage: 6 }, { day: "Rab", usage: 7 },
      { day: "Kam", usage: 5 }, { day: "Jum", usage: 8 }, { day: "Sab", usage: 4 }, { day: "Min", usage: 2 }
    ]
  },
  {
    id: "item-031",
    name: "Meropenem 1g Injeksi",
    code: "OBT-115",
    category: "Obat",
    unit: "ICU",
    currentStock: 22,
    inTransit: 0,
    minimumStock: 20,
    maximumStock: 100,
    batch: "MR2404",
    expirationDate: "2027-02-28",
    supplier: "PT Kalbe Farma",
    lastUpdated: "2026-09-01T06:15:00Z",
    movements: [
      { id: "mov34", date: "2026-09-01T06:15:00Z", type: "OUT", quantity: 6, description: "Antibiotik Lini Ketiga Pasien Sepsis" }
    ],
    usageTrend: [
      { day: "Sen", usage: 4 }, { day: "Sel", usage: 5 }, { day: "Rab", usage: 6 },
      { day: "Kam", usage: 5 }, { day: "Jum", usage: 7 }, { day: "Sab", usage: 4 }, { day: "Min", usage: 5 }
    ]
  },
  {
    id: "item-032",
    name: "Nasal Cannula Adult",
    code: "BHP-028",
    category: "Bahan Medis Habis Pakai",
    unit: "IGD",
    currentStock: 40,
    inTransit: 0,
    minimumStock: 80,
    maximumStock: 300,
    batch: "NC2403",
    expirationDate: "2028-07-22",
    supplier: "PT OneMed",
    lastUpdated: "2026-09-01T08:50:00Z",
    movements: [
      { id: "mov35", date: "2026-09-01T08:50:00Z", type: "OUT", quantity: 15, description: "Terapi Oksigen Pasien Sesak" }
    ],
    usageTrend: [
      { day: "Sen", usage: 14 }, { day: "Sel", usage: 18 }, { day: "Rab", usage: 16 },
      { day: "Kam", usage: 20 }, { day: "Jum", usage: 22 }, { day: "Sab", usage: 19 }, { day: "Min", usage: 15 }
    ]
  },
  {
    id: "item-033",
    name: "Ringer Lactate 500ml",
    code: "OBT-019",
    category: "Obat",
    unit: "Gudang Utama",
    currentStock: 2400,
    inTransit: 0,
    minimumStock: 800,
    maximumStock: 4000,
    batch: "RL2412",
    expirationDate: "2027-12-05",
    supplier: "PT Otsuka",
    lastUpdated: "2026-08-27T11:00:00Z",
    movements: [
      { id: "mov36", date: "2026-08-27T11:00:00Z", type: "IN", quantity: 1500, description: "Penerimaan PO Cairan Infus" }
    ],
    usageTrend: [
      { day: "Sen", usage: 90 }, { day: "Sel", usage: 110 }, { day: "Rab", usage: 120 },
      { day: "Kam", usage: 105 }, { day: "Jum", usage: 130 }, { day: "Sab", usage: 115 }, { day: "Min", usage: 95 }
    ]
  },
  {
    id: "item-034",
    name: "Set Vena Seksi",
    code: "CSSD-061",
    category: "Alat Steril",
    unit: "CSSD",
    currentStock: 3,
    inTransit: 0,
    minimumStock: 4,
    maximumStock: 8,
    batch: "CSSD2409-V",
    expirationDate: "2026-10-30",
    supplier: "Internal CSSD",
    lastUpdated: "2026-08-29T14:30:00Z",
    movements: [
      { id: "mov37", date: "2026-08-29T14:30:00Z", type: "OUT", quantity: 1, description: "Dipinjam IGD Cito" }
    ],
    usageTrend: [
      { day: "Sen", usage: 1 }, { day: "Sel", usage: 0 }, { day: "Rab", usage: 1 },
      { day: "Kam", usage: 1 }, { day: "Jum", usage: 2 }, { day: "Sab", usage: 0 }, { day: "Min", usage: 1 }
    ]
  },
  {
    id: "item-035",
    name: "Silk Suture 3-0 with Needle",
    code: "BHP-083",
    category: "Bahan Medis Habis Pakai",
    unit: "Kamar Operasi",
    currentStock: 110,
    inTransit: 0,
    minimumStock: 100,
    maximumStock: 400,
    batch: "SK2401",
    expirationDate: "2028-04-14",
    supplier: "PT Ethicon",
    lastUpdated: "2026-09-01T07:10:00Z",
    movements: [
      { id: "mov38", date: "2026-09-01T07:10:00Z", type: "OUT", quantity: 12, description: "Penjahitan Luka Operasi" }
    ],
    usageTrend: [
      { day: "Sen", usage: 12 }, { day: "Sel", usage: 16 }, { day: "Rab", usage: 15 },
      { day: "Kam", usage: 18 }, { day: "Jum", usage: 20 }, { day: "Sab", usage: 14 }, { day: "Min", usage: 10 }
    ]
  }
];
