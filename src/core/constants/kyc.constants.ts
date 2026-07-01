// ============================================================================
// KYC Constants
// Source of Truth: BankMate AI Frontend Blueprint · Section 6.2.1 (KYC card)
//   APPROVED / PENDING / REJECTED / NOT_STARTED
// ============================================================================

export const KYCStatus = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  NOT_STARTED: 'NOT_STARTED',
} as const;

export type KYCStatus = (typeof KYCStatus)[keyof typeof KYCStatus];

export const KYC_STATUS_LABELS: Record<KYCStatus, string> = {
  APPROVED: 'Verified',
  PENDING: 'In Progress',
  REJECTED: 'Rejected',
  NOT_STARTED: 'Not Started',
};

// Status indicator per Section 6.2.1 — Green ✅ / Orange ⏳ / Red ❌ / Grey ○
export const KYC_STATUS_INDICATOR: Record<
  KYCStatus,
  { color: 'success' | 'warning' | 'error' | 'muted'; icon: string }
> = {
  APPROVED: { color: 'success', icon: '✅' },
  PENDING: { color: 'warning', icon: '⏳' },
  REJECTED: { color: 'error', icon: '❌' },
  NOT_STARTED: { color: 'muted', icon: '○' },
};

export const KYC_DOCUMENT_TYPES = [
  'AADHAAR',
  'PAN_CARD',
  'PASSPORT',
  'DRIVING_LICENSE',
  'VOTER_ID',
  'UTILITY_BILL',
  'BANK_STATEMENT',
  'SALARY_SLIP',
] as const;

export type KYCDocumentType = (typeof KYC_DOCUMENT_TYPES)[number];

export const KYC_DOCUMENT_LABELS: Record<KYCDocumentType, string> = {
  AADHAAR: 'Aadhaar Card',
  PAN_CARD: 'PAN Card',
  PASSPORT: 'Passport',
  DRIVING_LICENSE: 'Driving License',
  VOTER_ID: 'Voter ID',
  UTILITY_BILL: 'Utility Bill (Address Proof)',
  BANK_STATEMENT: 'Bank Statement',
  SALARY_SLIP: 'Salary Slip',
};

export const KYC_STATUSES = Object.values(KYCStatus);

export default {
  KYCStatus,
  KYC_STATUS_LABELS,
  KYC_STATUS_INDICATOR,
  KYC_DOCUMENT_TYPES,
  KYC_DOCUMENT_LABELS,
  KYC_STATUSES,
};
