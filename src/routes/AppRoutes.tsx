// ============================================================================
// App Routes — Route Tree
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.8 (Route Configuration)
//   + Section 2.2 (Guards) · Section 2.10 (Loading Strategy) · Section 2.7 (Errors)
// Full route tree: public / auth / customer / chat / admin / rm / error groups,
// each rendered under its layout shell with the appropriate guards. Every page
// is lazy-loaded (see ./lazy) and surfaced under a single Suspense boundary
// with <PageSkeleton/> so chunk downloads feel stable.
// ============================================================================

import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/core/config/routes.config';
import { UserRole } from '@/core/constants/roles.constants';
import { KYCStatus } from '@/core/constants/kyc.constants';
import { FeatureFlag } from '@/core/constants/feature-flags.constants';
import {
  AuthGuard,
  GuestOnly,
  RoleGuard,
  KYCGuard,
  ProfileCompletionGuard,
  FeatureFlagGuard,
} from '@/app/guards';
import {
  RootLayout,
  BlankLayout,
  AuthLayout,
  OnboardingLayout,
  CustomerLayout,
  AdminLayout,
  RMLayout,
  ChatLayout,
  ErrorLayout,
} from '@/layouts';
import { PageSkeleton } from '@/shared/components/feedback/PageSkeleton';
import {
  // public
  HomePage,
  AboutPage,
  PublicProductsPage,
  PublicProductDetailPage,
  ContactPage,
  HelpPage,
  HelpArticlePage,
  TermsPage,
  PrivacyPage,
  SitemapPage,
  // auth
  LoginPage,
  RegisterPage,
  VerifyOtpPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  LogoutPage,
  // customer
  OnboardingPage,
  OnboardingStepPage,
  DashboardPage,
  ProfilePage,
  ProfileEditPage,
  FinancialSnapshotPage,
  LifeEventsPage,
  LifeEventDetailPage,
  RecommendationsPage,
  RecommendationDetailPage,
  RecommendationComparePage,
  ProductsPage,
  ProductDetailPage,
  ProductComparePage,
  ProductApplyPage,
  ProductCalculatePage,
  ApplicationsPage,
  NewApplicationPage,
  ApplicationDetailPage,
  ApplicationStatusPage,
  AcceptOfferPage,
  KycPage,
  KycUploadPage,
  KycStatusPage,
  GoalsPage,
  CreateGoalPage,
  GoalDetailPage,
  GoalEditPage,
  TransactionsPage,
  TransactionDetailPage,
  TransactionCategoriesPage,
  NotificationsPage,
  NotificationDetailPage,
  VoicePage,
  VoiceHistoryPage,
  VoicePreferencesPage,
  ChatCustomerPage,
  SettingsPage,
  SettingsNotificationsPage,
  SettingsSecurityPage,
  SettingsLanguagePage,
  SettingsThemePage,
  // chat
  ChatPage,
  ChatConversationPage,
  ChatAgentPage,
  // admin
  AdminDashboardPage,
  AdminAnalyticsPage,
  AdminMonitoringPage,
  AdminCustomersPage,
  AdminCustomerDetailPage,
  AdminCustomerEditPage,
  AdminProductsPage,
  AdminProductNewPage,
  AdminProductDetailPage,
  AdminProductEditPage,
  AdminCampaignsPage,
  AdminCampaignNewPage,
  AdminCampaignDetailPage,
  AdminCampaignEditPage,
  AdminConfigPage,
  AdminCustomerTypesConfigPage,
  AdminLifeEventsConfigPage,
  AdminProductsConfigPage,
  AdminFeatureFlagsPage,
  AdminCustomerAnalyticsPage,
  AdminProductAnalyticsPage,
  AdminRevenueAnalyticsPage,
  AdminConversionAnalyticsPage,
  AdminLogsPage,
  AdminPerformanceMonitoringPage,
  AdminErrorsMonitoringPage,
  AdminReportsPage,
  AdminReportGeneratePage,
  AdminReportDetailPage,
  AdminSettingsPage,
  // rm
  RmDashboardPage,
  RmPerformancePage,
  RmCustomersPage,
  RmCustomerDetailPage,
  RmCustomerEngagePage,
  RmLeadsPage,
  RmLeadDetailPage,
  RmLeadConvertPage,
  RmTasksPage,
  RmTaskDetailPage,
  RmCalendarPage,
  RmAppointmentsPage,
  RmTargetsPage,
  // error
  NotFoundPage,
  ForbiddenPage,
  ServerErrorPage,
  MaintenancePage,
  OfflinePage,
  SessionExpiredPage,
} from './lazy';

/** Suspense fallback for any lazy route chunk. */
function RouteFallback() {
  return <PageSkeleton />;
}

