// ============================================================================
// Domain Types — Customer
// Source of Truth: BankMate AI Frontend Blueprint · Sections 1, 6
// ============================================================================

import type { CustomerType } from '@/core/constants/customer-types.constants';
import type { KYCStatus } from '@/core/constants/kyc.constants';

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string | null;
  mobile: string;
  dateOfBirth?: string | null;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | null;
  customerType: CustomerType;
  kycStatus: KYCStatus;
  profileCompletionPct: number;
  avatarUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface FinancialProfile {
  customerId: string;
  monthlyIncome: number;
  monthlyExpenses?: number;
  existingEMIs?: number;
  creditScore?: number | null;
  employmentType?: 'SALARIED' | 'SELF_EMPLOYED' | 'BUSINESS' | 'STUDENT' | 'RETIRED' | null;
  employerName?: string | null;
  occupation?: string | null;
  annualIncome?: number;
  savingsAmount?: number;
  investmentsAmount?: number;
  liabilities?: number;
  riskAppetite?: 'LOW' | 'MEDIUM' | 'HIGH' | null;
}

export interface CustomerTypeDetails {
  type: CustomerType;
  isDerived: boolean;
  derivedAt?: string;
  confidence?: number;
}

export default {};
