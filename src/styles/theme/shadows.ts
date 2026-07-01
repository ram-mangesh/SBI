// Shadow Tokens — Phase 2 Design System
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §11

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.07)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.10)',
  // Domain shadows
  'notification-card': '0 2px 8px rgba(37, 99, 235, 0.10)',
  'ai-bubble': '0 4px 12px rgba(37, 99, 235, 0.15)',
} as const;

export const boxShadow = shadows;

export default shadows;
