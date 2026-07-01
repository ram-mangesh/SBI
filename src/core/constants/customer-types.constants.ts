// ============================================================================
// Customer Types Constants
// Source of Truth: BankMate AI Frontend Blueprint · Section 6.2.1
//   SALARIED / SELF_EMPLOYED / STUDENT / SENIOR / NRI
// ============================================================================

export const CustomerType = {
  SALARIED: 'SALARIED',
  SELF_EMPLOYED: 'SELF_EMPLOYED',
  STUDENT: 'STUDENT',
  SENIOR: 'SENIOR',
  NRI: 'NRI',
} as const;

export type CustomerType = (typeof CustomerType)[keyof typeof CustomerType];

export const CUSTOMER_TYPE_LABELS: Record<CustomerType, string> = {
  SALARIED: 'Salaried Professional',
  SELF_EMPLOYED: 'Business Owner',
  STUDENT: 'Student',
  SENIOR: 'Senior Citizen',
  NRI: 'NRI Customer',
};

// Badge color mapping per Section 6.2.1
export const CUSTOMER_TYPE_COLORS: Record<CustomerType, string> = {
  SALARIED: 'blue', // → primary
  SELF_EMPLOYED: 'orange', // → warning
  STUDENT: 'green', // → success
  SENIOR: 'purple', // → secondary/ai-accent
  NRI: 'teal',
};

// Icon asset path per Phase 1 folder structure (public/assets/icons/customer-types)
export const CUSTOMER_TYPE_ICONS: Record<CustomerType, string> = {
  SALARIED: 'salaried',
  SELF_EMPLOYED: 'self-employed',
  STUDENT: 'student',
  SENIOR: 'senior',
  NRI: 'senior', // fallback — no dedicated NRI icon in asset list
};

export const CUSTOMER_TYPES = Object.values(CustomerType);

export default {
  CustomerType,
  CUSTOMER_TYPE_LABELS,
  CUSTOMER_TYPE_COLORS,
  CUSTOMER_TYPE_ICONS,
  CUSTOMER_TYPES,
};
