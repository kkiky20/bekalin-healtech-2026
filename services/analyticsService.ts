import { useStockStore } from "@/store/useStockStore";
import { useRequestStore } from "@/store/useRequestStore";
import { useRedistributionStore } from "@/store/useRedistributionStore";
import { 
  AnalyticsFilter, 
  StockHealthMetric, 
  RequestTrendMetric, 
  DistributionMetric, 
  FulfillmentMetric, 
  DiscrepancyMetric, 
  OperationalInsight 
} from "@/types/analytics";

// Helper function to check if a date string is within a range
const isWithinDateRange = (dateStr: string, from?: string, to?: string) => {
  if (!dateStr) return false;
  const d = new Date(dateStr).getTime();
  const f = from ? new Date(from).getTime() : 0;
  // If `to` is provided, add 1 day to include the whole day
  const t = to ? new Date(to).getTime() + 86400000 : Infinity;
  return d >= f && d <= t;
};

export const getStockHealth = (filter?: AnalyticsFilter): StockHealthMetric => {
  const stock = useStockStore.getState().stockItems;
  let safe = 0;
  let low = 0;
  let critical = 0;

  // Stock doesn't really have a date, but we can filter by category if needed
  const filteredStock = stock.filter(item => {
    if (filter?.categoryId && item.category !== filter.categoryId) return false;
    return true;
  });

  filteredStock.forEach(item => {
    if (item.currentStock <= (item.minimumStock * 0.5)) { // Assuming critical is 50% of minimum
      critical++;
    } else if (item.currentStock < item.minimumStock) {
      low++;
    } else {
      safe++;
    }
  });

  const total = safe + low + critical;

  return {
    safe,
    low,
    critical,
    safePercentage: total === 0 ? 0 : Math.round((safe / total) * 100),
    lowPercentage: total === 0 ? 0 : Math.round((low / total) * 100),
    criticalPercentage: total === 0 ? 0 : Math.round((critical / total) * 100),
    total
  };
};

export const getTopLowStockItems = (filter?: AnalyticsFilter) => {
  const stock = useStockStore.getState().stockItems;
  const filteredStock = stock.filter(item => {
    if (filter?.categoryId && item.category !== filter.categoryId) return false;
    return true;
  });

  return filteredStock
    .filter(item => item.currentStock < item.minimumStock)
    .sort((a, b) => {
      // Sort by critical first (ratio of current to minimum)
      const ratioA = a.currentStock / a.minimumStock;
      const ratioB = b.currentStock / b.minimumStock;
      return ratioA - ratioB;
    })
    .slice(0, 10);
};

