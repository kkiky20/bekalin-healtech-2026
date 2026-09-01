export interface AnalyticsFilter {
  dateFrom?: string;
  dateTo?: string;
  unitId?: string;
  categoryId?: string;
  status?: string;
  priority?: string;
}

export interface StockHealthMetric {
  safe: number;
  low: number;
  critical: number;
  safePercentage: number;
  lowPercentage: number;
  criticalPercentage: number;
  total: number;
}

export interface RequestTrendMetric {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface DistributionMetric {
  total: number;
  processing: number;
  inDelivery: number;
  completed: number;
  discrepancy: number;
}

export interface FulfillmentMetric {
  approved: number;
  fulfilled: number;
  partial: number;
  unfulfilled: number;
  fulfillmentRate: number; // percentage
}

export interface DiscrepancyMetric {
  totalDistributions: number;
  withDiscrepancy: number;
  totalSent: number;
  totalReceived: number;
  difference: number;
}

export interface OperationalInsight {
  id: string;
  title: string;
  description: string;
  type: "NEUTRAL" | "WARNING" | "CRITICAL" | "SUCCESS";
  actionUrl?: string;
}
