// ============================================================================
// Query Keys Constants
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §10
// Pattern: [domain, subDomain?, identifier?]
// All TanStack Query keys defined here — single source of truth.
// ============================================================================

export const QUERY_KEYS = {
  AUTH: {
    SESSION: ['auth', 'session'] as const,
  },
  CUSTOMER: {
    PROFILE: (id: string) => ['customer', 'profile', id] as const,
    FINANCIAL: (id: string) => ['customer', 'financial', id] as const,
    TYPE: (id: string) => ['customer', 'type', id] as const,
  },
  LIFE_EVENTS: {
    LIST: (customerId: string) => ['life-events', 'list', customerId] as const,
    DETAIL: (eventId: string) => ['life-events', 'detail', eventId] as const,
  },
  RECOMMENDATIONS: {
    LIST: (customerId: string) => ['recommendations', 'list', customerId] as const,
    DETAIL: (recId: string) => ['recommendations', 'detail', recId] as const,
    ELIGIBILITY: (customerId: string, productId: string) =>
      ['eligibility', customerId, productId] as const,
  },
  PRODUCTS: {
    LIST: (filters: unknown) => ['products', 'list', filters] as const,
    DETAIL: (productId: string) => ['products', 'detail', productId] as const,
  },
  APPLICATIONS: {
    LIST: (customerId: string) => ['applications', 'list', customerId] as const,
    DETAIL: (appId: string) => ['applications', 'detail', appId] as const,
    STATUS: (appId: string) => ['applications', 'status', appId] as const,
  },
  KYC: {
    STATUS: (customerId: string) => ['kyc', 'status', customerId] as const,
  },
  TRANSACTIONS: {
    LIST: (customerId: string, filters: unknown) =>
      ['transactions', 'list', customerId, filters] as const,
    DETAIL: (txId: string) => ['transactions', 'detail', txId] as const,
  },
  NOTIFICATIONS: {
    LIST: (customerId: string) => ['notifications', 'list', customerId] as const,
    UNREAD: (customerId: string) => ['notifications', 'unread', customerId] as const,
    HISTORY: (customerId: string) => ['notifications', 'history', customerId] as const,
    PREFERENCES: (customerId: string) => ['notifications', 'preferences', customerId] as const,
    CAMPAIGNS: (customerId: string) => ['notifications', 'campaigns', customerId] as const,
  },
  VOICE: {
    CAMPAIGNS: (customerId: string) => ['voice', 'campaigns', customerId] as const,
    HISTORY: (customerId: string) => ['voice', 'history', customerId] as const,
    PREFERENCES: (customerId: string) => ['voice', 'preferences', customerId] as const,
  },
  GOALS: {
    LIST: (customerId: string) => ['goals', 'list', customerId] as const,
    DETAIL: (goalId: string) => ['goals', 'detail', goalId] as const,
  },
  DASHBOARD: {
    WIDGETS: (customerId: string) => ['dashboard', 'widgets', customerId] as const,
  },
  CHAT: {
    HISTORY: (conversationId: string) => ['chat', 'history', conversationId] as const,
    AGENTS: ['chat', 'agents'] as const,
  },
} as const;

export default QUERY_KEYS;
