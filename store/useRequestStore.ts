import { create } from "zustand";
import { LogisticsRequest } from "@/types/request";
import { notifyRequestCreated, notifyApprovalRequired, notifyRequestApproved } from '@/utils/notification-events';
import { MOCK_REQUEST_DATA } from "@/mock/requests";

interface RequestStore {
  requests: LogisticsRequest[];
  addRequest: (req: LogisticsRequest) => void;
  updateRequestStatus: (id: string, status: LogisticsRequest["status"], historyEntry?: any) => void;
  cancelRequest: (id: string) => void;
  validateRequest: (id: string, actor: any, comment?: string) => void;
  approveRequest: (id: string, actor: any, comment?: string) => void;
  rejectRequest: (id: string, actor: any, reason: string) => void;
}

export const useRequestStore = create<RequestStore>((set) => ({
  requests: MOCK_REQUEST_DATA,
  
  addRequest: (request) => {
    set((state) => ({
      requests: [request, ...state.requests]
    }));
    notifyRequestCreated(request.id, request.unit);
  },

  updateRequestStatus: (id, status, historyEntry) => set((state) => ({
    requests: state.requests.map(req => {
      if (req.id === id) {
        const newHistory = historyEntry ? [...(req.history || []), historyEntry] : req.history;
        return { ...req, status, updatedAt: new Date().toISOString(), history: newHistory };
      }
      return req;
    })
  })),

  cancelRequest: (id) => set((state) => ({
    requests: state.requests.map(req => 
      req.id === id ? { ...req, status: "DIBATALKAN", updatedAt: new Date().toISOString() } : req
    )
  })),

  validateRequest: (id, actor, comment) => {
    set((state) => ({
      requests: state.requests.map(req => {
        if (req.id === id) {
          const historyEntry = {
            actorId: actor.id || "unknown",
            actorName: actor.name || "Admin",
            role: actor.role || "ADMIN_GUDANG",
            action: "VALIDATE_REQUEST",
            timestamp: new Date().toISOString(),
            comment
          };
          return { 
            ...req, 
            status: "MENUNGGU_PERSETUJUAN", 
            updatedAt: new Date().toISOString(),
            reviewNotes: comment || req.reviewNotes,
            history: [...(req.history || []), historyEntry] 
          };
        }
        return req;
      })
    }));
    notifyApprovalRequired(id);
  },

  approveRequest: (id, actor, comment) => {
    let targetUnit = "";
    set((state) => ({
      requests: state.requests.map(req => {
        if (req.id === id) {
          targetUnit = req.unit;
          const historyEntry = {
            actorId: actor.id || "unknown",
            actorName: actor.name || "Manajer",
            role: actor.role || "MANAJER",
            action: "APPROVE_REQUEST",
            timestamp: new Date().toISOString(),
            comment
          };
          return { 
            ...req, 
            status: "DISETUJUI", 
            updatedAt: new Date().toISOString(),
            reviewNotes: comment || req.reviewNotes,
            history: [...(req.history || []), historyEntry] 
          };
        }
        return req;
      })
    }));
    if (targetUnit) {
      notifyRequestApproved(id, targetUnit);
    }
  },

  rejectRequest: (id, actor, reason) => set((state) => ({
    requests: state.requests.map(req => {
      if (req.id === id) {
        const historyEntry = {
          actorId: actor.id || "unknown",
          actorName: actor.name || "Reviewer",
          role: actor.role || "REVIEWER",
          action: "REJECT_REQUEST",
          timestamp: new Date().toISOString(),
          comment: reason
        };
        return { 
          ...req, 
          status: "DITOLAK", 
          rejectionReason: reason,
          updatedAt: new Date().toISOString(),
          history: [...(req.history || []), historyEntry] 
        };
      }
      return req;
    })
  }))
}));
