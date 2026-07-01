// ============================================================================
// Domain Types — Transaction
// Source of Truth: BankMate AI Frontend Blueprint · Sections 6, 8
// ============================================================================

export type TransactionType = 'CREDIT' | 'DEBIT';
export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED' | 'REVERSED';

export interface Transaction {
  id: string;
  customerId: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  description: string;
  category: string;
  referenceNumber?: string;
  accountNumber?: string;
  counterparty?: string;
  transactionDate: string;
  createdAt: string;
}

export interface TransactionFilters {
  type?: TransactionType;
  status?: TransactionStatus;
  category?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  count: number;
  percentage: number;
}

export default {};
