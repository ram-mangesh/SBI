// ============================================================================
// Route Guards
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.2 (Guards)
//   AuthGuard · RoleGuard · KYCGuard · ProfileCompletionGuard · FeatureFlagGuard
// Each guard is a wrapper component that either renders children or redirects.
// ============================================================================

export { AuthGuard } from './AuthGuard';
export { GuestOnly } from './GuestOnly';
export { RoleGuard } from './RoleGuard';
export { KYCGuard } from './KYCGuard';
export { ProfileCompletionGuard } from './ProfileCompletionGuard';
export { FeatureFlagGuard } from './FeatureFlagGuard';