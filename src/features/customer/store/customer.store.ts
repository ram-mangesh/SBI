import { create } from 'zustand';

interface CustomerStoreState {
  selectedCustomerId: string;
  setSelectedCustomerId: (customerId: string) => void;
}

export const useCustomerStore = create<CustomerStoreState>((set) => ({
  selectedCustomerId: 'cust-priya',
  setSelectedCustomerId: (selectedCustomerId) => set({ selectedCustomerId }),
}));
