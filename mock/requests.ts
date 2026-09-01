import { LogisticsRequest } from "@/types/request";

export const MOCK_REQUEST_DATA: LogisticsRequest[] = [
  {
    id: "PR-2026-035",
    unit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    createdAt: "2026-09-01T14:30:00Z",
    updatedAt: "2026-09-01T14:30:00Z",
    status: "MENUNGGU_VALIDASI",
    priority: "TINGGI",
    note: "Kebutuhan mendesak pergantian shift sore",
    items: [
      { id: "ri-01", stockItemId: "item-013", name: "Epinephrine 1mg/ml", category: "Obat", unitType: "Ampul", quantity: 20, note: "Stok darurat IGD menipis" },
      { id: "ri-02", stockItemId: "item-002", name: "NaCl 0.9% 500ml", category: "Obat", unitType: "Botol", quantity: 15 },
    ]
  },
  {
    id: "PR-2026-034",
    unit: "Kamar Operasi (IBS)",
    requesterName: "Perawat Kamar Bedah",
    createdAt: "2026-09-01T11:15:00Z",
    updatedAt: "2026-09-01T11:45:00Z",
    status: "MENUNGGU_PERSETUJUAN",
    priority: "TINGGI",
    note: "Operasi elektif bedah saraf besok pagi",
    reviewNotes: "Divalidasi oleh gudang, stok instrumen & gaun siap dipindahkan",
    items: [
      { id: "ri-03", stockItemId: "item-003", name: "Set Instrumen Bedah Mayor", category: "Alat Steril", unitType: "Set", quantity: 3 },
      { id: "ri-04", stockItemId: "item-031", name: "Surgical Gown Steril Size L", category: "Alat Steril", unitType: "Pcs", quantity: 15 },
    ]
  },
  {
    id: "PR-2026-033",
    unit: "Rawat Inap",
    requesterName: "Kepala Ruangan Anggrek",
    createdAt: "2026-09-01T08:42:00Z",
    updatedAt: "2026-09-01T08:42:00Z",
    status: "MENUNGGU_VALIDASI",
    priority: "NORMAL",
    note: "Restock harian ruang rawat lantai 3",
    items: [
      { id: "ri-05", stockItemId: "item-001", name: "Paracetamol 500mg", category: "Obat", unitType: "Box", quantity: 10 },
      { id: "ri-06", stockItemId: "item-015", name: "IV Catheter 20G", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 8 },
      { id: "ri-07", stockItemId: "item-020", name: "Hand Sanitizer 500ml", category: "Bahan Medis Habis Pakai", unitType: "Botol", quantity: 5 },
    ]
  },
  {
    id: "PR-2026-032",
    unit: "ICU",
    requesterName: "Kepala Ruangan ICU",
    createdAt: "2026-08-31T16:20:00Z",
    updatedAt: "2026-08-31T17:00:00Z",
    status: "DIPROSES",
    priority: "KRITIS",
    note: "Kebutuhan pasien kritis ICU bed 4 dan 6",
    items: [
      { id: "ri-08", stockItemId: "item-025", name: "Furosemide 20mg/2ml", category: "Obat", unitType: "Ampul", quantity: 30 },
      { id: "ri-09", stockItemId: "item-032", name: "Nasal Cannula Adult", category: "Bahan Medis Habis Pakai", unitType: "Pcs", quantity: 20 },
      { id: "ri-10", stockItemId: "item-005", name: "Infusion Set Adult", category: "Bahan Medis Habis Pakai", unitType: "Pcs", quantity: 25 },
    ]
  },
  {
    id: "PR-2026-031",
    unit: "Rawat Jalan",
    requesterName: "Perawat Poliklinik",
    createdAt: "2026-08-31T13:10:00Z",
    updatedAt: "2026-08-31T14:30:00Z",
    status: "DALAM_PENGIRIMAN",
    priority: "NORMAL",
    note: "Pengiriman terjadwal poli anak & bedah",
    items: [
      { id: "ri-11", stockItemId: "item-004", name: "Amoxicillin 500mg", category: "Obat", unitType: "Strip", quantity: 60 },
      { id: "ri-12", stockItemId: "item-008", name: "Masker Medis 3-Ply", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 15 },
    ]
  },
  {
    id: "PR-2026-030",
    unit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    createdAt: "2026-08-30T15:45:00Z",
    updatedAt: "2026-08-30T16:30:00Z",
    status: "SELESAI",
    priority: "TINGGI",
    items: [
      { id: "ri-13", stockItemId: "item-012", name: "Alkohol Swab", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 10 },
      { id: "ri-14", stockItemId: "item-023", name: "Syringe 3ml with Needle", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 15 },
    ]
  },
  {
    id: "PR-2026-029",
    unit: "Farmasi",
    requesterName: "Apoteker Jaga",
    createdAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T11:15:00Z",
    status: "DITOLAK",
    priority: "RENDAH",
    rejectionReason: "Stok di depo farmasi sentral masih mencukupi kuota 2 minggu ke depan",
    items: [
      { id: "ri-15", stockItemId: "item-011", name: "Omeprazole 20mg", category: "Obat", unitType: "Box", quantity: 50 },
    ]
  },
  {
    id: "PR-2026-028",
    unit: "Rawat Inap",
    requesterName: "Kepala Ruangan Melati",
    createdAt: "2026-08-29T14:30:00Z",
    updatedAt: "2026-08-29T14:45:00Z",
    status: "DIBATALKAN",
    priority: "NORMAL",
    note: "Dibatalkan karena duplikasi permohonan dengan shift pagi",
    items: [
      { id: "ri-16", stockItemId: "item-007", name: "Syringe 5ml with Needle", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 10 },
    ]
  },
  {
    id: "PR-2026-027",
    unit: "CSSD",
    requesterName: "Petugas CSSD",
    createdAt: "2026-08-29T09:15:00Z",
    updatedAt: "2026-08-29T10:00:00Z",
    status: "DISETUJUI",
    priority: "TINGGI",
    reviewNotes: "Disetujui untuk pemenuhan jadwal sterilisasi akhir pekan",
    items: [
      { id: "ri-17", stockItemId: "item-009", name: "Kasa Steril 16x16", category: "Alat Steril", unitType: "Pack", quantity: 100 },
      { id: "ri-18", stockItemId: "item-021", name: "Kassa Roll 10cm x 4m", category: "Bahan Medis Habis Pakai", unitType: "Roll", quantity: 40 },
    ]
  },
  {
    id: "PR-2026-026",
    unit: "Kebidanan (VK)",
    requesterName: "Bidan Pelaksana VK",
    createdAt: "2026-08-28T16:00:00Z",
    updatedAt: "2026-08-28T16:30:00Z",
    status: "DIPROSES",
    priority: "TINGGI",
    note: "Persiapan persalinan cito tindakan malam",
    items: [
      { id: "ri-19", stockItemId: "item-014", name: "Set Instrumen Partus", category: "Alat Steril", unitType: "Set", quantity: 4 },
      { id: "ri-20", stockItemId: "item-027", name: "Underpad 60x90cm", category: "Bahan Medis Habis Pakai", unitType: "Pack", quantity: 20 },
      { id: "ri-21", stockItemId: "item-029", name: "Asam Traneksamat 500mg Injeksi", category: "Obat", unitType: "Ampul", quantity: 25 },
    ]
  },
  {
    id: "PR-2026-025",
    unit: "Hemodialisa",
    requesterName: "Perawat Hemodialisa",
    createdAt: "2026-08-27T11:20:00Z",
    updatedAt: "2026-08-27T13:00:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-22", stockItemId: "item-002", name: "NaCl 0.9% 500ml", category: "Obat", unitType: "Botol", quantity: 40 },
      { id: "ri-23", stockItemId: "item-026", name: "Plester Medis Non-Woven 5cm", category: "Bahan Medis Habis Pakai", unitType: "Roll", quantity: 15 },
    ]
  },
  {
    id: "PR-2026-024",
    unit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    createdAt: "2026-08-26T17:40:00Z",
    updatedAt: "2026-08-26T18:20:00Z",
    status: "SELESAI",
    priority: "KRITIS",
    note: "Penanganan pasien trauma multiple",
    items: [
      { id: "ri-24", stockItemId: "item-035", name: "Blood Transfusion Set", category: "Bahan Medis Habis Pakai", unitType: "Pcs", quantity: 12 },
      { id: "ri-25", stockItemId: "item-019", name: "Ringer Lactate 500ml", category: "Obat", unitType: "Botol", quantity: 30 },
      { id: "ri-26", stockItemId: "item-028", name: "Set Instrumen Hecting", category: "Alat Steril", unitType: "Set", quantity: 6 },
    ]
  },
  {
    id: "PR-2026-023",
    unit: "Laboratorium",
    requesterName: "Petugas Lab Klinis",
    createdAt: "2026-08-25T08:50:00Z",
    updatedAt: "2026-08-25T08:50:00Z",
    status: "MENUNGGU_VALIDASI",
    priority: "NORMAL",
    note: "Permintaan rutin APD dan desinfektan",
    items: [
      { id: "ri-27", stockItemId: "item-006", name: "Surgical Gloves Steril Size 7.5", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 20 },
      { id: "ri-28", stockItemId: "item-008", name: "Masker Medis 3-Ply", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 10 },
      { id: "ri-29", stockItemId: "item-020", name: "Hand Sanitizer 500ml", category: "Bahan Medis Habis Pakai", unitType: "Botol", quantity: 10 },
    ]
  },
  {
    id: "PR-2026-022",
    unit: "Rawat Inap",
    requesterName: "Kepala Ruangan Teratai",
    createdAt: "2026-08-24T14:15:00Z",
    updatedAt: "2026-08-24T15:30:00Z",
    status: "DALAM_PENGIRIMAN",
    priority: "NORMAL",
    items: [
      { id: "ri-30", stockItemId: "item-016", name: "IV Catheter 22G", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 12 },
      { id: "ri-31", stockItemId: "item-018", name: "Ondansetron 4mg/2ml", category: "Obat", unitType: "Ampul", quantity: 35 },
    ]
  },
  {
    id: "PR-2026-021",
    unit: "Kamar Operasi (IBS)",
    requesterName: "Perawat Kamar Bedah",
    createdAt: "2026-08-23T10:30:00Z",
    updatedAt: "2026-08-23T12:00:00Z",
    status: "SELESAI",
    priority: "TINGGI",
    items: [
      { id: "ri-32", stockItemId: "item-022", name: "Set Instrumen Vena Seksi", category: "Alat Steril", unitType: "Set", quantity: 2 },
      { id: "ri-33", stockItemId: "item-024", name: "Ketorolac 30mg/ml", category: "Obat", unitType: "Ampul", quantity: 40 },
      { id: "ri-34", stockItemId: "item-033", name: "Ceftriaxone 1g Injeksi", category: "Obat", unitType: "Vial", quantity: 25 },
    ]
  },
  {
    id: "PR-2026-020",
    unit: "Radiologi",
    requesterName: "Radiografer Utama",
    createdAt: "2026-08-21T09:00:00Z",
    updatedAt: "2026-08-21T10:30:00Z",
    status: "DITOLAK",
    priority: "RENDAH",
    rejectionReason: "Permintaan melebihi batas plafon bulanan ruangan radiologi",
    items: [
      { id: "ri-35", stockItemId: "item-010", name: "Spuit 10ml", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 30 },
    ]
  },
  {
    id: "PR-2026-019",
    unit: "ICU",
    requesterName: "Kepala Ruangan ICU",
    createdAt: "2026-08-19T15:20:00Z",
    updatedAt: "2026-08-19T16:10:00Z",
    status: "SELESAI",
    priority: "KRITIS",
    items: [
      { id: "ri-36", stockItemId: "item-034", name: "Diazepam 5mg/ml", category: "Obat", unitType: "Ampul", quantity: 15 },
      { id: "ri-37", stockItemId: "item-013", name: "Epinephrine 1mg/ml", category: "Obat", unitType: "Ampul", quantity: 25 },
    ]
  },
  {
    id: "PR-2026-018",
    unit: "Rawat Jalan",
    requesterName: "Perawat Poliklinik",
    createdAt: "2026-08-18T11:00:00Z",
    updatedAt: "2026-08-18T11:20:00Z",
    status: "DIBATALKAN",
    priority: "NORMAL",
    note: "Pasien poliklinik sudah dialihkan ke depo farmasi langsung",
    items: [
      { id: "ri-38", stockItemId: "item-001", name: "Paracetamol 500mg", category: "Obat", unitType: "Box", quantity: 20 },
    ]
  },
  {
    id: "PR-2026-017",
    unit: "CSSD",
    requesterName: "Petugas CSSD",
    createdAt: "2026-08-16T13:40:00Z",
    updatedAt: "2026-08-16T15:00:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-39", stockItemId: "item-009", name: "Kasa Steril 16x16", category: "Alat Steril", unitType: "Pack", quantity: 80 },
      { id: "ri-40", stockItemId: "item-031", name: "Surgical Gown Steril Size L", category: "Alat Steril", unitType: "Pcs", quantity: 20 },
    ]
  },
  {
    id: "PR-2026-016",
    unit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    createdAt: "2026-08-15T08:30:00Z",
    updatedAt: "2026-08-15T09:45:00Z",
    status: "SELESAI",
    priority: "TINGGI",
    items: [
      { id: "ri-41", stockItemId: "item-017", name: "Cefotaxime 1g Injeksi", category: "Obat", unitType: "Vial", quantity: 30 },
      { id: "ri-42", stockItemId: "item-030", name: "Dextrose 5% 500ml", category: "Obat", unitType: "Botol", quantity: 25 },
    ]
  },
  {
    id: "PR-2026-015",
    unit: "Rawat Inap",
    requesterName: "Kepala Ruangan Bougenville",
    createdAt: "2026-08-13T14:10:00Z",
    updatedAt: "2026-08-13T15:30:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-43", stockItemId: "item-005", name: "Infusion Set Adult", category: "Bahan Medis Habis Pakai", unitType: "Pcs", quantity: 40 },
      { id: "ri-44", stockItemId: "item-015", name: "IV Catheter 20G", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 10 },
    ]
  },
  {
    id: "PR-2026-014",
    unit: "Farmasi",
    requesterName: "Apoteker Jaga",
    createdAt: "2026-08-11T16:00:00Z",
    updatedAt: "2026-08-11T17:20:00Z",
    status: "SELESAI",
    priority: "TINGGI",
    items: [
      { id: "ri-45", stockItemId: "item-011", name: "Omeprazole 20mg", category: "Obat", unitType: "Box", quantity: 40 },
      { id: "ri-46", stockItemId: "item-018", name: "Ondansetron 4mg/2ml", category: "Obat", unitType: "Ampul", quantity: 50 },
    ]
  },
  {
    id: "PR-2026-013",
    unit: "Laboratorium",
    requesterName: "Petugas Lab Klinis",
    createdAt: "2026-08-09T10:45:00Z",
    updatedAt: "2026-08-09T11:30:00Z",
    status: "DITOLAK",
    priority: "RENDAH",
    rejectionReason: "Salah form pengajuan; instrumen partus bukan peruntukan laboratorium",
    items: [
      { id: "ri-47", stockItemId: "item-014", name: "Set Instrumen Partus", category: "Alat Steril", unitType: "Set", quantity: 1 },
    ]
  },
  {
    id: "PR-2026-012",
    unit: "Rawat Jalan",
    requesterName: "Perawat Poliklinik",
    createdAt: "2026-08-07T09:30:00Z",
    updatedAt: "2026-08-07T11:00:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-48", stockItemId: "item-004", name: "Amoxicillin 500mg", category: "Obat", unitType: "Strip", quantity: 50 },
      { id: "ri-49", stockItemId: "item-008", name: "Masker Medis 3-Ply", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 20 },
    ]
  },
  {
    id: "PR-2026-011",
    unit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    createdAt: "2026-08-05T13:15:00Z",
    updatedAt: "2026-08-05T14:10:00Z",
    status: "SELESAI",
    priority: "KRITIS",
    items: [
      { id: "ri-50", stockItemId: "item-013", name: "Epinephrine 1mg/ml", category: "Obat", unitType: "Ampul", quantity: 30 },
      { id: "ri-51", stockItemId: "item-019", name: "Ringer Lactate 500ml", category: "Obat", unitType: "Botol", quantity: 50 },
    ]
  },
  {
    id: "PR-2026-010",
    unit: "Kamar Operasi (IBS)",
    requesterName: "Perawat Kamar Bedah",
    createdAt: "2026-08-03T11:00:00Z",
    updatedAt: "2026-08-03T12:30:00Z",
    status: "SELESAI",
    priority: "TINGGI",
    items: [
      { id: "ri-52", stockItemId: "item-003", name: "Set Instrumen Bedah Mayor", category: "Alat Steril", unitType: "Set", quantity: 4 },
      { id: "ri-53", stockItemId: "item-006", name: "Surgical Gloves Steril Size 7.5", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 30 },
    ]
  },
  {
    id: "PR-2026-009",
    unit: "Rawat Inap",
    requesterName: "Kepala Ruangan Flamboyan",
    createdAt: "2026-07-31T15:30:00Z",
    updatedAt: "2026-07-31T16:00:00Z",
    status: "DIBATALKAN",
    priority: "NORMAL",
    note: "Batal karena ruangan sedang proses renovasi berkala",
    items: [
      { id: "ri-54", stockItemId: "item-027", name: "Underpad 60x90cm", category: "Bahan Medis Habis Pakai", unitType: "Pack", quantity: 15 },
    ]
  },
  {
    id: "PR-2026-008",
    unit: "CSSD",
    requesterName: "Petugas CSSD",
    createdAt: "2026-07-28T08:20:00Z",
    updatedAt: "2026-07-28T09:40:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-55", stockItemId: "item-028", name: "Set Instrumen Hecting", category: "Alat Steril", unitType: "Set", quantity: 8 },
      { id: "ri-56", stockItemId: "item-009", name: "Kasa Steril 16x16", category: "Alat Steril", unitType: "Pack", quantity: 60 },
    ]
  },
  {
    id: "PR-2026-007",
    unit: "ICU",
    requesterName: "Kepala Ruangan ICU",
    createdAt: "2026-07-25T14:00:00Z",
    updatedAt: "2026-07-25T15:20:00Z",
    status: "SELESAI",
    priority: "TINGGI",
    items: [
      { id: "ri-57", stockItemId: "item-025", name: "Furosemide 20mg/2ml", category: "Obat", unitType: "Ampul", quantity: 20 },
      { id: "ri-58", stockItemId: "item-035", name: "Blood Transfusion Set", category: "Bahan Medis Habis Pakai", unitType: "Pcs", quantity: 10 },
    ]
  },
  {
    id: "PR-2026-006",
    unit: "Hemodialisa",
    requesterName: "Perawat Hemodialisa",
    createdAt: "2026-07-22T09:40:00Z",
    updatedAt: "2026-07-22T11:00:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-59", stockItemId: "item-002", name: "NaCl 0.9% 500ml", category: "Obat", unitType: "Botol", quantity: 50 },
      { id: "ri-60", stockItemId: "item-016", name: "IV Catheter 22G", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 10 },
    ]
  },
  {
    id: "PR-2026-005",
    unit: "Rawat Jalan",
    requesterName: "Perawat Poliklinik",
    createdAt: "2026-07-18T10:15:00Z",
    updatedAt: "2026-07-18T11:00:00Z",
    status: "DITOLAK",
    priority: "RENDAH",
    rejectionReason: "Pengajuan di luar jadwal permohonan logistik poliklinik mingguan",
    items: [
      { id: "ri-61", stockItemId: "item-012", name: "Alkohol Swab", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 25 },
    ]
  },
  {
    id: "PR-2026-004",
    unit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    createdAt: "2026-07-15T16:45:00Z",
    updatedAt: "2026-07-15T17:30:00Z",
    status: "SELESAI",
    priority: "KRITIS",
    items: [
      { id: "ri-62", stockItemId: "item-024", name: "Ketorolac 30mg/ml", category: "Obat", unitType: "Ampul", quantity: 30 },
      { id: "ri-63", stockItemId: "item-029", name: "Asam Traneksamat 500mg Injeksi", category: "Obat", unitType: "Ampul", quantity: 20 },
      { id: "ri-64", stockItemId: "item-007", name: "Syringe 5ml with Needle", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 15 },
    ]
  },
  {
    id: "PR-2026-003",
    unit: "Rawat Inap",
    requesterName: "Kepala Ruangan Anggrek",
    createdAt: "2026-07-11T11:30:00Z",
    updatedAt: "2026-07-11T12:45:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-65", stockItemId: "item-001", name: "Paracetamol 500mg", category: "Obat", unitType: "Box", quantity: 15 },
      { id: "ri-66", stockItemId: "item-010", name: "Spuit 10ml", category: "Bahan Medis Habis Pakai", unitType: "Box", quantity: 10 },
    ]
  },
  {
    id: "PR-2026-002",
    unit: "Farmasi",
    requesterName: "Apoteker Jaga",
    createdAt: "2026-07-06T13:00:00Z",
    updatedAt: "2026-07-06T14:30:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-67", stockItemId: "item-017", name: "Cefotaxime 1g Injeksi", category: "Obat", unitType: "Vial", quantity: 50 },
      { id: "ri-68", stockItemId: "item-033", name: "Ceftriaxone 1g Injeksi", category: "Obat", unitType: "Vial", quantity: 40 },
    ]
  },
  {
    id: "PR-2026-001",
    unit: "CSSD",
    requesterName: "Petugas CSSD",
    createdAt: "2026-07-02T08:00:00Z",
    updatedAt: "2026-07-02T09:30:00Z",
    status: "SELESAI",
    priority: "NORMAL",
    items: [
      { id: "ri-69", stockItemId: "item-003", name: "Set Instrumen Bedah Mayor", category: "Alat Steril", unitType: "Set", quantity: 2 },
      { id: "ri-70", stockItemId: "item-014", name: "Set Instrumen Partus", category: "Alat Steril", unitType: "Set", quantity: 3 },
    ]
  }
];
