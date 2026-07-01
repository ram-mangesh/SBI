// ============================================================================
// Lazy Route Chunks
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.10 (Loading Strategy)
//   + Section 2.8 (Route Configuration)
// Each feature area is its own dynamic import so Vite emits a separate chunk
// per section. Components are loaded on demand and surfaced under a Suspense
// boundary with <PageSkeleton/> in AppRoutes.
// ============================================================================

import { lazy } from 'react';

// ── Public (marketing & info) ─────────────────────────────────────────────
export const HomePage = lazy(() =>
  import('@/features/public/pages').then((m) => ({ default: m.HomePage })),
);
export const AboutPage = lazy(() =>
  import('@/features/public/pages').then((m) => ({ default: m.AboutPage })),
);
export const PublicProductsPage = lazy(() =>
  import('@/features/public/pages').then((m) => ({ default: m.PublicProductsPage })),
);
export const PublicProductDetailPage = lazy(() =>
  import('@/features/public/pages').then((m) => ({ default: m.PublicProductDetailPage })),
);
export const ContactPage = lazy(() =>
  import('@/features/public/pages').then((m) => ({ default: m.ContactPage })),
);
export const HelpPage = lazy(() =>
  import('@/features/public/pages').then((m) => ({ default: m.HelpPage })),
);
export const HelpArticlePage = lazy(() =>
  import('@/features/public/pages').then((m) => ({ default: m.HelpArticlePage })),
);
export const TermsPage = lazy(() =>
  import('@/features/public/pages').then((m) => ({ default: m.TermsPage })),
);
export const PrivacyPage = lazy(() =>
  import('@/features/public/pages').then((m) => ({ default: m.PrivacyPage })),
);
export const SitemapPage = lazy(() =>
  import('@/features/public/pages').then((m) => ({ default: m.SitemapPage })),
);

// ── Auth (account flows) ──────────────────────────────────────────────────
export const LoginPage = lazy(() =>
  import('@/features/auth/pages').then((m) => ({ default: m.LoginPage })),
);
export const RegisterPage = lazy(() =>
  import('@/features/auth/pages').then((m) => ({ default: m.RegisterPage })),
);
export const VerifyOtpPage = lazy(() =>
  import('@/features/auth/pages').then((m) => ({ default: m.VerifyOtpPage })),
);
export const ForgotPasswordPage = lazy(() =>
  import('@/features/auth/pages').then((m) => ({ default: m.ForgotPasswordPage })),
);
export const ResetPasswordPage = lazy(() =>
  import('@/features/auth/pages').then((m) => ({ default: m.ResetPasswordPage })),
);
export const LogoutPage = lazy(() =>
  import('@/features/auth/pages').then((m) => ({ default: m.LogoutPage })),
);

// ── Customer (authenticated banking) ──────────────────────────────────────
export const OnboardingPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.OnboardingPage })),
);
export const OnboardingStepPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.OnboardingStepPage })),
);
export const DashboardPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.DashboardPage })),
);
export const ProfilePage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.ProfilePage })),
);
export const ProfileEditPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.ProfileEditPage })),
);
export const FinancialSnapshotPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.FinancialSnapshotPage })),
);
export const LifeEventsPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.LifeEventsPage })),
);
export const LifeEventDetailPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.LifeEventDetailPage })),
);
export const RecommendationsPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.RecommendationsPage })),
);
export const RecommendationDetailPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.RecommendationDetailPage })),
);
export const RecommendationComparePage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.RecommendationComparePage })),
);
export const ProductsPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.ProductsPage })),
);
export const ProductDetailPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.ProductDetailPage })),
);
export const ProductComparePage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.ProductComparePage })),
);
export const ProductApplyPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.ProductApplyPage })),
);
export const ProductCalculatePage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.ProductCalculatePage })),
);
export const ApplicationsPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.ApplicationsPage })),
);
export const NewApplicationPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.NewApplicationPage })),
);
export const ApplicationDetailPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.ApplicationDetailPage })),
);
export const ApplicationStatusPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.ApplicationStatusPage })),
);
export const AcceptOfferPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.AcceptOfferPage })),
);
export const KycPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.KycPage })),
);
export const KycUploadPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.KycUploadPage })),
);
export const KycStatusPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.KycStatusPage })),
);
export const GoalsPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.GoalsPage })),
);
export const CreateGoalPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.CreateGoalPage })),
);
export const GoalDetailPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.GoalDetailPage })),
);
export const GoalEditPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.GoalEditPage })),
);
export const TransactionsPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.TransactionsPage })),
);
export const TransactionDetailPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.TransactionDetailPage })),
);
export const TransactionCategoriesPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.TransactionCategoriesPage })),
);
export const NotificationsPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.NotificationsPage })),
);
export const NotificationDetailPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.NotificationDetailPage })),
);
export const VoicePage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.VoicePage })),
);
export const VoiceHistoryPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.VoiceHistoryPage })),
);
export const VoicePreferencesPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.VoicePreferencesPage })),
);
export const ChatCustomerPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.ChatCustomerPage })),
);
export const SettingsPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.SettingsPage })),
);
export const SettingsNotificationsPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.SettingsNotificationsPage })),
);
export const SettingsSecurityPage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.SettingsSecurityPage })),
);
export const SettingsLanguagePage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.SettingsLanguagePage })),
);
export const SettingsThemePage = lazy(() =>
  import('@/features/customer/pages').then((m) => ({ default: m.SettingsThemePage })),
);

