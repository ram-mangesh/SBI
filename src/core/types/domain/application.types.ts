// ============================================================================
// Domain Types — Application
// Source of Truth: BankMate AI Frontend Blueprint · Section 9
// ============================================================================

import type { Product } from './product.types';

export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'IN_REVIEW'
  | 'ADDITIONAL_INFO_NEEDED'
  | 'APPROVED'
  | 'REJECTED'
  | 'WITHDRAWN'
  | 'DISBURSED'
  | 'COMPLETED';

export type ApplicationStep =
  | 'PERSONAL_INFO'
  | 'EMPLOYMENT_INFO'
  | 'FINANCIAL_INFO'
  | 'DOCUMENT_UPLOAD'
  | 'REVIEW'
  | 'SUBMIT';

export interface ApplicationDocument {
  id: string;
  type: string;
  label: string;
  status: 'PENDING' | 'UPLOADED' | 'VERIFIED' | 'REJECTED';
  url?: string;
  uploadedAt?: string | null;
  rejectionReason?: string | null;
}

export interface Application {
  id: string;
  customerId: string;
  productId: string;
  product: Product;
  status: ApplicationStatus;
  currentStep: ApplicationStep;
  progressPct: number; // 0–100
  loanAmount?: number;
  tenureMonths?: number;
  interestRate?: number;
  documents: ApplicationDocument[];
  submittedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  rejectionReason?: string | null;
  disbursementAmount?: number;
  disbursementDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationFormData {
  personalInfo?: Record<string, unknown>;
  employmentInfo?: Record<string, unknown>;
  financialInfo?: Record<string, unknown>;
}

export interface ApplicationOffer {
  id: string;
  applicationId: string;
  interestRate: number;
  tenureMonths: number;
  loanAmount: number;
  monthlyEMI: number;
  processingFee?: number;
  expiresAt: string;
}

export default {};
