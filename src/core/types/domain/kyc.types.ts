// ============================================================================
// Domain Types — KYC
// Source of Truth: BankMate AI Frontend Blueprint · Section 6.2.1
// ============================================================================

import type { KYCStatus, KYCDocumentType } from '@/core/constants/kyc.constants';

export type KYCVerificationStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'DOCUMENTS_SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED';

export interface KYCDocument {
  id: string;
  customerId: string;
  documentType: KYCDocumentType;
  documentName: string;
  status: 'PENDING' | 'UPLOADED' | 'VERIFIED' | 'REJECTED';
  fileUrl?: string;
  uploadedAt?: string | null;
  verifiedAt?: string | null;
  rejectionReason?: string | null;
}

export interface KYCProfile {
  customerId: string;
  status: KYCStatus;
  verificationStatus: KYCVerificationStatus;
  documents: KYCDocument[];
  submittedAt?: string | null;
  verifiedAt?: string | null;
  rejectionReason?: string | null;
  lastFetched?: number;
}

export default {};
