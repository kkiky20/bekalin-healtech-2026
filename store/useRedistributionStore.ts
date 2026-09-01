import { create } from 'zustand';
import { RedistributionRecord } from '@/types/redistribution';

// Pre-seed mock data for demonstrations
export const MOCK_REDISTRIBUTIONS: RedistributionRecord[] = [
  {
    id: "RD-2026-001",
    requestId: "PR-2026-004", // Assume this is an approved request
    destinationUnit: "IGD",
    requesterName: "Dr. Andi",
    priority: "TINGGI",
    status: "ALLOCATED",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86000000).toISOString(),
    createdBy: "Admin Gudang",
    allocations: [
      {
        id: "ALC-1001",
        stockItemId: "STK-001",
        sourceUnitId: "Gudang Utama",
        requestedQuantity: 50,
        allocatedQuantity: 50
      }
    ],
    history: [
      {
        actorId: "admin-1",
        actorName: "Admin Gudang",
        role: "ADMIN_GUDANG",
        action: "CREATE_REDISTRIBUTION",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        comment: "Alokasi penuh dari Gudang Utama."
      }
    ]
  }
];

interface RedistributionStore {
  redistributions: RedistributionRecord[];
  createRedistribution: (record: RedistributionRecord) => void;
  updateRedistributionStatus: (id: string, status: RedistributionRecord['status'], actor: any, comment?: string) => void;
}

export const useRedistributionStore = create<RedistributionStore>((set) => ({
  redistributions: MOCK_REDISTRIBUTIONS,

  createRedistribution: (record) => set((state) => ({
    redistributions: [record, ...state.redistributions]
  })),

  updateRedistributionStatus: (id, status, actor, comment) => set((state) => ({
    redistributions: state.redistributions.map(rd => {
      if (rd.id === id) {
        const historyEntry = {
          actorId: actor.id || "unknown",
          actorName: actor.name || "System",
          role: actor.role || "SYSTEM",
          action: `UPDATE_STATUS_${status}`,
          timestamp: new Date().toISOString(),
          comment
        };
        return {
          ...rd,
          status,
          updatedAt: new Date().toISOString(),
          history: [...rd.history, historyEntry]
        };
      }
      return rd;
    })
  }))
}));
