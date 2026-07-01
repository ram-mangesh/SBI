// ============================================================================
// Customer Pages — Placeholders
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.5 / 2.8
// /customer/* routes rendered under CustomerLayout behind AuthGuard.
// Each page is a thin PagePlaceholder until its feature module ships.
// ============================================================================

import {
  UserCog,
  UserCheck,
  Heart,
  BadgeCheck,
  Upload,
  ClipboardList,
  Target,
  Receipt,
  Lock,
  Calculator,
  Languages,
  Palette,
  Tags,
} from 'lucide-react';
import { PagePlaceholder } from '@/shared/components/feedback/PagePlaceholder';
import { CustomerDashboard } from '@/features/dashboard/components/CustomerDashboard';
import { FullScreenChatPage } from '@/features/chat/components/CopilotExperience';
import {
  ComparisonExperience,
  ProductDetailExperience,
  ProductsExperience,
  RecommendationDetailExperience,
  RecommendationsExperience,
} from '@/features/recommendations/components/Section8Experience';
import {
  AcceptOfferExperience,
  ApplicationDetailExperience,
  ApplicationsDashboardExperience,
  ApplicationWizardExperience,
} from '@/features/applications/components/Section9Experience';
import {
  NotificationDetailExperience,
  NotificationsExperience,
  NotificationSettingsExperience,
  SettingsOverviewExperience,
  VoiceExperience,
  VoiceHistoryExperience,
  VoicePreferencesExperience,
} from '@/features/communication/components/Section10Experience';
// ── Onboarding ─────────────────────────────────────────────────────────────

export function OnboardingPage() {
  return (
    <PagePlaceholder
      icon={UserCheck}
      badge="Customer"
      title="Welcome — let's set up your profile"
      description="Guided onboarding: basic details, financial snapshot and preferences so we can personalize your banking experience."
    />
  );
}

export function OnboardingStepPage() {
  return (
    <PagePlaceholder
      icon={UserCheck}
      badge="Customer"
      title="Onboarding Step"
      description="A single onboarding step route for deep links and resumable profile setup."
    />
  );
}

// ── Overview ──────────────────────────────────────────────────────────────

export function DashboardPage() {
  return <CustomerDashboard />;
}

// ── Profile ───────────────────────────────────────────────────────────────

export function ProfilePage() {
  return (
    <PagePlaceholder
      icon={UserCog}
      badge="Customer"
      title="My Profile"
      description="View your personal details, contact info and account preferences."
    />
  );
}

export function ProfileEditPage() {
  return (
    <PagePlaceholder
      icon={UserCog}
      badge="Customer"
      title="Edit Profile"
      description="Update your personal information, contact details and communication preferences."
    />
  );
}

export function FinancialSnapshotPage() {
  return (
    <PagePlaceholder
      icon={UserCog}
      badge="Customer"
      title="Financial Snapshot"
      description="Income, liabilities, credit profile and affordability signals used for product recommendations."
    />
  );
}

// ── Life Events ───────────────────────────────────────────────────────────

export function LifeEventsPage() {
  return (
    <PagePlaceholder
      icon={Heart}
      badge="Customer"
      title="Life Events"
      description="Milestones like marriage, home-buying or retirement that shape your financial plan."
    />
  );
}

export function LifeEventDetailPage() {
  return (
    <PagePlaceholder
      icon={Heart}
      badge="Customer"
      title="Life Event"
      description="Details and recommended actions for a single life event."
    />
  );
}

// ── Recommendations ───────────────────────────────────────────────────────

export function RecommendationsPage() {
  return <RecommendationsExperience />;
}

export function RecommendationDetailPage() {
  return <RecommendationDetailExperience />;
}

export function RecommendationComparePage() {
  return <ComparisonExperience />;
}

// ── Products ──────────────────────────────────────────────────────────────

export function ProductsPage() {
  return <ProductsExperience />;
}

export function ProductDetailPage() {
  return <ProductDetailExperience />;
}

export function ProductComparePage() {
  return <ComparisonExperience />;
}

export function ProductApplyPage() {
  return <ApplicationWizardExperience />;
}

export function ProductCalculatePage() {
  return (
    <PagePlaceholder
      icon={Calculator}
      badge="Customer"
      title="Product Calculator"
      description="Estimate EMI, affordability and repayment scenarios before applying."
    />
  );
}

