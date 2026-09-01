import { StockItem, StockStatus } from "@/types/stock";

/**
 * Calculates the semantic status of a stock item.
 * Priorities: EXPIRED > CRITICAL > LOW > EXPIRING_SOON > SAFE
 */
export function getStockStatus(item: StockItem): StockStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expDate = new Date(item.expirationDate);
  expDate.setHours(0, 0, 0, 0);
  
  const diffTime = expDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return "EXPIRED";
  }

  // Define critical as 50% of minimum stock
  const criticalThreshold = Math.floor(item.minimumStock / 2);

  if (item.currentStock <= criticalThreshold) {
    return "CRITICAL";
  }

  if (item.currentStock <= item.minimumStock) {
    return "LOW";
  }

  if (diffDays <= 30) {
    return "EXPIRING_SOON";
  }

  return "SAFE";
}

/**
 * Helper to get readable status text.
 */
export function getStatusText(status: StockStatus): string {
  switch (status) {
    case "SAFE": return "Aman";
    case "LOW": return "Menipis";
    case "CRITICAL": return "Kritis";
    case "EXPIRING_SOON": return "Segera Expired";
    case "EXPIRED": return "Expired";
    default: return "Unknown";
  }
}

/**
 * Helper to get days remaining.
 */
export function getDaysRemaining(dateString: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expDate = new Date(dateString);
  expDate.setHours(0, 0, 0, 0);
  return Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Formats ISO date to ID format (e.g., 05 Januari 2027)
 */
export function formatDate(isoString: string): string {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' });
}
