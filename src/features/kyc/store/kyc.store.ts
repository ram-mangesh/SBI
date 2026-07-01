import { create } from 'zustand';
import { KYCStatus } from '@/core/constants/kyc.constants';

interface KycStoreState {
  status: KYCStatus;
  setStatus: (status: KYCStatus) => void;
}

export const useKycStore = create<KycStoreState>((set) => ({
  status: KYCStatus.NOT_STARTED,
  setStatus: (status) => set({ status }),
}));