// ── Applications ──────────────────────────────────────────────────────────

export function ApplicationsPage() {
  return <ApplicationsDashboardExperience />;
}

export function NewApplicationPage() {
  return <ApplicationWizardExperience manual />;
}

export function ApplicationDetailPage() {
  return <ApplicationDetailExperience />;
}

export function ApplicationStatusPage() {
  return <ApplicationDetailExperience statusOnly />;
}

export function AcceptOfferPage() {
  return <AcceptOfferExperience />;
}

// ── KYC ───────────────────────────────────────────────────────────────────

export function KycPage() {
  return (
    <PagePlaceholder
      icon={BadgeCheck}
      badge="Customer"
      title="KYC Verification"
      description="Complete your Know-Your-Customer verification to unlock all banking features."
    />
  );
}

export function KycUploadPage() {
  return (
    <PagePlaceholder
      icon={Upload}
      badge="Customer"
      title="Upload Documents"
      description="Upload your identity and address proof documents for KYC verification."
    />
  );
}

export function KycStatusPage() {
  return (
    <PagePlaceholder
      icon={ClipboardList}
      badge="Customer"
      title="KYC Status"
      description="Check the verification status of your submitted KYC documents."
    />
  );
}

// ── Goals ─────────────────────────────────────────────────────────────────

export function GoalsPage() {
  return (
    <PagePlaceholder
      icon={Target}
      badge="Customer"
      title="Financial Goals"
      description="Define and track savings, investment and debt-payoff goals with AI guidance."
    />
  );
}

export function CreateGoalPage() {
  return (
    <PagePlaceholder
      icon={Target}
      badge="Customer"
      title="Create Goal"
      description="Define a new savings, investment or debt-payoff goal."
    />
  );
}

export function GoalDetailPage() {
  return (
    <PagePlaceholder
      icon={Target}
      badge="Customer"
      title="Goal"
      description="Progress, contributions and projections for a single financial goal."
    />
  );
}

export function GoalEditPage() {
  return (
    <PagePlaceholder
      icon={Target}
      badge="Customer"
      title="Edit Goal"
      description="Adjust goal amount, target date and contribution plan."
    />
  );
}

// ── Transactions ──────────────────────────────────────────────────────────

export function TransactionsPage() {
  return (
    <PagePlaceholder
      icon={Receipt}
      badge="Customer"
      title="Transactions"
      description="Search, filter and categorize your account transactions."
    />
  );
}

export function TransactionDetailPage() {
  return (
    <PagePlaceholder
      icon={Receipt}
      badge="Customer"
      title="Transaction"
      description="Full details for a single transaction, including category and notes."
    />
  );
}

export function TransactionCategoriesPage() {
  return (
    <PagePlaceholder
      icon={Tags}
      badge="Customer"
      title="Transaction Categories"
      description="Manage transaction categorization and spending labels."
    />
  );
}

// ── Notifications ─────────────────────────────────────────────────────────

export function NotificationsPage() {
  return <NotificationsExperience />;
}

export function NotificationDetailPage() {
  return <NotificationDetailExperience />;
}

// ── Voice ─────────────────────────────────────────────────────────────────

export function VoicePage() {
  return <VoiceExperience />;
}

export function VoiceHistoryPage() {
  return <VoiceHistoryExperience />;
}

export function VoicePreferencesPage() {
  return <VoicePreferencesExperience />;
}

// ── Chat (legacy customer route) ──────────────────────────────────────────

export function ChatCustomerPage() {
  return <FullScreenChatPage />;
}

// ── Settings ──────────────────────────────────────────────────────────────

export function SettingsPage() {
  return <SettingsOverviewExperience />;
}

export function SettingsNotificationsPage() {
  return <NotificationSettingsExperience />;
}

export function SettingsSecurityPage() {
  return (
    <PagePlaceholder
      icon={Lock}
      badge="Customer"
      title="Security"
      description="Password, two-factor authentication, devices and active sessions."
    />
  );
}

export function SettingsLanguagePage() {
  return (
    <PagePlaceholder
      icon={Languages}
      badge="Customer"
      title="Language Settings"
      description="Choose app language and communication language preferences."
    />
  );
}

export function SettingsThemePage() {
  return (
    <PagePlaceholder
      icon={Palette}
      badge="Customer"
      title="Theme Settings"
      description="Choose light, dark, system or customer-type based accent themes."
    />
  );
}
