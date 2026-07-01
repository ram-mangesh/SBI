import { create } from 'zustand';

interface TransactionsStoreState {
  selectedTransactionId: string | null;
  setSelectedTransactionId: (transactionId: string | null) => void;
}

export const useTransactionsStore = create<TransactionsStoreState>((set) => ({
  selectedTransactionId: null,
  setSelectedTransactionId: (selectedTransactionId) => set({ selectedTransactionId }),
}));
