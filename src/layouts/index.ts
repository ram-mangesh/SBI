// ============================================================================
// Layout Shells — Barrel
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.1 / Section 3
// Section 2 ships structural shells with <Outlet/>; Section 3 fills the chrome.
//
// Layout hierarchy (Section 3.2):
//   RootLayout
//     ├── BlankLayout       (public + error pages)
//     ├── AuthLayout        (/auth/*)
//     ├── CustomerLayout    (/customer/*)
//     ├── AdminLayout       (/admin/*)
//     ├── RMLayout          (/rm/*)
//     ├── OnboardingLayout  (/customer/onboarding)
//     ├── ChatLayout        (/chat/*)
//     └── ErrorLayout       (error pages — optional, richer chrome)
// ============================================================================

export { RootLayout } from './RootLayout';
export { BlankLayout } from './BlankLayout';
export { AuthLayout } from './AuthLayout';
export { CustomerLayout } from './CustomerLayout';
export { AdminLayout } from './AdminLayout';
export { RMLayout } from './RMLayout';
export { OnboardingLayout } from './OnboardingLayout';
export { ChatLayout } from './ChatLayout';
export { ErrorLayout } from './ErrorLayout';
