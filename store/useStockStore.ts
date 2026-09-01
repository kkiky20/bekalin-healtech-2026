import { create } from 'zustand';
import { StockItem } from '@/types/stock';
import { MOCK_STOCK_DATA } from '@/mock/stock';

interface StockStore {
  stockItems: StockItem[];
  transferOut: (sourceStockId: string, quantity: number) => void;
  transferIn: (destinationStockId: string, quantity: number, sourceStockId: string) => void;
}

export const useStockStore = create<StockStore>((set) => ({
  stockItems: [...MOCK_STOCK_DATA],

  // Step 1 of distribution: Reduce currentStock from Source, increase inTransit
  transferOut: (sourceStockId, quantity) => set((state) => ({
    stockItems: state.stockItems.map(item => {
      if (item.id === sourceStockId) {
        return {
          ...item,
          currentStock: Math.max(0, item.currentStock - quantity),
          inTransit: item.inTransit + quantity,
        };
      }
      return item;
    })
  })),

  // Step 2 of distribution: Reduce inTransit from Source, increase currentStock in Destination
  transferIn: (destinationStockId, quantity, sourceStockId) => set((state) => {
    let newItems = [...state.stockItems];
    
    // 1. Decrease inTransit from source
    newItems = newItems.map(item => {
      if (item.id === sourceStockId) {
        return {
          ...item,
          inTransit: Math.max(0, item.inTransit - quantity)
        };
      }
      return item;
    });

    // 2. Increase currentStock at destination
    // If destination doesn't have this item yet, we'd theoretically create it,
    // but in our mock we'll just find the matching code in the destination unit.
    newItems = newItems.map(item => {
      if (item.id === destinationStockId) {
        return {
          ...item,
          currentStock: item.currentStock + quantity
        };
      }
      return item;
    });

    return { stockItems: newItems };
  })
}));