export function AppRoutes() {
  return (
    <RootLayout>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
        {/* ── Public (BlankLayout · no auth) ─────────────────────────── */}
        <Route element={<BlankLayout />}>
          <Route path={ROUTES.ROOT} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.PUBLIC_PRODUCTS} element={<PublicProductsPage />} />
          <Route path={ROUTES.PUBLIC_PRODUCT_DETAIL} element={<PublicProductDetailPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.HELP} element={<HelpPage />} />
          <Route path={ROUTES.HELP_ARTICLE} element={<HelpArticlePage />} />
          <Route path={ROUTES.TERMS} element={<TermsPage />} />
          <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
          <Route path={ROUTES.SITEMAP} element={<SitemapPage />} />
        </Route>

        {/* ── Auth (AuthLayout · GuestOnly) ──────────────────────────── */}
        <Route
          element={
            <GuestOnly>
              <AuthLayout />
            </GuestOnly>
          }
        >
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.VERIFY_OTP} element={<VerifyOtpPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        </Route>

        {/* Logout is a flow, not a form — render under BlankLayout, no GuestOnly. */}
        <Route element={<BlankLayout />}>
          <Route path={ROUTES.LOGOUT} element={<LogoutPage />} />
        </Route>

        {/* ── Onboarding (AuthGuard · OnboardingLayout) ─────────────── */}
        <Route
          element={
            <AuthGuard>
              <OnboardingLayout />
            </AuthGuard>
          }
        >
          <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
          <Route path={ROUTES.ONBOARDING_STEP} element={<OnboardingStepPage />} />
        </Route>

        {/* ── Customer (AuthGuard · ProfileCompletion · CustomerLayout) */}
        <Route
          element={
            <AuthGuard>
              <ProfileCompletionGuard stage="BASIC">
                <CustomerLayout />
              </ProfileCompletionGuard>
            </AuthGuard>
          }
        >
          <Route path={ROUTES.CUSTOMER} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.PROFILE_EDIT} element={<ProfileEditPage />} />
          <Route
            path={ROUTES.PROFILE_FINANCIAL}
            element={
              <KYCGuard>
                <FinancialSnapshotPage />
              </KYCGuard>
            }
          />
          <Route path={ROUTES.LIFE_EVENTS} element={<LifeEventsPage />} />
          <Route path={ROUTES.LIFE_EVENT_DETAIL} element={<LifeEventDetailPage />} />
          <Route path={ROUTES.RECOMMENDATIONS} element={<RecommendationsPage />} />
          <Route path={ROUTES.RECOMMENDATION_COMPARE} element={<RecommendationComparePage />} />
          <Route path={ROUTES.RECOMMENDATION_DETAIL} element={<RecommendationDetailPage />} />
          <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
          <Route path={ROUTES.PRODUCT_COMPARE} element={<ProductComparePage />} />
          <Route path={ROUTES.PRODUCT_CALCULATE} element={<ProductCalculatePage />} />
          <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
          <Route
            path={ROUTES.PRODUCT_APPLY}
            element={
              <KYCGuard>
                <ProductApplyPage />
              </KYCGuard>
            }
          />
          <Route path={ROUTES.APPLICATIONS} element={<ApplicationsPage />} />
          <Route path={ROUTES.APPLICATION_NEW} element={<NewApplicationPage />} />
          <Route path={ROUTES.APPLICATION_DETAIL} element={<ApplicationDetailPage />} />
          <Route path={ROUTES.APPLICATION_STATUS} element={<ApplicationStatusPage />} />
          <Route path={ROUTES.APPLICATION_ACCEPT} element={<AcceptOfferPage />} />
          <Route
            path={ROUTES.KYC}
            element={
              <KYCGuard allowedStatuses={[KYCStatus.NOT_STARTED, KYCStatus.PENDING, KYCStatus.REJECTED]}>
                <KycPage />
              </KYCGuard>
            }
          />
          <Route path={ROUTES.KYC_UPLOAD} element={<KycUploadPage />} />
          <Route path={ROUTES.KYC_STATUS} element={<KycStatusPage />} />
          <Route
            path={ROUTES.GOALS}
            element={
              <FeatureFlagGuard flag={FeatureFlag.FINANCIAL_GOALS}>
                <GoalsPage />
              </FeatureFlagGuard>
            }
          />
          <Route
            path={ROUTES.GOAL_NEW}
            element={
              <FeatureFlagGuard flag={FeatureFlag.FINANCIAL_GOALS}>
                <CreateGoalPage />
              </FeatureFlagGuard>
            }
          />
          <Route
            path={ROUTES.GOAL_DETAIL}
            element={
              <FeatureFlagGuard flag={FeatureFlag.FINANCIAL_GOALS}>
                <GoalDetailPage />
              </FeatureFlagGuard>
            }
          />
          <Route
            path={ROUTES.GOAL_EDIT}
            element={
              <FeatureFlagGuard flag={FeatureFlag.FINANCIAL_GOALS}>
                <GoalEditPage />
              </FeatureFlagGuard>
            }
          />
          <Route path={ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
          <Route path={ROUTES.TRANSACTION_CATEGORIES} element={<TransactionCategoriesPage />} />
          <Route path={ROUTES.TRANSACTION_DETAIL} element={<TransactionDetailPage />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
          <Route path={ROUTES.NOTIFICATION_DETAIL} element={<NotificationDetailPage />} />
          <Route
            path={ROUTES.VOICE}
            element={
              <FeatureFlagGuard flag={FeatureFlag.VOICE_AGENT}>
                <VoicePage />
              </FeatureFlagGuard>
            }
          />
          <Route
            path={ROUTES.VOICE_HISTORY}
            element={
              <FeatureFlagGuard flag={FeatureFlag.VOICE_AGENT}>
                <VoiceHistoryPage />
              </FeatureFlagGuard>
            }
          />
          <Route
            path={ROUTES.VOICE_PREFERENCES}
            element={
              <FeatureFlagGuard flag={FeatureFlag.VOICE_AGENT}>
                <VoicePreferencesPage />
              </FeatureFlagGuard>
            }
          />
          <Route path={ROUTES.CHAT_CUSTOMER} element={<ChatCustomerPage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          <Route path={ROUTES.SETTINGS_NOTIFICATIONS} element={<SettingsNotificationsPage />} />
          <Route path={ROUTES.SETTINGS_SECURITY} element={<SettingsSecurityPage />} />
          <Route path={ROUTES.SETTINGS_LANGUAGE} element={<SettingsLanguagePage />} />
          <Route path={ROUTES.SETTINGS_THEME} element={<SettingsThemePage />} />
        </Route>

        {/* ── AI Chat (AuthGuard · ChatLayout) ──────────────────────── */}
        <Route
          element={
            <AuthGuard>
              <ChatLayout />
            </AuthGuard>
          }
        >
          <Route path={ROUTES.CHAT} element={<ChatPage />} />
          <Route path={ROUTES.CHAT_CONVERSATION} element={<ChatConversationPage />} />
          <Route path={ROUTES.CHAT_AGENT} element={<ChatAgentPage />} />
        </Route>

        {/* ── Admin (AuthGuard · RoleGuard(ADMIN) · AdminLayout) ────── */}
        <Route
          element={
            <AuthGuard>
              <RoleGuard role={UserRole.ADMIN}>
                <AdminLayout />
              </RoleGuard>
            </AuthGuard>
          }
        >
          <Route path={ROUTES.ADMIN} element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
          <Route path={ROUTES.ADMIN_ANALYTICS} element={<AdminAnalyticsPage />} />
          <Route path={ROUTES.ADMIN_ANALYTICS_CUSTOMERS} element={<AdminCustomerAnalyticsPage />} />
          <Route path={ROUTES.ADMIN_ANALYTICS_PRODUCTS} element={<AdminProductAnalyticsPage />} />
          <Route path={ROUTES.ADMIN_ANALYTICS_REVENUE} element={<AdminRevenueAnalyticsPage />} />
          <Route path={ROUTES.ADMIN_ANALYTICS_CONVERSION} element={<AdminConversionAnalyticsPage />} />
          <Route path={ROUTES.ADMIN_MONITORING} element={<AdminMonitoringPage />} />
          <Route path={ROUTES.ADMIN_MONITORING_LOGS} element={<AdminLogsPage />} />
          <Route path={ROUTES.ADMIN_MONITORING_PERFORMANCE} element={<AdminPerformanceMonitoringPage />} />
          <Route path={ROUTES.ADMIN_MONITORING_ERRORS} element={<AdminErrorsMonitoringPage />} />
          <Route path={ROUTES.ADMIN_CUSTOMERS} element={<AdminCustomersPage />} />
          <Route path={ROUTES.ADMIN_CUSTOMER_EDIT} element={<AdminCustomerEditPage />} />
          <Route path={ROUTES.ADMIN_CUSTOMER_DETAIL} element={<AdminCustomerDetailPage />} />
          <Route path={ROUTES.ADMIN_PRODUCTS} element={<AdminProductsPage />} />
          <Route path={ROUTES.ADMIN_PRODUCT_NEW} element={<AdminProductNewPage />} />
          <Route path={ROUTES.ADMIN_PRODUCT_EDIT} element={<AdminProductEditPage />} />
          <Route path={ROUTES.ADMIN_PRODUCT_DETAIL} element={<AdminProductDetailPage />} />
          <Route
            path={ROUTES.ADMIN_CAMPAIGNS}
            element={
              <FeatureFlagGuard flag={FeatureFlag.VOICE_CAMPAIGNS}>
                <AdminCampaignsPage />
              </FeatureFlagGuard>
            }
          />
          <Route
            path={ROUTES.ADMIN_CAMPAIGN_NEW}
            element={
              <FeatureFlagGuard flag={FeatureFlag.VOICE_CAMPAIGNS}>
                <AdminCampaignNewPage />
              </FeatureFlagGuard>
            }
          />
          <Route
            path={ROUTES.ADMIN_CAMPAIGN_EDIT}
            element={
              <FeatureFlagGuard flag={FeatureFlag.VOICE_CAMPAIGNS}>
                <AdminCampaignEditPage />
              </FeatureFlagGuard>
            }
          />
          <Route
            path={ROUTES.ADMIN_CAMPAIGN_DETAIL}
            element={
              <FeatureFlagGuard flag={FeatureFlag.VOICE_CAMPAIGNS}>
                <AdminCampaignDetailPage />
              </FeatureFlagGuard>
            }
          />
          <Route path={ROUTES.ADMIN_CONFIG} element={<AdminConfigPage />} />
          <Route path={ROUTES.ADMIN_CONFIG_CUSTOMER_TYPES} element={<AdminCustomerTypesConfigPage />} />
          <Route path={ROUTES.ADMIN_CONFIG_LIFE_EVENTS} element={<AdminLifeEventsConfigPage />} />
          <Route path={ROUTES.ADMIN_CONFIG_PRODUCTS} element={<AdminProductsConfigPage />} />
          <Route path={ROUTES.ADMIN_CONFIG_FEATURE_FLAGS} element={<AdminFeatureFlagsPage />} />
          <Route path={ROUTES.ADMIN_REPORTS} element={<AdminReportsPage />} />
          <Route path={ROUTES.ADMIN_REPORT_GENERATE} element={<AdminReportGeneratePage />} />
          <Route path={ROUTES.ADMIN_REPORT_DETAIL} element={<AdminReportDetailPage />} />
          <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminSettingsPage />} />
        </Route>

        {/* ── RM (AuthGuard · RoleGuard(RM) · RMLayout) ─────────────── */}
        <Route
          element={
            <AuthGuard>
              <RoleGuard role={UserRole.RELATIONSHIP_MANAGER}>
                <RMLayout />
              </RoleGuard>
            </AuthGuard>
          }
        >
          <Route path={ROUTES.RM} element={<Navigate to={ROUTES.RM_DASHBOARD} replace />} />
          <Route path={ROUTES.RM_DASHBOARD} element={<RmDashboardPage />} />
          <Route path={ROUTES.RM_PERFORMANCE} element={<RmPerformancePage />} />
          <Route path={ROUTES.RM_TARGETS} element={<RmTargetsPage />} />
          <Route path={ROUTES.RM_CUSTOMERS} element={<RmCustomersPage />} />
          <Route path={ROUTES.RM_CUSTOMER_ENGAGE} element={<RmCustomerEngagePage />} />
          <Route path={ROUTES.RM_CUSTOMER_DETAIL} element={<RmCustomerDetailPage />} />
          <Route path={ROUTES.RM_LEADS} element={<RmLeadsPage />} />
          <Route path={ROUTES.RM_LEAD_CONVERT} element={<RmLeadConvertPage />} />
          <Route path={ROUTES.RM_LEAD_DETAIL} element={<RmLeadDetailPage />} />
          <Route path={ROUTES.RM_TASKS} element={<RmTasksPage />} />
          <Route path={ROUTES.RM_TASK_DETAIL} element={<RmTaskDetailPage />} />
          <Route path={ROUTES.RM_CALENDAR} element={<RmCalendarPage />} />
          <Route path={ROUTES.RM_APPOINTMENTS} element={<RmAppointmentsPage />} />
        </Route>

        {/* ── Error (ErrorLayout) ─────────────────────────────────── */}
        <Route element={<ErrorLayout />}>
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />
          <Route path={ROUTES.SERVER_ERROR} element={<ServerErrorPage />} />
          <Route path={ROUTES.MAINTENANCE} element={<MaintenancePage />} />
          <Route path={ROUTES.OFFLINE} element={<OfflinePage />} />
          <Route path={ROUTES.SESSION_EXPIRED} element={<SessionExpiredPage />} />
        </Route>

        {/* ── Catch-all → 404 ───────────────────────────────────────── */}
        <Route path={ROUTES.CATCH_ALL} element={<NotFoundPage />} />
      </Routes>
      </Suspense>
    </RootLayout>
  );
}

export default AppRoutes;