// ── AI Chat ───────────────────────────────────────────────────────────────
export const ChatPage = lazy(() =>
  import('@/features/chat/pages').then((m) => ({ default: m.ChatPage })),
);
export const ChatConversationPage = lazy(() =>
  import('@/features/chat/pages').then((m) => ({ default: m.ChatConversationPage })),
);
export const ChatAgentPage = lazy(() =>
  import('@/features/chat/pages').then((m) => ({ default: m.ChatAgentPage })),
);

// ── Admin ─────────────────────────────────────────────────────────────────
export const AdminDashboardPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminDashboardPage })),
);
export const AdminAnalyticsPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminAnalyticsPage })),
);
export const AdminMonitoringPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminMonitoringPage })),
);
export const AdminCustomersPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminCustomersPage })),
);
export const AdminCustomerDetailPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminCustomerDetailPage })),
);
export const AdminCustomerEditPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminCustomerEditPage })),
);
export const AdminProductsPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminProductsPage })),
);
export const AdminProductNewPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminProductNewPage })),
);
export const AdminProductDetailPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminProductDetailPage })),
);
export const AdminProductEditPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminProductEditPage })),
);
export const AdminCampaignsPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminCampaignsPage })),
);
export const AdminCampaignNewPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminCampaignNewPage })),
);
export const AdminCampaignDetailPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminCampaignDetailPage })),
);
export const AdminCampaignEditPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminCampaignEditPage })),
);
export const AdminConfigPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminConfigPage })),
);
export const AdminCustomerTypesConfigPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminCustomerTypesConfigPage })),
);
export const AdminLifeEventsConfigPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminLifeEventsConfigPage })),
);
export const AdminProductsConfigPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminProductsConfigPage })),
);
export const AdminFeatureFlagsPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminFeatureFlagsPage })),
);
export const AdminCustomerAnalyticsPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminCustomerAnalyticsPage })),
);
export const AdminProductAnalyticsPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminProductAnalyticsPage })),
);
export const AdminRevenueAnalyticsPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminRevenueAnalyticsPage })),
);
export const AdminConversionAnalyticsPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminConversionAnalyticsPage })),
);
export const AdminLogsPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminLogsPage })),
);
export const AdminPerformanceMonitoringPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminPerformanceMonitoringPage })),
);
export const AdminErrorsMonitoringPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminErrorsMonitoringPage })),
);
export const AdminReportsPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminReportsPage })),
);
export const AdminReportGeneratePage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminReportGeneratePage })),
);
export const AdminReportDetailPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminReportDetailPage })),
);
export const AdminSettingsPage = lazy(() =>
  import('@/features/admin/pages').then((m) => ({ default: m.AdminSettingsPage })),
);

// ── Relationship Manager ──────────────────────────────────────────────────
export const RmDashboardPage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmDashboardPage })),
);
export const RmPerformancePage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmPerformancePage })),
);
export const RmCustomersPage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmCustomersPage })),
);
export const RmCustomerDetailPage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmCustomerDetailPage })),
);
export const RmCustomerEngagePage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmCustomerEngagePage })),
);
export const RmLeadsPage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmLeadsPage })),
);
export const RmLeadDetailPage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmLeadDetailPage })),
);
export const RmLeadConvertPage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmLeadConvertPage })),
);
export const RmTasksPage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmTasksPage })),
);
export const RmTaskDetailPage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmTaskDetailPage })),
);
export const RmCalendarPage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmCalendarPage })),
);
export const RmAppointmentsPage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmAppointmentsPage })),
);
export const RmTargetsPage = lazy(() =>
  import('@/features/rm/pages').then((m) => ({ default: m.RmTargetsPage })),
);

// ── Error ─────────────────────────────────────────────────────────────────
export const NotFoundPage = lazy(() =>
  import('@/features/error').then((m) => ({ default: m.NotFoundPage })),
);
export const ForbiddenPage = lazy(() =>
  import('@/features/error').then((m) => ({ default: m.ForbiddenPage })),
);
export const ServerErrorPage = lazy(() =>
  import('@/features/error').then((m) => ({ default: m.ServerErrorPage })),
);
export const MaintenancePage = lazy(() =>
  import('@/features/error').then((m) => ({ default: m.MaintenancePage })),
);
export const OfflinePage = lazy(() =>
  import('@/features/error').then((m) => ({ default: m.OfflinePage })),
);
export const SessionExpiredPage = lazy(() =>
  import('@/features/error').then((m) => ({ default: m.SessionExpiredPage })),
);
