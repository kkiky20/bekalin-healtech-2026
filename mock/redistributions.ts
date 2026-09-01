import { RedistributionRecord } from "@/types/redistribution";

export const MOCK_REDISTRIBUTIONS: RedistributionRecord[] = [
  {
    id: "RD-2026-001",
    requestId: "PR-2026-015",
    destinationUnit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    priority: "TINGGI",
    status: "DRAFT",
    createdAt: "2026-09-01T09:00:00Z",
    updatedAt: "2026-09-01T09:15:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    notes: "Draf alokasi persiapan shift malam IGD",
    allocations: [
      {
        id: "ALC-1001",
        stockItemId: "item-001",
        sourceUnitId: "Farmasi",
        requestedQuantity: 10,
        allocatedQuantity: 10,
        batchId: "B24081",
        expirationDate: "2027-03-12"
      },
      {
        id: "ALC-1002",
        stockItemId: "item-002",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 5,
        allocatedQuantity: 5,
        batchId: "N24082",
        expirationDate: "2027-01-05"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "CREATE_DRAFT",
        timestamp: "2026-09-01T09:00:00Z",
        comment: "Membuat draf rencana redistribusi persediaan IGD"
      }
    ]
  },
  {
    id: "RD-2026-002",
    requestId: "PR-2026-014",
    destinationUnit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    priority: "KRITIS",
    status: "READY",
    createdAt: "2026-09-01T08:00:00Z",
    updatedAt: "2026-09-01T08:30:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    notes: "Permintaan CITO Epinephrine & Alkohol Swab untuk IGD",
    allocations: [
      {
        id: "ALC-1003",
        stockItemId: "item-013",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 20,
        allocatedQuantity: 20,
        batchId: "EP2402",
        expirationDate: "2026-10-01"
      },
      {
        id: "ALC-1004",
        stockItemId: "item-012",
        sourceUnitId: "Farmasi",
        requestedQuantity: 5,
        allocatedQuantity: 5,
        batchId: "AS2312",
        expirationDate: "2028-12-01"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-09-01T08:00:00Z",
        comment: "Alokasi darurat disiapkan"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "VALIDATE_READY",
        timestamp: "2026-09-01T08:30:00Z",
        comment: "Disetujui untuk segera dikemas"
      }
    ]
  },
  {
    id: "RD-2026-003",
    requestId: "PR-2026-013",
    destinationUnit: "Rawat Jalan",
    requesterName: "Perawat Poliklinik",
    priority: "NORMAL",
    status: "ALLOCATED",
    createdAt: "2026-08-31T11:00:00Z",
    updatedAt: "2026-08-31T11:45:00Z",
    createdBy: "Siti Rahma (Admin Gudang)",
    notes: "Alokasi stok amoxicillin dari Gudang Utama ke Poliklinik",
    allocations: [
      {
        id: "ALC-1005",
        stockItemId: "item-004",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 50,
        allocatedQuantity: 50,
        batchId: "A24099",
        expirationDate: "2026-09-15"
      }
    ],
    history: [
      {
        actorId: "usr-003",
        actorName: "Siti Rahma",
        role: "ADMIN_GUDANG",
        action: "ALLOCATE_STOCK",
        timestamp: "2026-08-31T11:00:00Z",
        comment: "Stok dialokasikan dari buffer gudang utama"
      }
    ]
  },
  {
    id: "RD-2026-004",
    requestId: "PR-2026-012",
    destinationUnit: "Rawat Inap",
    requesterName: "Kepala Ruangan Teratai",
    priority: "NORMAL",
    status: "PROCESSING",
    createdAt: "2026-08-31T09:30:00Z",
    updatedAt: "2026-08-31T14:15:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-08-31T14:15:00Z",
      shippedBy: "Budi Santoso",
      referenceNumber: "DO-202608-044",
      notes: "Barang sedang dipacking di depo farmasi"
    },
    allocations: [
      {
        id: "ALC-1006",
        stockItemId: "item-007",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 20,
        allocatedQuantity: 20,
        batchId: "SY2405",
        expirationDate: "2029-01-20"
      },
      {
        id: "ALC-1007",
        stockItemId: "item-015",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 10,
        allocatedQuantity: 10,
        batchId: "IV2407",
        expirationDate: "2029-07-15"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "ALLOCATE_STOCK",
        timestamp: "2026-08-31T09:30:00Z"
      },
      {
        actorId: "usr-004",
        actorName: "Budi Santoso",
        role: "STAFF_LOGISTIK",
        action: "START_PROCESSING",
        timestamp: "2026-08-31T14:15:00Z",
        comment: "Sedang proses packing dan labeling"
      }
    ]
  },
  {
    id: "RD-2026-005",
    requestId: "PR-2026-011",
    destinationUnit: "CSSD",
    requesterName: "Petugas CSSD",
    priority: "TINGGI",
    status: "IN_DELIVERY",
    createdAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T15:30:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-08-30T13:00:00Z",
      shippedDate: "2026-08-30T15:30:00Z",
      shippedBy: "Agus Prasetyo",
      referenceNumber: "DO-202608-042",
      notes: "Pengiriman via kurir internal rumah sakit"
    },
    allocations: [
      {
        id: "ALC-1008",
        stockItemId: "item-009",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 100,
        allocatedQuantity: 100,
        batchId: "KS2409",
        expirationDate: "2026-10-15"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-30T10:00:00Z"
      },
      {
        actorId: "usr-005",
        actorName: "Agus Prasetyo",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-08-30T15:30:00Z",
        comment: "Kurir menuju CSSD gedung B"
      }
    ]
  },
  {
    id: "RD-2026-006",
    requestId: "PR-2026-010",
    destinationUnit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    priority: "NORMAL",
    status: "RECEIVED",
    createdAt: "2026-08-29T08:30:00Z",
    updatedAt: "2026-08-29T16:00:00Z",
    createdBy: "Siti Rahma (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-08-29T10:00:00Z",
      shippedDate: "2026-08-29T14:00:00Z",
      shippedBy: "Budi Santoso",
      referenceNumber: "DO-202608-039"
    },
    receivingRecord: {
      receivedDate: "2026-08-29T16:00:00Z",
      receivedBy: "Ns. Ratna Dewi",
      notes: "Terdapat perbedaan jumlah pada Surgical Gloves",
      discrepancies: {
        "ALC-1009": {
          expected: 30,
          actual: 28,
          difference: -2,
          condition: "Kurang",
          notes: "2 box tidak ada dalam kardus segel"
        }
      }
    },
    allocations: [
      {
        id: "ALC-1009",
        stockItemId: "item-006",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 30,
        allocatedQuantity: 30,
        batchId: "SG2311",
        expirationDate: "2027-11-01"
      }
    ],
    history: [
      {
        actorId: "usr-003",
        actorName: "Siti Rahma",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-29T08:30:00Z"
      },
      {
        actorId: "usr-004",
        actorName: "Budi Santoso",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-08-29T14:00:00Z"
      },
      {
        actorId: "usr-006",
        actorName: "Ns. Ratna Dewi",
        role: "PERAWAT_UNIT",
        action: "RECEIVE_ITEMS",
        timestamp: "2026-08-29T16:00:00Z",
        comment: "Diterima dengan catatan selisih 2 box"
      }
    ]
  },
  {
    id: "RD-2026-007",
    requestId: "PR-2026-007",
    destinationUnit: "CSSD",
    requesterName: "Petugas CSSD",
    priority: "TINGGI",
    status: "COMPLETED",
    createdAt: "2026-08-28T09:00:00Z",
    updatedAt: "2026-08-28T16:45:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-08-28T11:00:00Z",
      shippedDate: "2026-08-28T15:00:00Z",
      shippedBy: "Agus Prasetyo",
      referenceNumber: "DO-202608-035"
    },
    receivingRecord: {
      receivedDate: "2026-08-28T16:30:00Z",
      receivedBy: "Bambang Sudirgo (CSSD)",
      notes: "Semua set instrumen lengkap dan steril"
    },
    allocations: [
      {
        id: "ALC-1010",
        stockItemId: "item-003",
        sourceUnitId: "Farmasi",
        requestedQuantity: 2,
        allocatedQuantity: 2,
        batchId: "CSSD2408",
        expirationDate: "2026-11-20"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-28T09:00:00Z"
      },
      {
        actorId: "usr-005",
        actorName: "Agus Prasetyo",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-08-28T15:00:00Z"
      },
      {
        actorId: "usr-007",
        actorName: "Bambang Sudirgo",
        role: "STAFF_CSSD",
        action: "RECEIVE_ITEMS",
        timestamp: "2026-08-28T16:30:00Z"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "CLOSE_REDISTRIBUTION",
        timestamp: "2026-08-28T16:45:00Z",
        comment: "Selesai verifikasi stok"
      }
    ]
  },
  {
    id: "RD-2026-008",
    requestId: "PR-2026-008",
    destinationUnit: "Rawat Jalan",
    requesterName: "Perawat Poliklinik",
    priority: "NORMAL",
    status: "CANCELLED",
    createdAt: "2026-08-27T10:00:00Z",
    updatedAt: "2026-08-27T11:30:00Z",
    createdBy: "Siti Rahma (Admin Gudang)",
    notes: "Permintaan dibatalkan oleh unit pemohon karena salah input",
    allocations: [
      {
        id: "ALC-1011",
        stockItemId: "item-008",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 5,
        allocatedQuantity: 5,
        batchId: "MK2408",
        expirationDate: "2028-08-01"
      }
    ],
    history: [
      {
        actorId: "usr-003",
        actorName: "Siti Rahma",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-27T10:00:00Z"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "CANCEL_REDISTRIBUTION",
        timestamp: "2026-08-27T11:30:00Z",
        comment: "Dibatalkan atas permintaan unit pemohon"
      }
    ]
  },
  {
    id: "RD-2026-009",
    requestId: "PR-2026-006",
    destinationUnit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    priority: "KRITIS",
    status: "COMPLETED",
    createdAt: "2026-08-26T20:30:00Z",
    updatedAt: "2026-08-26T22:15:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-08-26T21:00:00Z",
      shippedDate: "2026-08-26T21:30:00Z",
      shippedBy: "Budi Santoso",
      referenceNumber: "DO-202608-031"
    },
    receivingRecord: {
      receivedDate: "2026-08-26T22:00:00Z",
      receivedBy: "Ns. Ratna Dewi",
      notes: "1 ampul pecah selama pengantaran darurat",
      discrepancies: {
        "ALC-1012": {
          expected: 15,
          actual: 14,
          difference: -1,
          condition: "Rusak",
          notes: "Pecah di dalam kemasan pelindung ampul"
        }
      }
    },
    allocations: [
      {
        id: "ALC-1012",
        stockItemId: "item-013",
        sourceUnitId: "Farmasi",
        requestedQuantity: 15,
        allocatedQuantity: 15,
        batchId: "EP2402",
        expirationDate: "2026-10-01"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-26T20:30:00Z"
      },
      {
        actorId: "usr-004",
        actorName: "Budi Santoso",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-08-26T21:30:00Z"
      },
      {
        actorId: "usr-006",
        actorName: "Ns. Ratna Dewi",
        role: "PERAWAT_UNIT",
        action: "RECEIVE_ITEMS",
        timestamp: "2026-08-26T22:00:00Z",
        comment: "Diterima dengan 1 ampul rusak"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "APPROVE_DISCREPANCY_AND_CLOSE",
        timestamp: "2026-08-26T22:15:00Z",
        comment: "Penyesuaian stok rusak disetujui"
      }
    ]
  },
  {
    id: "RD-2026-010",
    requestId: "PR-2026-004",
    destinationUnit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    priority: "NORMAL",
    status: "COMPLETED",
    createdAt: "2026-08-25T14:30:00Z",
    updatedAt: "2026-08-25T17:30:00Z",
    createdBy: "Siti Rahma (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-08-25T15:00:00Z",
      shippedDate: "2026-08-25T16:00:00Z",
      shippedBy: "Agus Prasetyo",
      referenceNumber: "DO-202608-028"
    },
    receivingRecord: {
      receivedDate: "2026-08-25T17:00:00Z",
      receivedBy: "Ns. Ratna Dewi",
      notes: "Semua barang dalam kondisi prima dan sesuai"
    },
    allocations: [
      {
        id: "ALC-1013",
        stockItemId: "item-001",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 15,
        allocatedQuantity: 15,
        batchId: "B24081",
        expirationDate: "2027-03-12"
      },
      {
        id: "ALC-1014",
        stockItemId: "item-002",
        sourceUnitId: "Farmasi",
        requestedQuantity: 20,
        allocatedQuantity: 20,
        batchId: "N24082",
        expirationDate: "2027-01-05"
      }
    ],
    history: [
      {
        actorId: "usr-003",
        actorName: "Siti Rahma",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-25T14:30:00Z"
      },
      {
        actorId: "usr-005",
        actorName: "Agus Prasetyo",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-08-25T16:00:00Z"
      },
      {
        actorId: "usr-006",
        actorName: "Ns. Ratna Dewi",
        role: "PERAWAT_UNIT",
        action: "RECEIVE_ITEMS",
        timestamp: "2026-08-25T17:00:00Z"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "CLOSE_REDISTRIBUTION",
        timestamp: "2026-08-25T17:30:00Z"
      }
    ]
  },
  {
    id: "RD-2026-011",
    requestId: "PR-2026-003",
    destinationUnit: "Farmasi",
    requesterName: "Apoteker Jaga",
    priority: "TINGGI",
    status: "COMPLETED",
    createdAt: "2026-08-24T09:30:00Z",
    updatedAt: "2026-08-24T12:00:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-08-24T10:00:00Z",
      shippedDate: "2026-08-24T11:00:00Z",
      shippedBy: "Budi Santoso",
      referenceNumber: "DO-202608-025"
    },
    receivingRecord: {
      receivedDate: "2026-08-24T11:45:00Z",
      receivedBy: "Apt. Dimas Pratama",
      notes: "Batch dan exp date sesuai standar"
    },
    allocations: [
      {
        id: "ALC-1015",
        stockItemId: "item-004",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 100,
        allocatedQuantity: 100,
        batchId: "A24099",
        expirationDate: "2026-09-15"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-24T09:30:00Z"
      },
      {
        actorId: "usr-004",
        actorName: "Budi Santoso",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-08-24T11:00:00Z"
      },
      {
        actorId: "usr-008",
        actorName: "Apt. Dimas Pratama",
        role: "APOTEKER",
        action: "RECEIVE_ITEMS",
        timestamp: "2026-08-24T11:45:00Z"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "CLOSE_REDISTRIBUTION",
        timestamp: "2026-08-24T12:00:00Z"
      }
    ]
  },
  {
    id: "RD-2026-012",
    requestId: "PR-2026-002",
    destinationUnit: "Rawat Inap",
    requesterName: "Kepala Ruangan Anggrek",
    priority: "NORMAL",
    status: "COMPLETED",
    createdAt: "2026-08-23T10:30:00Z",
    updatedAt: "2026-08-23T14:30:00Z",
    createdBy: "Siti Rahma (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-08-23T11:30:00Z",
      shippedDate: "2026-08-23T13:30:00Z",
      shippedBy: "Agus Prasetyo",
      referenceNumber: "DO-202608-022"
    },
    receivingRecord: {
      receivedDate: "2026-08-23T14:15:00Z",
      receivedBy: "Ns. Suryani",
      notes: "Barang lengkap dan kemasan utuh"
    },
    allocations: [
      {
        id: "ALC-1016",
        stockItemId: "item-015",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 10,
        allocatedQuantity: 10,
        batchId: "IV2407",
        expirationDate: "2029-07-15"
      },
      {
        id: "ALC-1017",
        stockItemId: "item-008",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 50,
        allocatedQuantity: 50,
        batchId: "MK2408",
        expirationDate: "2028-08-01"
      }
    ],
    history: [
      {
        actorId: "usr-003",
        actorName: "Siti Rahma",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-23T10:30:00Z"
      },
      {
        actorId: "usr-005",
        actorName: "Agus Prasetyo",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-08-23T13:30:00Z"
      },
      {
        actorId: "usr-009",
        actorName: "Ns. Suryani",
        role: "PERAWAT_UNIT",
        action: "RECEIVE_ITEMS",
        timestamp: "2026-08-23T14:15:00Z"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "CLOSE_REDISTRIBUTION",
        timestamp: "2026-08-23T14:30:00Z"
      }
    ]
  },
  {
    id: "RD-2026-013",
    requestId: "PR-2026-001",
    destinationUnit: "CSSD",
    requesterName: "Petugas CSSD",
    priority: "NORMAL",
    status: "COMPLETED",
    createdAt: "2026-08-22T08:30:00Z",
    updatedAt: "2026-08-22T13:00:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-08-22T09:30:00Z",
      shippedDate: "2026-08-22T11:00:00Z",
      shippedBy: "Budi Santoso",
      referenceNumber: "DO-202608-019"
    },
    receivingRecord: {
      receivedDate: "2026-08-22T12:00:00Z",
      receivedBy: "Bambang Sudirgo (CSSD)",
      notes: "1 set partus tidak lengkap instrumennya",
      discrepancies: {
        "ALC-1018": {
          expected: 5,
          actual: 4,
          difference: -1,
          condition: "Tidak Sesuai",
          notes: "1 set gunting tali pusat tertinggal"
        }
      }
    },
    allocations: [
      {
        id: "ALC-1018",
        stockItemId: "item-014",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 5,
        allocatedQuantity: 5,
        batchId: "CSSD2408-P",
        expirationDate: "2026-11-10"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-22T08:30:00Z"
      },
      {
        actorId: "usr-004",
        actorName: "Budi Santoso",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-08-22T11:00:00Z"
      },
      {
        actorId: "usr-007",
        actorName: "Bambang Sudirgo",
        role: "STAFF_CSSD",
        action: "RECEIVE_ITEMS",
        timestamp: "2026-08-22T12:00:00Z"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "CLOSE_REDISTRIBUTION",
        timestamp: "2026-08-22T13:00:00Z"
      }
    ]
  },
  {
    id: "RD-2026-014",
    requestId: "PR-2026-020",
    destinationUnit: "Rawat Inap",
    requesterName: "Kepala Ruangan Melati",
    priority: "TINGGI",
    status: "READY",
    createdAt: "2026-08-19T08:00:00Z",
    updatedAt: "2026-08-19T09:30:00Z",
    createdBy: "Siti Rahma (Admin Gudang)",
    notes: "Buffer stok ICU dan Rawat Inap",
    allocations: [
      {
        id: "ALC-1019",
        stockItemId: "item-005",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 50,
        allocatedQuantity: 50,
        batchId: "IS2401",
        expirationDate: "2028-05-10"
      },
      {
        id: "ALC-1020",
        stockItemId: "item-011",
        sourceUnitId: "Farmasi",
        requestedQuantity: 30,
        allocatedQuantity: 30,
        batchId: "OM2401",
        expirationDate: "2027-05-22"
      }
    ],
    history: [
      {
        actorId: "usr-003",
        actorName: "Siti Rahma",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-19T08:00:00Z"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "VALIDATE_READY",
        timestamp: "2026-08-19T09:30:00Z"
      }
    ]
  },
  {
    id: "RD-2026-015",
    requestId: "PR-2026-021",
    destinationUnit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    priority: "NORMAL",
    status: "ALLOCATED",
    createdAt: "2026-08-17T13:00:00Z",
    updatedAt: "2026-08-17T13:45:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    allocations: [
      {
        id: "ALC-1021",
        stockItemId: "item-012",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 20,
        allocatedQuantity: 15,
        batchId: "AS2312",
        expirationDate: "2028-12-01"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "PARTIAL_ALLOCATION",
        timestamp: "2026-08-17T13:00:00Z",
        comment: "Alokasi parsial karena batas minimum gudang"
      }
    ]
  },
  {
    id: "RD-2026-016",
    requestId: "PR-2026-022",
    destinationUnit: "Rawat Jalan",
    requesterName: "Perawat Poliklinik",
    priority: "RENDAH",
    status: "PROCESSING",
    createdAt: "2026-08-15T09:00:00Z",
    updatedAt: "2026-08-15T11:00:00Z",
    createdBy: "Siti Rahma (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-08-15T11:00:00Z",
      shippedBy: "Agus Prasetyo",
      referenceNumber: "DO-202608-015",
      notes: "Penataan box obat di troli"
    },
    allocations: [
      {
        id: "ALC-1022",
        stockItemId: "item-001",
        sourceUnitId: "Farmasi",
        requestedQuantity: 25,
        allocatedQuantity: 25,
        batchId: "B24081",
        expirationDate: "2027-03-12"
      }
    ],
    history: [
      {
        actorId: "usr-003",
        actorName: "Siti Rahma",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-15T09:00:00Z"
      },
      {
        actorId: "usr-005",
        actorName: "Agus Prasetyo",
        role: "KURIR",
        action: "START_PROCESSING",
        timestamp: "2026-08-15T11:00:00Z"
      }
    ]
  },
  {
    id: "RD-2026-017",
    requestId: "PR-2026-023",
    destinationUnit: "ICU",
    requesterName: "Koordinator ICU",
    priority: "KRITIS",
    status: "IN_DELIVERY",
    createdAt: "2026-08-12T14:00:00Z",
    updatedAt: "2026-08-12T15:20:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-08-12T14:30:00Z",
      shippedDate: "2026-08-12T15:20:00Z",
      shippedBy: "Budi Santoso",
      referenceNumber: "DO-202608-012",
      notes: "Pengiriman darurat kebutuhan ICU"
    },
    allocations: [
      {
        id: "ALC-1023",
        stockItemId: "item-013",
        sourceUnitId: "Farmasi",
        requestedQuantity: 10,
        allocatedQuantity: 10,
        batchId: "EP2402",
        expirationDate: "2026-10-01"
      },
      {
        id: "ALC-1024",
        stockItemId: "item-002",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 30,
        allocatedQuantity: 30,
        batchId: "N24082",
        expirationDate: "2027-01-05"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-12T14:00:00Z"
      },
      {
        actorId: "usr-004",
        actorName: "Budi Santoso",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-08-12T15:20:00Z"
      }
    ]
  },
  {
    id: "RD-2026-018",
    requestId: "PR-2026-024",
    destinationUnit: "Rawat Inap",
    requesterName: "Kepala Ruangan Cempaka",
    priority: "NORMAL",
    status: "RECEIVED",
    createdAt: "2026-08-10T10:00:00Z",
    updatedAt: "2026-08-10T16:00:00Z",
    createdBy: "Siti Rahma (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-08-10T11:30:00Z",
      shippedDate: "2026-08-10T14:00:00Z",
      shippedBy: "Agus Prasetyo",
      referenceNumber: "DO-202608-010"
    },
    receivingRecord: {
      receivedDate: "2026-08-10T15:45:00Z",
      receivedBy: "Ns. Suryani",
      notes: "Barang diterima dalam keadaan baik dan lengkap"
    },
    allocations: [
      {
        id: "ALC-1025",
        stockItemId: "item-007",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 15,
        allocatedQuantity: 15,
        batchId: "SY2405",
        expirationDate: "2029-01-20"
      },
      {
        id: "ALC-1026",
        stockItemId: "item-010",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 10,
        allocatedQuantity: 10,
        batchId: "SY2406",
        expirationDate: "2025-08-10"
      }
    ],
    history: [
      {
        actorId: "usr-003",
        actorName: "Siti Rahma",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-10T10:00:00Z"
      },
      {
        actorId: "usr-005",
        actorName: "Agus Prasetyo",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-08-10T14:00:00Z"
      },
      {
        actorId: "usr-009",
        actorName: "Ns. Suryani",
        role: "PERAWAT_UNIT",
        action: "RECEIVE_ITEMS",
        timestamp: "2026-08-10T15:45:00Z"
      }
    ]
  },
  {
    id: "RD-2026-019",
    requestId: "PR-2026-025",
    destinationUnit: "Laboratorium",
    requesterName: "Analis Lab",
    priority: "RENDAH",
    status: "CANCELLED",
    createdAt: "2026-08-05T08:30:00Z",
    updatedAt: "2026-08-05T10:00:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    notes: "Stok lab ternyata masih mencukupi setelah audit mingguan",
    allocations: [
      {
        id: "ALC-1027",
        stockItemId: "item-012",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 10,
        allocatedQuantity: 10,
        batchId: "AS2312",
        expirationDate: "2028-12-01"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-08-05T08:30:00Z"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "CANCEL_REDISTRIBUTION",
        timestamp: "2026-08-05T10:00:00Z"
      }
    ]
  },
  {
    id: "RD-2026-020",
    requestId: "PR-2026-026",
    destinationUnit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    priority: "TINGGI",
    status: "COMPLETED",
    createdAt: "2026-07-30T09:00:00Z",
    updatedAt: "2026-07-30T15:00:00Z",
    createdBy: "Siti Rahma (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-07-30T10:00:00Z",
      shippedDate: "2026-07-30T13:30:00Z",
      shippedBy: "Budi Santoso",
      referenceNumber: "DO-202607-040"
    },
    receivingRecord: {
      receivedDate: "2026-07-30T14:45:00Z",
      receivedBy: "Ns. Ratna Dewi",
      notes: "Penerimaan lengkap dan sesuai"
    },
    allocations: [
      {
        id: "ALC-1028",
        stockItemId: "item-005",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 100,
        allocatedQuantity: 100,
        batchId: "IS2401",
        expirationDate: "2028-05-10"
      },
      {
        id: "ALC-1029",
        stockItemId: "item-006",
        sourceUnitId: "Farmasi",
        requestedQuantity: 50,
        allocatedQuantity: 50,
        batchId: "SG2311",
        expirationDate: "2027-11-01"
      }
    ],
    history: [
      {
        actorId: "usr-003",
        actorName: "Siti Rahma",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-07-30T09:00:00Z"
      },
      {
        actorId: "usr-004",
        actorName: "Budi Santoso",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-07-30T13:30:00Z"
      },
      {
        actorId: "usr-006",
        actorName: "Ns. Ratna Dewi",
        role: "PERAWAT_UNIT",
        action: "RECEIVE_ITEMS",
        timestamp: "2026-07-30T14:45:00Z"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "CLOSE_REDISTRIBUTION",
        timestamp: "2026-07-30T15:00:00Z"
      }
    ]
  },
  {
    id: "RD-2026-021",
    requestId: "PR-2026-027",
    destinationUnit: "Farmasi",
    requesterName: "Apoteker Jaga",
    priority: "NORMAL",
    status: "RECEIVED",
    createdAt: "2026-07-25T11:00:00Z",
    updatedAt: "2026-07-25T17:00:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-07-25T13:00:00Z",
      shippedDate: "2026-07-25T15:30:00Z",
      shippedBy: "Agus Prasetyo",
      referenceNumber: "DO-202607-033"
    },
    receivingRecord: {
      receivedDate: "2026-07-25T16:45:00Z",
      receivedBy: "Apt. Dimas Pratama",
      notes: "Kardus basah terkena rembesan air pada saat pengiriman saat hujan",
      discrepancies: {
        "ALC-1030": {
          expected: 100,
          actual: 95,
          difference: -5,
          condition: "Rusak",
          notes: "5 box kemasan hancur terkena air hujan"
        }
      }
    },
    allocations: [
      {
        id: "ALC-1030",
        stockItemId: "item-011",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 100,
        allocatedQuantity: 100,
        batchId: "OM2401",
        expirationDate: "2027-05-22"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-07-25T11:00:00Z"
      },
      {
        actorId: "usr-005",
        actorName: "Agus Prasetyo",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-07-25T15:30:00Z"
      },
      {
        actorId: "usr-008",
        actorName: "Apt. Dimas Pratama",
        role: "APOTEKER",
        action: "RECEIVE_ITEMS",
        timestamp: "2026-07-25T16:45:00Z"
      }
    ]
  },
  {
    id: "RD-2026-022",
    requestId: "PR-2026-028",
    destinationUnit: "CSSD",
    requesterName: "Petugas CSSD",
    priority: "TINGGI",
    status: "COMPLETED",
    createdAt: "2026-07-20T08:00:00Z",
    updatedAt: "2026-07-20T14:00:00Z",
    createdBy: "Siti Rahma (Admin Gudang)",
    shippingInfo: {
      processedDate: "2026-07-20T09:30:00Z",
      shippedDate: "2026-07-20T11:30:00Z",
      shippedBy: "Budi Santoso",
      referenceNumber: "DO-202607-025"
    },
    receivingRecord: {
      receivedDate: "2026-07-20T13:30:00Z",
      receivedBy: "Bambang Sudirgo (CSSD)",
      notes: "Semua set diterima lengkap"
    },
    allocations: [
      {
        id: "ALC-1031",
        stockItemId: "item-003",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 3,
        allocatedQuantity: 3,
        batchId: "CSSD2408",
        expirationDate: "2026-11-20"
      },
      {
        id: "ALC-1032",
        stockItemId: "item-014",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 2,
        allocatedQuantity: 2,
        batchId: "CSSD2408-P",
        expirationDate: "2026-11-10"
      }
    ],
    history: [
      {
        actorId: "usr-003",
        actorName: "Siti Rahma",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-07-20T08:00:00Z"
      },
      {
        actorId: "usr-004",
        actorName: "Budi Santoso",
        role: "KURIR",
        action: "DISPATCH_DELIVERY",
        timestamp: "2026-07-20T11:30:00Z"
      },
      {
        actorId: "usr-007",
        actorName: "Bambang Sudirgo",
        role: "STAFF_CSSD",
        action: "RECEIVE_ITEMS",
        timestamp: "2026-07-20T13:30:00Z"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "CLOSE_REDISTRIBUTION",
        timestamp: "2026-07-20T14:00:00Z"
      }
    ]
  },
  {
    id: "RD-2026-023",
    requestId: "PR-2026-029",
    destinationUnit: "Rawat Jalan",
    requesterName: "Perawat Poliklinik",
    priority: "RENDAH",
    status: "DRAFT",
    createdAt: "2026-07-15T09:00:00Z",
    updatedAt: "2026-07-15T09:30:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    notes: "Rencana redistribusi masker poliklinik bulanan",
    allocations: [
      {
        id: "ALC-1033",
        stockItemId: "item-008",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 20,
        allocatedQuantity: 20,
        batchId: "MK2408",
        expirationDate: "2028-08-01"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "CREATE_DRAFT",
        timestamp: "2026-07-15T09:00:00Z"
      }
    ]
  },
  {
    id: "RD-2026-024",
    requestId: "PR-2026-030",
    destinationUnit: "Rawat Inap",
    requesterName: "Kepala Ruangan Anggrek",
    priority: "NORMAL",
    status: "READY",
    createdAt: "2026-07-10T10:00:00Z",
    updatedAt: "2026-07-10T11:15:00Z",
    createdBy: "Siti Rahma (Admin Gudang)",
    allocations: [
      {
        id: "ALC-1034",
        stockItemId: "item-015",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 25,
        allocatedQuantity: 25,
        batchId: "IV2407",
        expirationDate: "2029-07-15"
      }
    ],
    history: [
      {
        actorId: "usr-003",
        actorName: "Siti Rahma",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: "2026-07-10T10:00:00Z"
      },
      {
        actorId: "usr-001",
        actorName: "Dr. Hendra Gunawan",
        role: "MANAJER",
        action: "VALIDATE_READY",
        timestamp: "2026-07-10T11:15:00Z"
      }
    ]
  },
  {
    id: "RD-2026-025",
    requestId: "PR-2026-031",
    destinationUnit: "IGD",
    requesterName: "Perawat Unit (IGD)",
    priority: "TINGGI",
    status: "ALLOCATED",
    createdAt: "2026-07-05T08:30:00Z",
    updatedAt: "2026-07-05T09:00:00Z",
    createdBy: "Ahmad Fauzi (Admin Gudang)",
    allocations: [
      {
        id: "ALC-1035",
        stockItemId: "item-002",
        sourceUnitId: "Farmasi",
        requestedQuantity: 50,
        allocatedQuantity: 50,
        batchId: "N24082",
        expirationDate: "2027-01-05"
      },
      {
        id: "ALC-1036",
        stockItemId: "item-001",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 40,
        allocatedQuantity: 40,
        batchId: "B24081",
        expirationDate: "2027-03-12"
      }
    ],
    history: [
      {
        actorId: "usr-002",
        actorName: "Ahmad Fauzi",
        role: "ADMIN_GUDANG",
        action: "ALLOCATE_STOCK",
        timestamp: "2026-07-05T08:30:00Z"
      }
    ]
  }
];