export const getRequestTrend = (filter?: AnalyticsFilter): RequestTrendMetric[] => {
  const requests = useRequestStore.getState().requests;
  const trendMap = new Map<string, number>();

  requests.forEach(req => {
    if (filter?.unitId && req.unit !== filter.unitId) return;
    if (filter?.status && req.status !== filter.status) return;
    if (filter?.dateFrom || filter?.dateTo) {
      if (!isWithinDateRange(req.createdAt, filter.dateFrom, filter.dateTo)) return;
    }

    const date = req.createdAt.split("T")[0];
    trendMap.set(date, (trendMap.get(date) || 0) + 1);
  });

  // Sort dates
  return Array.from(trendMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

export const getTopRequestedItems = (filter?: AnalyticsFilter) => {
  const requests = useRequestStore.getState().requests;
  const itemCounts = new Map<string, { item: string; category: string; requestCount: number; quantity: number }>();

  requests.forEach(req => {
    if (filter?.unitId && req.unit !== filter.unitId) return;
    if (filter?.dateFrom || filter?.dateTo) {
      if (!isWithinDateRange(req.createdAt, filter.dateFrom, filter.dateTo)) return;
    }

    req.items.forEach(item => {
      if (filter?.categoryId && item.category !== filter.categoryId) return;
      
      const existing = itemCounts.get(item.name) || { 
        item: item.name, 
        category: item.category, 
        requestCount: 0, 
        quantity: 0 
      };
      
      existing.requestCount += 1;
      existing.quantity += item.quantity;
      itemCounts.set(item.name, existing);
    });
  });

  return Array.from(itemCounts.values())
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
};

export const getRequestByUnit = (filter?: AnalyticsFilter) => {
  const requests = useRequestStore.getState().requests;
  const unitCounts = new Map<string, number>();

  requests.forEach(req => {
    if (filter?.dateFrom || filter?.dateTo) {
      if (!isWithinDateRange(req.createdAt, filter.dateFrom, filter.dateTo)) return;
    }
    unitCounts.set(req.unit, (unitCounts.get(req.unit) || 0) + 1);
  });

  return Array.from(unitCounts.entries())
    .map(([unit, count]) => ({ unit, count }))
    .sort((a, b) => b.count - a.count);
};

export const getFulfillmentRate = (filter?: AnalyticsFilter): FulfillmentMetric => {
  const requests = useRequestStore.getState().requests;
  
  let approved = 0;
  let fulfilled = 0;
  let partial = 0;
  let unfulfilled = 0;

  requests.forEach(req => {
    if (filter?.unitId && req.unit !== filter.unitId) return;
    if (filter?.dateFrom || filter?.dateTo) {
      if (!isWithinDateRange(req.createdAt, filter.dateFrom, filter.dateTo)) return;
    }

    if (req.status === "DISETUJUI" || req.status === "SELESAI" || req.status === "DALAM_PENGIRIMAN" || req.status === "DIPROSES") {
      approved++;
      // Simplified simulation of fulfillment status since we don't have direct linkage in mock data easily available for all requests
      // In a real app we'd cross-reference allocations. Here we can use status to guess.
      if (req.status === "SELESAI") fulfilled++;
      else if (req.status === "DALAM_PENGIRIMAN") partial++; // Just to show varied data
      else unfulfilled++;
    }
  });

  return {
    approved,
    fulfilled,
    partial,
    unfulfilled,
    fulfillmentRate: approved === 0 ? 0 : Math.round(((fulfilled + partial) / approved) * 100)
  };
};

export const getDistributionStats = (filter?: AnalyticsFilter): DistributionMetric => {
  const redistributions = useRedistributionStore.getState().redistributions;
  
  let total = 0;
  let processing = 0;
  let inDelivery = 0;
  let completed = 0;
  let discrepancy = 0;

  redistributions.forEach(rd => {
    if (filter?.unitId && rd.destinationUnit !== filter.unitId) return;
    if (filter?.dateFrom || filter?.dateTo) {
      if (!isWithinDateRange(rd.createdAt, filter.dateFrom, filter.dateTo)) return;
    }

    total++;
    if (rd.status === "PROCESSING") processing++;
    if (rd.status === "IN_DELIVERY") inDelivery++;
    if (rd.status === "COMPLETED" || rd.status === "RECEIVED") completed++;
    
    // Check discrepancy
    if (rd.receivingRecord?.discrepancies && Object.keys(rd.receivingRecord.discrepancies).length > 0) {
      discrepancy++;
    }
  });

  return {
    total,
    processing,
    inDelivery,
    completed,
    discrepancy
  };
};

export const getDistributionTrend = (filter?: AnalyticsFilter) => {
  const redistributions = useRedistributionStore.getState().redistributions;
  const trendMap = new Map<string, number>();

  redistributions.forEach(rd => {
    if (filter?.unitId && rd.destinationUnit !== filter.unitId) return;
    if (filter?.dateFrom || filter?.dateTo) {
      if (!isWithinDateRange(rd.createdAt, filter.dateFrom, filter.dateTo)) return;
    }

    const date = rd.createdAt.split("T")[0];
    trendMap.set(date, (trendMap.get(date) || 0) + 1);
  });

  return Array.from(trendMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

export const getOperationalInsights = (): OperationalInsight[] => {
  const insights: OperationalInsight[] = [];
  
  // Stock insight
  const stockHealth = getStockHealth();
  if (stockHealth.critical > 0) {
    insights.push({
      id: "insight-1",
      title: "Stok Kritis",
      description: `${stockHealth.critical} item berada pada kondisi kritis dan membutuhkan re-stock segera.`,
      type: "CRITICAL",
      actionUrl: "/laporan/stok"
    });
  } else if (stockHealth.low > 0) {
    insights.push({
      id: "insight-2",
      title: "Stok Menipis",
      description: `${stockHealth.low} item berada di bawah batas minimum.`,
      type: "WARNING",
      actionUrl: "/laporan/stok"
    });
  }

  // Distribution insight
  const dist = getDistributionStats();
  if (dist.discrepancy > 0) {
    insights.push({
      id: "insight-3",
      title: "Selisih Penerimaan",
      description: `Terdapat ${dist.discrepancy} pengiriman dengan selisih penerimaan.`,
      type: "WARNING",
      actionUrl: "/laporan/distribusi"
    });
  }

  // Request insight
  const requests = useRequestStore.getState().requests;
  const pendingRequests = requests.filter(r => r.status === "MENUNGGU_VALIDASI" || r.status === "MENUNGGU_PERSETUJUAN").length;
  
  if (pendingRequests > 0) {
    insights.push({
      id: "insight-4",
      title: "Permintaan Tertunda",
      description: `${pendingRequests} permintaan menunggu validasi atau persetujuan.`,
      type: "NEUTRAL",
      actionUrl: "/laporan/permintaan"
    });
  }

  if (insights.length === 0) {
    insights.push({
      id: "insight-ok",
      title: "Operasional Normal",
      description: "Tidak ada isu kritis pada operasional logistik hari ini.",
      type: "SUCCESS"
    });
  }

  return insights;
};
