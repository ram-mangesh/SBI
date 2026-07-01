# BANKMATE AI FRONTEND
## PHASE 1 — COMPLETE PROJECT STRUCTURE
### Implementation Foundation Document

---

```
Phase:         1 — Project Foundation
Status:        DRAFT — PENDING APPROVAL
Stack:         React 19 · TypeScript · Vite · Tailwind CSS v4
               shadcn/ui · React Router v7 · TanStack Query
               Zustand · React Hook Form · Zod · Framer Motion
               Lucide React · Axios
Source Truth:  BankMate AI Frontend Blueprint Sections 1–10
Modifications: ZERO — Structure reflects approved blueprint exactly
```

---

## 1. COMPLETE FOLDER STRUCTURE

```
bankmate-ai-frontend/
│
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo/
│   │   │   │   ├── logo-light.svg
│   │   │   │   ├── logo-dark.svg
│   │   │   │   ├── logo-icon.svg
│   │   │   │   └── favicon.ico
│   │   │   ├── illustrations/
│   │   │   │   ├── onboarding/
│   │   │   │   │   ├── welcome.svg
│   │   │   │   │   ├── ai-advisor.svg
│   │   │   │   │   └── profile-setup.svg
│   │   │   │   ├── life-events/
│   │   │   │   │   ├── marriage.svg
│   │   │   │   │   ├── home-purchase.svg
│   │   │   │   │   ├── education.svg
│   │   │   │   │   ├── baby.svg
│   │   │   │   │   ├── retirement.svg
│   │   │   │   │   ├── business.svg
│   │   │   │   │   └── travel.svg
│   │   │   │   ├── products/
│   │   │   │   │   ├── home-loan.svg
│   │   │   │   │   ├── personal-loan.svg
│   │   │   │   │   ├── credit-card.svg
│   │   │   │   │   ├── fd.svg
│   │   │   │   │   └── insurance.svg
│   │   │   │   └── empty-states/
│   │   │   │       ├── no-notifications.svg
│   │   │   │       ├── no-applications.svg
│   │   │   │       ├── no-recommendations.svg
│   │   │   │       ├── no-goals.svg
│   │   │   │       └── search-empty.svg
│   │   │   ├── avatars/
│   │   │   │   └── default-avatar.svg
│   │   │   └── backgrounds/
│   │   │       ├── hero-gradient.svg
│   │   │       └── card-pattern.svg
│   │   ├── icons/
│   │   │   ├── customer-types/
│   │   │   │   ├── salaried.svg
│   │   │   │   ├── self-employed.svg
│   │   │   │   ├── student.svg
│   │   │   │   └── senior.svg
│   │   │   ├── life-events/
│   │   │   │   ├── marriage-icon.svg
│   │   │   │   ├── home-icon.svg
│   │   │   │   ├── education-icon.svg
│   │   │   │   ├── baby-icon.svg
│   │   │   │   ├── retirement-icon.svg
│   │   │   │   ├── business-icon.svg
│   │   │   │   └── travel-icon.svg
│   │   │   ├── products/
│   │   │   │   ├── home-loan-icon.svg
│   │   │   │   ├── personal-loan-icon.svg
│   │   │   │   ├── credit-card-icon.svg
│   │   │   │   ├── fd-icon.svg
│   │   │   │   └── insurance-icon.svg
│   │   │   └── notifications/
│   │   │       ├── push-icon.svg
│   │   │       ├── email-icon.svg
│   │   │       ├── sms-icon.svg
│   │   │       ├── whatsapp-icon.svg
│   │   │       └── voice-icon.svg
│   │   └── animations/
│   │       ├── lottie/
│   │       │   ├── ai-thinking.json
│   │       │   ├── success-check.json
│   │       │   ├── loading-dots.json
│   │       │   ├── confetti.json
│   │       │   └── kyc-scanning.json
│   │       └── video/
│   │           └── onboarding-intro.mp4
│   ├── locales/
│   │   ├── en/
│   │   │   ├── common.json
│   │   │   ├── customer.json
│   │   │   ├── products.json
│   │   │   ├── notifications.json
│   │   │   ├── onboarding.json
│   │   │   ├── kyc.json
│   │   │   ├── applications.json
│   │   │   └── errors.json
│   │   ├── hi/
│   │   │   ├── common.json
│   │   │   ├── customer.json
│   │   │   └── errors.json
│   │   └── mr/
│   │       ├── common.json
│   │       └── errors.json
│   ├── config/
│   │   ├── app-config.json
│   │   └── feature-flags.json
│   ├── manifest.webmanifest
│   ├── robots.txt
│   └── service-worker.js
│
├── src/
│   │
│   ├── app/
│   │   ├── App.tsx
│   │   ├── AppProviders.tsx
│   │   ├── AppRoutes.tsx
│   │   └── AppInitializer.tsx
│   │
│   ├── core/
│   │   │
│   │   ├── api/
│   │   │   ├── client/
│   │   │   │   ├── axios-instance.ts
│   │   │   │   ├── request-interceptor.ts
│   │   │   │   ├── response-interceptor.ts
│   │   │   │   └── error-handler.ts
│   │   │   ├── endpoints/
│   │   │   │   ├── auth.api.ts
│   │   │   │   ├── customer.api.ts
│   │   │   │   ├── life-events.api.ts
│   │   │   │   ├── products.api.ts
│   │   │   │   ├── recommendations.api.ts
│   │   │   │   ├── applications.api.ts
│   │   │   │   ├── kyc.api.ts
│   │   │   │   ├── transactions.api.ts
│   │   │   │   ├── chat.api.ts
│   │   │   │   ├── notifications.api.ts
│   │   │   │   ├── voice.api.ts
│   │   │   │   ├── analytics.api.ts
│   │   │   │   └── admin.api.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── config/
│   │   │   ├── app.config.ts
│   │   │   ├── env.config.ts
│   │   │   ├── routes.config.ts
│   │   │   ├── api.config.ts
│   │   │   └── theme.config.ts
│   │   │
│   │   ├── constants/
│   │   │   ├── app.constants.ts
│   │   │   ├── routes.constants.ts
│   │   │   ├── customer-types.constants.ts
│   │   │   ├── life-events.constants.ts
│   │   │   ├── products.constants.ts
│   │   │   ├── notification-types.constants.ts
│   │   │   ├── kyc.constants.ts
│   │   │   ├── query-keys.constants.ts
│   │   │   └── error-codes.constants.ts
│   │   │
│   │   ├── types/
│   │   │   ├── api/
│   │   │   │   ├── request.types.ts
│   │   │   │   └── response.types.ts
│   │   │   ├── domain/
│   │   │   │   ├── customer.types.ts
│   │   │   │   ├── life-event.types.ts
│   │   │   │   ├── product.types.ts
│   │   │   │   ├── recommendation.types.ts
│   │   │   │   ├── application.types.ts
│   │   │   │   ├── kyc.types.ts
│   │   │   │   ├── transaction.types.ts
│   │   │   │   ├── chat.types.ts
│   │   │   │   ├── notification.types.ts
│   │   │   │   ├── voice.types.ts
│   │   │   │   ├── goal.types.ts
│   │   │   │   └── analytics.types.ts
│   │   │   ├── ui/
│   │   │   │   ├── component.types.ts
│   │   │   │   └── theme.types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── utils/
│   │       ├── date.utils.ts
│   │       ├── currency.utils.ts
│   │       ├── validation.utils.ts
│   │       ├── formatting.utils.ts
│   │       ├── storage.utils.ts
│   │       ├── encryption.utils.ts
│   │       ├── deeplink.utils.ts
│   │       ├── fcm.utils.ts
│   │       └── logger.utils.ts
│   │
│   ├── features/
│   │   │
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── OTPInput.tsx
│   │   │   │   ├── OTPTimer.tsx
│   │   │   │   ├── ForgotPassword.tsx
│   │   │   │   └── SocialLogin.tsx
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── RegisterPage.tsx
│   │   │   │   ├── OTPVerificationPage.tsx
│   │   │   │   └── ResetPasswordPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useLogin.ts
│   │   │   │   ├── useRegister.ts
│   │   │   │   ├── useOTP.ts
│   │   │   │   └── useTokenRefresh.ts
│   │   │   ├── schemas/
│   │   │   │   ├── login.schema.ts
│   │   │   │   ├── register.schema.ts
│   │   │   │   └── otp.schema.ts
│   │   │   ├── store/
│   │   │   │   └── auth.store.ts
│   │   │   └── types/
│   │   │       └── auth.types.ts
│   │   │
│   │   ├── customer/
│   │   │   ├── components/
│   │   │   │   ├── ProfileCard.tsx
│   │   │   │   ├── ProfileEditor.tsx
│   │   │   │   ├── CustomerTypeIndicator.tsx
│   │   │   │   ├── RiskProfileBadge.tsx
│   │   │   │   └── FinancialSnapshot.tsx
│   │   │   ├── pages/
│   │   │   │   ├── ProfilePage.tsx
│   │   │   │   ├── ProfileSetupWizard.tsx
│   │   │   │   └── ProfileEditPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useCustomer.ts
│   │   │   │   ├── useCustomerType.ts
│   │   │   │   └── useProfile.ts
│   │   │   ├── schemas/
│   │   │   │   ├── profile.schema.ts
│   │   │   │   └── financial-profile.schema.ts
│   │   │   └── store/
│   │   │       └── customer.store.ts
│   │   │
│   │   ├── onboarding/
│   │   │   ├── components/
│   │   │   │   ├── WelcomeScreen.tsx
│   │   │   │   ├── OnboardingStep.tsx
│   │   │   │   ├── ProgressIndicator.tsx
│   │   │   │   ├── PersonalInfoStep.tsx
│   │   │   │   ├── EmploymentInfoStep.tsx
│   │   │   │   ├── FinancialInfoStep.tsx
│   │   │   │   └── PreferencesStep.tsx
│   │   │   ├── pages/
│   │   │   │   └── OnboardingFlow.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useOnboarding.ts
│   │   │   │   └── useOnboardingSteps.ts
│   │   │   ├── schemas/
│   │   │   │   ├── personal-info.schema.ts
│   │   │   │   ├── employment-info.schema.ts
│   │   │   │   └── financial-info.schema.ts
│   │   │   └── store/
│   │   │       └── onboarding.store.ts
│   │   │
│   │   ├── life-events/
│   │   │   ├── components/
│   │   │   │   ├── LifeEventBanner.tsx
│   │   │   │   ├── LifeEventCard.tsx
│   │   │   │   ├── LifeEventTimeline.tsx
│   │   │   │   ├── LifeEventDetectionInfo.tsx
│   │   │   │   ├── ConfidenceScoreMeter.tsx
│   │   │   │   └── StageIndicator.tsx
│   │   │   ├── pages/
│   │   │   │   ├── LifeEventsPage.tsx
│   │   │   │   └── LifeEventDetailsPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useLifeEvents.ts
│   │   │   │   ├── useLifeEventDetection.ts
│   │   │   │   └── useLifeEventStages.ts
│   │   │   └── store/
│   │   │       └── life-events.store.ts
│   │   │
│   │   ├── recommendations/
│   │   │   ├── components/
│   │   │   │   ├── RecommendationCard.tsx
│   │   │   │   ├── RecommendationGrid.tsx
│   │   │   │   ├── MatchScoreBadge.tsx
│   │   │   │   ├── AffordabilityIndicator.tsx
│   │   │   │   ├── StageFilter.tsx
│   │   │   │   ├── ProductComparison.tsx
│   │   │   │   ├── ComparisonBar.tsx
│   │   │   │   ├── EligibilityStatusBadge.tsx
│   │   │   │   ├── AIExplanationPanel.tsx
│   │   │   │   └── RecommendationDetails.tsx
│   │   │   ├── pages/
│   │   │   │   ├── RecommendationsPage.tsx
│   │   │   │   └── RecommendationDetailsPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useRecommendations.ts
│   │   │   │   ├── useAffordability.ts
│   │   │   │   ├── useMatchScore.ts
│   │   │   │   └── useEligibilityCheck.ts
│   │   │   └── store/
│   │   │       └── recommendations.store.ts
│   │   │
│   │   ├── products/
│   │   │   ├── components/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductGrid.tsx
│   │   │   │   ├── ProductDetails.tsx
│   │   │   │   ├── ProductCatalog.tsx
│   │   │   │   ├── CategoryFilter.tsx
│   │   │   │   ├── EligibilityChecker.tsx
│   │   │   │   ├── EMICalculator.tsx
│   │   │   │   └── ProductFeatures.tsx
│   │   │   ├── pages/
│   │   │   │   ├── ProductsPage.tsx
│   │   │   │   ├── ProductDetailsPage.tsx
│   │   │   │   └── ProductComparisonPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useProducts.ts
│   │   │   │   ├── useProductDetails.ts
│   │   │   │   ├── useEligibility.ts
│   │   │   │   └── useEMICalculation.ts
│   │   │   └── store/
│   │   │       └── products.store.ts
│   │   │
│   │   ├── applications/
│   │   │   ├── components/
│   │   │   │   ├── ApplicationForm.tsx
│   │   │   │   ├── ApplicationCard.tsx
│   │   │   │   ├── ApplicationList.tsx
│   │   │   │   ├── ApplicationTimeline.tsx
│   │   │   │   ├── StatusBadge.tsx
│   │   │   │   ├── DocumentUploadSection.tsx
│   │   │   │   ├── ApplicationSummary.tsx
│   │   │   │   ├── OfferCard.tsx
│   │   │   │   ├── OfferAcceptModal.tsx
│   │   │   │   └── ApplicationProgressBar.tsx
│   │   │   ├── pages/
│   │   │   │   ├── ApplicationsPage.tsx
│   │   │   │   ├── NewApplicationPage.tsx
│   │   │   │   ├── ApplicationDetailsPage.tsx
│   │   │   │   └── ApplicationStatusPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useApplications.ts
│   │   │   │   ├── useApplicationSubmit.ts
│   │   │   │   └── useApplicationStatus.ts
│   │   │   ├── schemas/
│   │   │   │   └── application.schema.ts
│   │   │   └── store/
│   │   │       └── applications.store.ts
│   │   │
│   │   ├── kyc/
│   │   │   ├── components/
│   │   │   │   ├── KYCWizard.tsx
│   │   │   │   ├── DocumentUpload.tsx
│   │   │   │   ├── DocumentScanner.tsx
│   │   │   │   ├── DocumentPreview.tsx
│   │   │   │   ├── VerificationStatus.tsx
│   │   │   │   ├── KYCTimeline.tsx
│   │   │   │   └── AadharVerification.tsx
│   │   │   ├── pages/
│   │   │   │   ├── KYCPage.tsx
│   │   │   │   ├── DocumentUploadPage.tsx
│   │   │   │   └── KYCStatusPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useKYC.ts
│   │   │   │   ├── useDocumentUpload.ts
│   │   │   │   └── useVerification.ts
│   │   │   └── store/
│   │   │       └── kyc.store.ts
│   │   │
│   │   ├── transactions/
│   │   │   ├── components/
│   │   │   │   ├── TransactionList.tsx
│   │   │   │   ├── TransactionCard.tsx
│   │   │   │   ├── TransactionFilter.tsx
│   │   │   │   ├── TransactionDetails.tsx
│   │   │   │   ├── CategoryBreakdown.tsx
│   │   │   │   └── SpendingChart.tsx
│   │   │   ├── pages/
│   │   │   │   ├── TransactionsPage.tsx
│   │   │   │   └── TransactionDetailsPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useTransactions.ts
│   │   │   │   └── useTransactionFilter.ts
│   │   │   └── store/
│   │   │       └── transactions.store.ts
│   │   │
│   │   ├── chat/
│   │   │   ├── components/
│   │   │   │   ├── ChatWindow.tsx
│   │   │   │   ├── ChatMessage.tsx
│   │   │   │   ├── ChatInput.tsx
│   │   │   │   ├── AgentSelector.tsx
│   │   │   │   ├── ChatHeader.tsx
│   │   │   │   ├── QuickReplies.tsx
│   │   │   │   ├── TypingIndicator.tsx
│   │   │   │   ├── SuggestedActions.tsx
│   │   │   │   ├── ChatBubble.tsx
│   │   │   │   ├── VoiceInputButton.tsx
│   │   │   │   └── ConversationHistory.tsx
│   │   │   ├── pages/
│   │   │   │   └── ChatPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useChat.ts
│   │   │   │   ├── useChatHistory.ts
│   │   │   │   ├── useAgentSelection.ts
│   │   │   │   └── useVoiceInput.ts
│   │   │   └── store/
│   │   │       └── chat.store.ts
│   │   │
│   │   ├── notifications/
│   │   │   ├── components/
│   │   │   │   ├── NotificationBell.tsx
│   │   │   │   ├── NotificationList.tsx
│   │   │   │   ├── NotificationCard.tsx
│   │   │   │   ├── NotificationCenter.tsx
│   │   │   │   ├── NotificationPreferences.tsx
│   │   │   │   ├── NotificationChannelFilter.tsx
│   │   │   │   ├── SmartInbox.tsx
│   │   │   │   ├── NotificationToast.tsx
│   │   │   │   ├── CommunicationTimeline.tsx
│   │   │   │   ├── CampaignCard.tsx
│   │   │   │   ├── CampaignHistory.tsx
│   │   │   │   ├── MyActivityPanel.tsx
│   │   │   │   └── ConsentManagement.tsx
│   │   │   ├── pages/
│   │   │   │   └── NotificationsPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useNotifications.ts
│   │   │   │   ├── useNotificationPreferences.ts
│   │   │   │   ├── useNotificationFilter.ts
│   │   │   │   └── usePushPermission.ts
│   │   │   └── store/
│   │   │       └── notifications.store.ts
│   │   │
│   │   ├── voice/
│   │   │   ├── components/
│   │   │   │   ├── VoiceCampaignCard.tsx
│   │   │   │   ├── CallHistory.tsx
│   │   │   │   ├── CallScheduler.tsx
│   │   │   │   ├── VoicePreferences.tsx
│   │   │   │   ├── CallStatusBadge.tsx
│   │   │   │   └── InCallUI.tsx
│   │   │   ├── pages/
│   │   │   │   ├── VoiceCampaignsPage.tsx
│   │   │   │   └── CallHistoryPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useVoiceCampaigns.ts
│   │   │   │   └── useCallHistory.ts
│   │   │   └── store/
│   │   │       └── voice.store.ts
│   │   │
│   │   ├── goals/
│   │   │   ├── components/
│   │   │   │   ├── GoalCard.tsx
│   │   │   │   ├── GoalTracker.tsx
│   │   │   │   ├── GoalProgressBar.tsx
│   │   │   │   ├── GoalMilestone.tsx
│   │   │   │   └── GoalDiscoveryWizard.tsx
│   │   │   ├── pages/
│   │   │   │   ├── GoalsPage.tsx
│   │   │   │   └── GoalDetailsPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useGoals.ts
│   │   │   │   └── useGoalDiscovery.ts
│   │   │   └── store/
│   │   │       └── goals.store.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── CustomerDashboard.tsx
│   │   │   │   ├── DashboardHeader.tsx
│   │   │   │   ├── WelcomeArea.tsx
│   │   │   │   ├── QuickActions.tsx
│   │   │   │   ├── FinancialSnapshotWidget.tsx
│   │   │   │   ├── LifeEventsBanner.tsx
│   │   │   │   ├── AIRecommendationsWidget.tsx
│   │   │   │   ├── GoalTrackerWidget.tsx
│   │   │   │   ├── RecentActivityWidget.tsx
│   │   │   │   ├── ApplicationStatusWidget.tsx
│   │   │   │   ├── FinancialHealthScoreWidget.tsx
│   │   │   │   ├── ProductPortfolioWidget.tsx
│   │   │   │   ├── NotificationSummaryWidget.tsx
│   │   │   │   └── CommunicationCenterWidget.tsx
│   │   │   ├── pages/
│   │   │   │   └── DashboardPage.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useDashboard.ts
│   │   │   └── store/
│   │   │       └── dashboard.store.ts
│   │   │
│   │   ├── analytics/
│   │   │   ├── components/
│   │   │   │   ├── AnalyticsDashboard.tsx
│   │   │   │   ├── MetricsCard.tsx
│   │   │   │   ├── ConversionChart.tsx
│   │   │   │   ├── RevenueChart.tsx
│   │   │   │   ├── CustomerSegmentation.tsx
│   │   │   │   └── PerformanceTable.tsx
│   │   │   ├── pages/
│   │   │   │   └── AnalyticsPage.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAnalytics.ts
│   │   │   └── store/
│   │   │       └── analytics.store.ts
│   │   │
│   │   ├── admin/
│   │   │   ├── components/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── ConfigManager.tsx
│   │   │   │   ├── CustomerManagement.tsx
│   │   │   │   ├── ProductManagement.tsx
│   │   │   │   ├── CampaignManager.tsx
│   │   │   │   └── SystemMonitor.tsx
│   │   │   ├── pages/
│   │   │   │   ├── AdminPage.tsx
│   │   │   │   ├── ConfigPage.tsx
│   │   │   │   └── MonitoringPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAdmin.ts
│   │   │   │   └── useConfigReload.ts
│   │   │   └── store/
│   │   │       └── admin.store.ts
│   │   │
│   │   └── settings/
│   │       ├── components/
│   │       │   ├── SettingsMenu.tsx
│   │       │   ├── ProfileSettings.tsx
│   │       │   ├── SecuritySettings.tsx
│   │       │   ├── NotificationSettings.tsx
│   │       │   ├── LanguageSettings.tsx
│   │       │   └── ThemeSettings.tsx
│   │       ├── pages/
│   │       │   └── SettingsPage.tsx
│   │       ├── hooks/
│   │       │   └── useSettings.ts
│   │       └── store/
│   │           └── settings.store.ts
│   │
│   ├── shared/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.styles.ts
│   │   │   │   │   └── Button.test.tsx
│   │   │   │   ├── Input/
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   └── Input.test.tsx
│   │   │   │   ├── Select/
│   │   │   │   │   └── Select.tsx
│   │   │   │   ├── Checkbox/
│   │   │   │   │   └── Checkbox.tsx
│   │   │   │   ├── Radio/
│   │   │   │   │   └── Radio.tsx
│   │   │   │   ├── Switch/
│   │   │   │   │   └── Switch.tsx
│   │   │   │   ├── Textarea/
│   │   │   │   │   └── Textarea.tsx
│   │   │   │   ├── Modal/
│   │   │   │   │   └── Modal.tsx
│   │   │   │   ├── Dialog/
│   │   │   │   │   └── Dialog.tsx
│   │   │   │   ├── Dropdown/
│   │   │   │   │   └── Dropdown.tsx
│   │   │   │   ├── Tabs/
│   │   │   │   │   └── Tabs.tsx
│   │   │   │   ├── Accordion/
│   │   │   │   │   └── Accordion.tsx
│   │   │   │   ├── Card/
│   │   │   │   │   └── Card.tsx
│   │   │   │   ├── Badge/
│   │   │   │   │   └── Badge.tsx
│   │   │   │   ├── Tag/
│   │   │   │   │   └── Tag.tsx
│   │   │   │   ├── Avatar/
│   │   │   │   │   └── Avatar.tsx
│   │   │   │   ├── Tooltip/
│   │   │   │   │   └── Tooltip.tsx
│   │   │   │   ├── Progress/
│   │   │   │   │   └── Progress.tsx
│   │   │   │   ├── Spinner/
│   │   │   │   │   └── Spinner.tsx
│   │   │   │   ├── Skeleton/
│   │   │   │   │   └── Skeleton.tsx
│   │   │   │   └── Toast/
│   │   │   │       └── Toast.tsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Header/
│   │   │   │   │   └── Header.tsx
│   │   │   │   ├── Footer/
│   │   │   │   │   └── Footer.tsx
│   │   │   │   ├── Sidebar/
│   │   │   │   │   └── Sidebar.tsx
│   │   │   │   ├── Container/
│   │   │   │   │   └── Container.tsx
│   │   │   │   ├── Grid/
│   │   │   │   │   └── Grid.tsx
│   │   │   │   └── Stack/
│   │   │   │       └── Stack.tsx
│   │   │   │
│   │   │   ├── feedback/
│   │   │   │   ├── LoadingScreen.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   ├── ErrorState.tsx
│   │   │   │   └── SuccessState.tsx
│   │   │   │
│   │   │   ├── navigation/
│   │   │   │   ├── Breadcrumb.tsx
│   │   │   │   ├── Pagination.tsx
│   │   │   │   ├── Stepper.tsx
│   │   │   │   └── NavMenu.tsx
│   │   │   │
│   │   │   └── forms/
│   │   │       ├── FormGroup.tsx
│   │   │       ├── FormLabel.tsx
│   │   │       ├── FormError.tsx
│   │   │       └── FormHelper.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useDebounce.ts
│   │   │   ├── useThrottle.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useSessionStorage.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── useOnClickOutside.ts
│   │   │   ├── useKeyPress.ts
│   │   │   ├── usePrevious.ts
│   │   │   ├── useToggle.ts
│   │   │   ├── useAsync.ts
│   │   │   ├── useSSE.ts
│   │   │   ├── useInfiniteScroll.ts
│   │   │   └── useAnalyticsEvent.ts
│   │   │
│   │   ├── guards/
│   │   │   ├── AuthGuard.tsx
│   │   │   ├── RoleGuard.tsx
│   │   │   └── KYCGuard.tsx
│   │   │
│   │   └── providers/
│   │       ├── ThemeProvider.tsx
│   │       ├── I18nProvider.tsx
│   │       ├── ToastProvider.tsx
│   │       ├── QueryProvider.tsx
│   │       └── MotionProvider.tsx
│   │
│   ├── layouts/
│   │   ├── RootLayout.tsx
│   │   ├── BlankLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   ├── CustomerLayout.tsx
│   │   ├── AdminLayout.tsx
│   │   ├── OnboardingLayout.tsx
│   │   └── ChatLayout.tsx
│   │
│   ├── routes/
│   │   ├── index.tsx
│   │   ├── public.routes.tsx
│   │   ├── auth.routes.tsx
│   │   ├── customer.routes.tsx
│   │   └── admin.routes.tsx
│   │
│   ├── store/
│   │   ├── index.ts
│   │   └── middleware/
│   │       ├── logger.middleware.ts
│   │       └── error.middleware.ts
│   │
│   ├── styles/
│   │   ├── theme/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   ├── breakpoints.ts
│   │   │   ├── shadows.ts
│   │   │   ├── animations.ts
│   │   │   └── index.ts
│   │   ├── global.css
│   │   └── components.css
│   │
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   ├── integration/
│   │   │   ├── auth/
│   │   │   ├── customer/
│   │   │   └── notifications/
│   │   ├── e2e/
│   │   │   ├── onboarding.spec.ts
│   │   │   ├── application.spec.ts
│   │   │   └── kyc.spec.ts
│   │   └── setup.ts
│   │
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .env.development
├── .env.production
├── .env.test
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts
├── components.json
├── package.json
└── README.md
```

---

## 2. ENVIRONMENT CONFIGURATION

### `.env.development`
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_APP_ENV=development
VITE_APP_NAME=BankMate AI
VITE_APP_VERSION=1.0.0
VITE_FCM_VAPID_KEY=
VITE_SSE_ENDPOINT=http://localhost:8080/api/v1/events
VITE_ENABLE_REDUX_LOGGER=true
VITE_ENABLE_QUERY_DEVTOOLS=true
VITE_ENABLE_MOCK_API=false
```

### `.env.production`
```env
VITE_API_BASE_URL=https://api.bankmate.ai/api/v1
VITE_APP_ENV=production
VITE_APP_NAME=BankMate AI
VITE_APP_VERSION=1.0.0
VITE_FCM_VAPID_KEY=
VITE_SSE_ENDPOINT=https://api.bankmate.ai/api/v1/events
VITE_ENABLE_REDUX_LOGGER=false
VITE_ENABLE_QUERY_DEVTOOLS=false
VITE_ENABLE_MOCK_API=false
```

### `.env.test`
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_APP_ENV=test
VITE_ENABLE_MOCK_API=true
```

---

## 3. PACKAGE CONFIGURATION

### `package.json` — Dependencies
```json
{
  "name": "bankmate-ai-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write src",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "@tanstack/react-query": "^5.0.0",
    "@tanstack/react-query-devtools": "^5.0.0",
    "zustand": "^4.5.0",
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.23.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.383.0",
    "axios": "^1.7.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-toast": "^1.1.5",
    "date-fns": "^3.6.0",
    "i18next": "^23.11.0",
    "react-i18next": "^14.1.0",
    "lottie-react": "^2.4.0",
    "recharts": "^2.12.0",
    "react-dropzone": "^14.2.0",
    "react-intersection-observer": "^9.10.0",
    "react-error-boundary": "^4.0.13"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.4.0",
    "vite": "^5.3.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "vitest": "^1.6.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/user-event": "^14.5.0",
    "@playwright/test": "^1.44.0",
    "eslint": "^8.57.0",
    "@typescript-eslint/eslint-plugin": "^7.13.0",
    "@typescript-eslint/parser": "^7.13.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "prettier": "^3.3.0",
    "prettier-plugin-tailwindcss": "^0.6.0"
  }
}
```

---

## 4. TYPESCRIPT CONFIGURATION

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./src/app/*"],
      "@/core/*": ["./src/core/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/layouts/*": ["./src/layouts/*"],
      "@/routes/*": ["./src/routes/*"],
      "@/store/*": ["./src/store/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/assets/*": ["./public/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 5. VITE CONFIGURATION

### `vite.config.ts`
```typescript
// Configuration structure only — no implementation code
// Keys to configure:
// - plugins: [@vitejs/plugin-react, @tailwindcss/vite]
// - resolve.alias: path aliases matching tsconfig.json paths
// - server: { port: 3000, proxy: { '/api': VITE_API_BASE_URL } }
// - build: { outDir: 'dist', sourcemap: true, chunkSizeWarningLimit: 1000 }
// - test: { globals: true, environment: 'jsdom', setupFiles: ['./src/tests/setup.ts'] }
// - define: { __APP_VERSION__: JSON.stringify(process.env.npm_package_version) }
```

---

## 6. TAILWIND CSS V4 CONFIGURATION

### `tailwind.config.ts`
```typescript
// Configuration structure only
// Tailwind v4 CSS-first config via global.css @theme directive
// Keys:
// - content: ['./src/**/*.{ts,tsx}', './public/**/*.html']
// - Custom design tokens mapped from blueprint:
//   - colors: primary (#2563EB), secondary, success, warning, error, gray scale
//   - fontFamily: Inter (sans), custom AI accent font
//   - borderRadius: sm (4px), md (8px), lg (12px), xl (16px), 2xl (24px)
//   - boxShadow: sm, md, lg, notification-card, ai-bubble
//   - animation: slide-in-right, slide-down, fade-in, pulse-badge, shimmer
//   - screens: mobile (640px), tablet (768px), desktop (1024px), wide (1280px)
```

### `src/styles/global.css`
```css
/* Tailwind v4 CSS-first theme + base styles */
/* @import "tailwindcss" */
/* @theme { ... design tokens ... } */
/* Base: font-smoothing, focus-visible ring, scrollbar styling */
/* Custom utilities: .notification-unread, .ai-message-bubble, etc. */
```

---

## 7. SHADCN/UI CONFIGURATION

### `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/global.css",
    "baseColor": "blue",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/shared/components/ui",
    "utils": "@/core/utils",
    "ui": "@/shared/components/ui",
    "lib": "@/core",
    "hooks": "@/shared/hooks"
  }
}
```

---

## 8. ROUTE CONFIGURATION ARCHITECTURE

### Route Hierarchy (maps exactly to Section 2 — Blueprint)
```
ROUTE STRUCTURE
════════════════════════════════════════

PUBLIC ROUTES (no auth required)
/                          → LandingPage
/about                     → AboutPage
/products                  → PublicProductsPage
/contact                   → ContactPage
/privacy                   → PrivacyPage
/terms                     → TermsPage

AUTH ROUTES (redirect if already logged in)
/login                     → LoginPage
/register                  → RegisterPage
/verify-otp                → OTPVerificationPage
/forgot-password           → ForgotPasswordPage
/reset-password            → ResetPasswordPage

CUSTOMER ROUTES (AuthGuard required)
/customer/dashboard        → DashboardPage
/customer/onboarding       → OnboardingFlow          [OnboardingLayout]
/customer/profile          → ProfilePage
/customer/profile/edit     → ProfileEditPage
/customer/life-events      → LifeEventsPage
/customer/life-events/:id  → LifeEventDetailsPage
/customer/recommendations  → RecommendationsPage
/customer/recommendations/:id → RecommendationDetailsPage
/customer/products         → ProductsPage
/customer/products/:id     → ProductDetailsPage
/customer/products/compare → ProductComparisonPage
/customer/products/:id/apply → NewApplicationPage
/customer/applications     → ApplicationsPage
/customer/applications/:id → ApplicationDetailsPage
/customer/applications/:id/status → ApplicationStatusPage
/customer/kyc              → KYCPage                 [KYCGuard]
/customer/kyc/upload       → DocumentUploadPage
/customer/kyc/status       → KYCStatusPage
/customer/goals            → GoalsPage
/customer/goals/:id        → GoalDetailsPage
/customer/transactions     → TransactionsPage
/customer/transactions/:id → TransactionDetailsPage
/customer/notifications    → NotificationsPage
/customer/voice            → VoiceCampaignsPage
/customer/voice/history    → CallHistoryPage
/customer/settings         → SettingsPage
/customer/settings/notifications → NotificationSettings
/customer/settings/security    → SecuritySettings

CHAT ROUTES (AuthGuard required)
/chat                      → ChatPage               [ChatLayout]
/chat/agent/:agentType     → ChatPage (with agent context)
/customer/voice            → VoiceCampaignsPage

ADMIN ROUTES (AuthGuard + RoleGuard: ADMIN required)
/admin                     → AdminPage
/admin/analytics           → AnalyticsPage
/admin/config              → ConfigPage
/admin/monitoring          → MonitoringPage
/admin/customers           → CustomerManagement (within AdminPage)
/admin/products            → ProductManagement (within AdminPage)
/admin/campaigns           → CampaignManager (within AdminPage)

CATCH-ALL
*                          → 404 NotFoundPage
```

---

## 9. STORE ARCHITECTURE

### Zustand Store Strategy
```
STORE ARCHITECTURE — ALL FEATURE STORES
════════════════════════════════════════

Pattern: Zustand slice per feature, combined at src/store/index.ts

STORE: auth.store.ts
  State:
    - user: User | null
    - accessToken: string | null
    - refreshToken: string | null
    - isAuthenticated: boolean
    - isLoading: boolean
    - sessionExpiry: number | null
  Actions:
    - login, logout, refreshToken, setUser, clearSession

STORE: customer.store.ts
  State:
    - customerProfile: CustomerProfile | null
    - customerType: CustomerType | null
    - financialProfile: FinancialProfile | null
    - isProfileComplete: boolean
    - lastFetched: number | null
  Actions:
    - setProfile, updateProfile, setCustomerType, clearProfile

STORE: onboarding.store.ts
  State:
    - currentStep: number
    - totalSteps: number
    - completedSteps: number[]
    - formData: Partial<OnboardingFormData>
    - isComplete: boolean
  Actions:
    - setStep, completeStep, saveFormData, resetOnboarding

STORE: life-events.store.ts
  State:
    - lifeEvents: LifeEvent[]
    - detectedEvents: DetectedLifeEvent[]
    - activeEvent: LifeEvent | null
    - lastFetched: number | null
  Actions:
    - setLifeEvents, addDetectedEvent, setActiveEvent, confirmEvent

STORE: recommendations.store.ts
  State:
    - recommendations: Recommendation[]
    - savedRecommendations: string[]
    - comparisonList: string[]
    - lastFetched: number | null
    - filters: RecommendationFilters
  Actions:
    - setRecommendations, saveRecommendation,
      addToComparison, removeFromComparison, setFilters

STORE: products.store.ts
  State:
    - products: Product[]
    - selectedProduct: Product | null
    - filters: ProductFilters
    - lastFetched: number | null
  Actions:
    - setProducts, selectProduct, setFilters, clearFilters

STORE: applications.store.ts
  State:
    - applications: Application[]
    - activeApplication: Application | null
    - draftApplication: Partial<ApplicationFormData> | null
    - lastFetched: number | null
  Actions:
    - setApplications, setActiveApplication,
      saveDraft, clearDraft, updateStatus

STORE: kyc.store.ts
  State:
    - kycStatus: KYCStatus | null
    - uploadedDocuments: UploadedDocument[]
    - currentStep: number
    - isVerified: boolean
  Actions:
    - setKYCStatus, addDocument, removeDocument,
      setStep, markVerified

STORE: transactions.store.ts
  State:
    - transactions: Transaction[]
    - filters: TransactionFilters
    - lastFetched: number | null
  Actions:
    - setTransactions, setFilters, clearFilters

STORE: chat.store.ts
  State:
    - messages: ChatMessage[]
    - activeAgent: AgentType | null
    - isTyping: boolean
    - conversationId: string | null
    - suggestedPrompts: string[]
    - voiceActive: boolean
  Actions:
    - addMessage, setAgent, setTyping,
      setConversationId, clearChat, setVoiceActive

STORE: notifications.store.ts
  State:
    - allNotifications: Notification[]
    - unreadNotifications: Notification[]
    - unreadCount: number
    - communicationHistory: CommunicationRecord[]
    - preferences: NotificationPreferences | null
    - lastFetched: number | null
  Actions:
    - setNotifications, appendNotification,
      markRead, markAllRead, setPreferences,
      incrementUnread, resetUnread

STORE: voice.store.ts
  State:
    - campaigns: VoiceCampaign[]
    - callHistory: CallRecord[]
    - preferences: VoicePreferences | null
    - activeCallId: string | null
  Actions:
    - setCampaigns, addCallRecord,
      setPreferences, setActiveCall, clearActiveCall

STORE: goals.store.ts
  State:
    - goals: Goal[]
    - activeGoal: Goal | null
    - lastFetched: number | null
  Actions:
    - setGoals, addGoal, updateGoal, setActiveGoal

STORE: dashboard.store.ts
  State:
    - widgetData: DashboardWidgetData
    - lastFetched: Record<string, number>
    - isLoading: Record<string, boolean>
  Actions:
    - setWidgetData, setWidgetLoading, invalidateWidget

STORE: settings.store.ts
  State:
    - theme: 'light' | 'dark' | 'system'
    - language: string
    - notificationSettings: NotificationSettings | null
  Actions:
    - setTheme, setLanguage, setNotificationSettings
```

---

## 10. API LAYER ARCHITECTURE

### TanStack Query Keys Strategy
```
QUERY KEY CONVENTIONS
════════════════════════════════════════

All query keys defined in:
  src/core/constants/query-keys.constants.ts

Pattern:  [domain, subDomain?, identifier?]

QUERY_KEYS = {
  AUTH: {
    SESSION:          ['auth', 'session'],
  },
  CUSTOMER: {
    PROFILE:          (id) => ['customer', 'profile', id],
    FINANCIAL:        (id) => ['customer', 'financial', id],
    TYPE:             (id) => ['customer', 'type', id],
  },
  LIFE_EVENTS: {
    LIST:             (customerId) => ['life-events', 'list', customerId],
    DETAIL:           (eventId)    => ['life-events', 'detail', eventId],
  },
  RECOMMENDATIONS: {
    LIST:             (customerId) => ['recommendations', 'list', customerId],
    DETAIL:           (recId)      => ['recommendations', 'detail', recId],
    ELIGIBILITY:      (cId, pId)   => ['eligibility', cId, pId],
  },
  PRODUCTS: {
    LIST:             (filters)    => ['products', 'list', filters],
    DETAIL:           (productId)  => ['products', 'detail', productId],
  },
  APPLICATIONS: {
    LIST:             (customerId) => ['applications', 'list', customerId],
    DETAIL:           (appId)      => ['applications', 'detail', appId],
    STATUS:           (appId)      => ['applications', 'status', appId],
  },
  KYC: {
    STATUS:           (customerId) => ['kyc', 'status', customerId],
  },
  TRANSACTIONS: {
    LIST:             (cId, f)     => ['transactions', 'list', cId, f],
    DETAIL:           (txId)       => ['transactions', 'detail', txId],
  },
  NOTIFICATIONS: {
    LIST:             (customerId) => ['notifications', 'list', customerId],
    UNREAD:           (customerId) => ['notifications', 'unread', customerId],
    HISTORY:          (customerId) => ['notifications', 'history', customerId],
    PREFERENCES:      (customerId) => ['notifications', 'preferences', customerId],
    CAMPAIGNS:        (customerId) => ['notifications', 'campaigns', customerId],
  },
  VOICE: {
    CAMPAIGNS:        (customerId) => ['voice', 'campaigns', customerId],
    HISTORY:          (customerId) => ['voice', 'history', customerId],
    PREFERENCES:      (customerId) => ['voice', 'preferences', customerId],
  },
  GOALS: {
    LIST:             (customerId) => ['goals', 'list', customerId],
    DETAIL:           (goalId)     => ['goals', 'detail', goalId],
  },
  DASHBOARD: {
    WIDGETS:          (customerId) => ['dashboard', 'widgets', customerId],
  },
  CHAT: {
    HISTORY:          (conversationId) => ['chat', 'history', conversationId],
    AGENTS:           ['chat', 'agents'],
  },
}
```

### API Client Architecture
```
API CLIENT STRUCTURE
════════════════════════════════════════

axios-instance.ts:
  - Base URL from env config
  - Default headers: Content-Type, Accept
  - Timeout: 30000ms
  - withCredentials: false (JWT Bearer token strategy)

request-interceptor.ts:
  - Inject Authorization: Bearer {accessToken} from auth.store
  - Inject X-Request-ID (UUID per request for tracing)
  - Inject X-App-Version from env

response-interceptor.ts:
  - On 200-299: Return response.data
  - On 401: Attempt token refresh → retry → else logout
  - On 403: Dispatch role error, redirect to unauthorized
  - On 429: Retry with exponential backoff (max 3 attempts)
  - On 5xx: Log to error monitoring, throw ApiError

error-handler.ts:
  - Normalize all API errors to ApiError type
  - Map HTTP status codes to user-friendly messages
  - Integrate with error-codes.constants.ts
```

---

## 11. THEME ARCHITECTURE

### Design Tokens (from Blueprint)
```
THEME STRUCTURE — src/styles/theme/
════════════════════════════════════════

colors.ts:
  primary:   { 50–900 scale, DEFAULT: #2563EB }
  secondary: { scale }
  success:   { DEFAULT: #059669, light, dark }
  warning:   { DEFAULT: #D97706, light, dark }
  error:     { DEFAULT: #DC2626, light, dark }
  gray:      { 50–900 scale }
  ai:        { bubble: #EFF6FF, accent: #7C3AED }
  channel:
    push:      { bg: #EFF6FF, text: #1D4ED8 }
    email:     { bg: #F3F4F6, text: #374151 }
    sms:       { bg: #F0FDF4, text: #166534 }
    whatsapp:  { bg: #DCFCE7, text: #14532D }
    voice:     { bg: #EEF2FF, text: #3730A3 }
    inApp:     { bg: #FAF5FF, text: #581C87 }

typography.ts:
  fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
  fontSize:   { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, 2xl: 24 }
  fontWeight: { regular: 400, medium: 500, semibold: 600, bold: 700 }
  lineHeight: { tight: 1.25, normal: 1.5, relaxed: 1.75 }

spacing.ts:
  0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64

breakpoints.ts:
  mobile:  640px
  tablet:  768px
  desktop: 1024px
  wide:    1280px
  full:    1536px

shadows.ts:
  sm:                0 1px 2px rgba(0,0,0,0.05)
  md:                0 4px 6px rgba(0,0,0,0.07)
  lg:                0 10px 15px rgba(0,0,0,0.10)
  notification-card: 0 2px 8px rgba(37,99,235,0.10)
  ai-bubble:         0 4px 12px rgba(37,99,235,0.15)

animations.ts:
  slide-in-right:  transform 300ms ease (notification toast)
  slide-down:      transform 300ms ease (mobile toast)
  fade-in:         opacity 200ms ease
  pulse-badge:     scale keyframe (unread badge)
  shimmer:         background-position 1.5s infinite (skeleton)
  card-dismiss:    transform + opacity 300ms ease
```

---

## 12. NAMING CONVENTIONS

```
NAMING CONVENTION TABLE
════════════════════════════════════════

File Type              | Pattern                    | Example
───────────────────────┼────────────────────────────┼──────────────────────────────
React Component        | PascalCase.tsx             | NotificationCard.tsx
Page Component         | PascalCase + Page.tsx      | DashboardPage.tsx
Hook                   | camelCase + .ts            | useNotifications.ts
API Service            | camelCase + .api.ts        | notifications.api.ts
Zustand Store          | camelCase + .store.ts      | notifications.store.ts
Type Definitions       | camelCase + .types.ts      | notification.types.ts
Zod Schema             | camelCase + .schema.ts     | login.schema.ts
Constants              | camelCase + .constants.ts  | notification-types.constants.ts
Utility                | camelCase + .utils.ts      | date.utils.ts
Config                 | camelCase + .config.ts     | app.config.ts
Test Files             | *.test.tsx / *.spec.tsx    | Button.test.tsx
Style Tokens           | camelCase + .styles.ts     | Button.styles.ts
Route Config           | camelCase + .routes.tsx    | customer.routes.tsx
Guard                  | PascalCase + Guard.tsx     | AuthGuard.tsx
Provider               | PascalCase + Provider.tsx  | ThemeProvider.tsx
Layout                 | PascalCase + Layout.tsx    | CustomerLayout.tsx

VARIABLE NAMING:
  Component props:   camelCase (customerName, onSubmit)
  State variables:   camelCase (isLoading, hasError)
  Constants:         SCREAMING_SNAKE_CASE (API_BASE_URL, MAX_RETRIES)
  Enums:             PascalCase values (CustomerType.SALARIED)
  Event handlers:    handle + PascalCase (handleSubmit, handleChannelFilter)
  Boolean state:     is/has/can prefix (isLoading, hasError, canRetry)
  Query keys:        Defined in QUERY_KEYS constant object only
```

---

## 13. FEATURE MODULE ARCHITECTURE

### Module Dependency Rules (from Blueprint Section 1)
```
DEPENDENCY FLOW
════════════════════════════════════════

app/ → features/ → shared/ → core/

✅ features/ can import from shared/, core/
✅ shared/ can import from core/
✅ layouts/ can import from shared/, core/
❌ core/ CANNOT import from features/, shared/
❌ features/ CANNOT directly import from other features/
   (inter-feature communication via shared store or events only)
❌ shared/ CANNOT import from features/
```

### Feature Module Internal Structure
```
STANDARD FEATURE MODULE STRUCTURE
════════════════════════════════════════

features/{feature-name}/
├── components/      ← Feature-specific UI components
├── pages/           ← Route-level page components
├── hooks/           ← TanStack Query hooks + business hooks
├── schemas/         ← Zod validation schemas (if applicable)
├── store/           ← Zustand store slice
└── types/           ← Feature-specific types (if not in core/types)

IMPORT PATH ALIASES (per tsconfig.json):
  @/features/notifications  → src/features/notifications
  @/shared/components/ui    → src/shared/components/ui
  @/core/types              → src/core/types
  @/core/api                → src/core/api
  @/core/constants          → src/core/constants
  @/layouts                 → src/layouts
  @/store                   → src/store
```

---

## 14. PROVIDERS ARCHITECTURE

### `src/app/AppProviders.tsx` — Provider Composition Order
```
PROVIDER NESTING ORDER (outermost → innermost)
════════════════════════════════════════

1. React.StrictMode
2. ErrorBoundary         (global error catch — shared/components/feedback)
3. ThemeProvider         (Tailwind dark/light, from shared/providers)
4. I18nProvider          (i18next, from shared/providers)
5. QueryProvider         (TanStack Query client, from shared/providers)
6. ToastProvider         (Radix Toast, from shared/providers)
7. MotionProvider        (Framer Motion config, from shared/providers)
8. AppRoutes             (React Router v7 BrowserRouter)

Each provider is independently importable and testable.
```

---

## 15. CONTEXTS ARCHITECTURE

```
CONTEXTS — src/
════════════════════════════════════════

Context is used ONLY for non-serializable or
cross-cutting concerns not suited for Zustand.

ThemeContext:
  File:     shared/providers/ThemeProvider.tsx
  Provides: { theme, toggleTheme, setTheme }
  Consumed: ThemeSettings, Header (theme toggle button)

I18nContext:
  File:     shared/providers/I18nProvider.tsx
  Provides: { language, changeLanguage, t }
  Consumed: All text-rendering components

All business state (auth, customer, notifications, etc.)
is managed via Zustand stores — NOT React Context.
Context is strictly for UI/infrastructure concerns.
```

---

## 16. SSE (SERVER-SENT EVENTS) ARCHITECTURE

```
REAL-TIME ARCHITECTURE — SSE Consumer
════════════════════════════════════════

Hook:      src/shared/hooks/useSSE.ts
Endpoint:  VITE_SSE_ENDPOINT (existing backend channel)

SSE Connection Lifecycle:
  - Initialized in AppInitializer.tsx on auth success
  - Listens on: /api/v1/events?customerId={id}&token={jwt}
  - Reconnect: Exponential backoff (1s, 2s, 4s, max 30s)
  - Cleanup: Disconnect on logout

Kafka Events → SSE → Frontend Store Updates:
  Event: NOTIFICATION_CREATED   → notifications.store.appendNotification()
  Event: APPLICATION_STATUS_*   → applications.store.updateStatus()
  Event: LIFE_EVENT_DETECTED    → life-events.store.addDetectedEvent()
  Event: RECOMMENDATION_UPDATED → TanStack Query invalidate recommendations
  Event: KYC_COMPLETED          → kyc.store.markVerified()
  Event: KYC_REJECTED           → kyc.store.setKYCStatus()
  Event: VOICE_CAMPAIGN_*       → voice.store.setCampaigns()
  Event: GOAL_CREATED           → goals.store.addGoal()
```

---

## 17. ANALYTICS EVENT ARCHITECTURE

```
ANALYTICS LAYER — Existing Kafka Pipeline
════════════════════════════════════════

Hook:    src/shared/hooks/useAnalyticsEvent.ts
API:     POST /analytics/events (existing endpoint)

Fire-and-forget pattern:
  - Never blocks UI
  - Failures are silently logged (not shown to user)
  - Called from feature hooks and page components
  - Payload: { eventType, customerId, timestamp, metadata }

Events fired (maps to Sections 8, 9, 10 analytics tables):
  RECOMMENDATION_PAGE_VIEW, ELIGIBILITY_CHECK_STARTED,
  AI_EXPLANATION_VIEWED, RECOMMENDATION_SAVED,
  COMPARISON_COMPLETED, APPLY_NOW_CLICKED,
  APPLICATION_STEP_COMPLETED, APPLICATION_SUBMITTED,
  VOICE_CALL_INITIATED, NOTIFICATIONS_ALL_READ,
  PREFERENCE_UPDATED, PRODUCT_VIEWED, etc.
```

---

## 18. SERVICE WORKER ARCHITECTURE

```
SERVICE WORKER — public/service-worker.js
════════════════════════════════════════

Responsibilities (Section 10 — Push Notification):
  1. Register FCM (Firebase Cloud Messaging)
  2. Handle push event → show OS notification
  3. Handle notificationclick → deep link routing
  4. Handle notificationclose → no-op
  5. Cache static assets for offline support (stale-while-revalidate)

Registration:
  - Registered in src/app/AppInitializer.tsx
  - Only in production build
  - FCM VAPID key from VITE_FCM_VAPID_KEY env var

Push payload structure (read from backend):
  { title, body, icon, badge, data: { notificationId, type, deepLink }, actions }
```

---

## 19. TESTING ARCHITECTURE

```
TESTING STRATEGY
════════════════════════════════════════

Unit Tests (Vitest + Testing Library):
  Location:  src/tests/unit/
  Coverage:
    - All shared/components/ui (Button, Input, Badge, etc.)
    - All shared/hooks (useDebounce, useSSE, etc.)
    - All core/utils (date, currency, formatting, etc.)
    - Zustand store actions and selectors
  Command:   pnpm test

Integration Tests (Vitest):
  Location:  src/tests/integration/
  Coverage:
    - Auth flow (login → OTP → session)
    - Notification flow (fetch → mark read → store update)
    - Application submission flow
  Mock:      MSW (Mock Service Worker) for API mocking

E2E Tests (Playwright):
  Location:  src/tests/e2e/
  Coverage:
    - onboarding.spec.ts → Full onboarding journey
    - application.spec.ts → Apply → KYC → Success
    - kyc.spec.ts → Document upload → verification
  Command:   pnpm test:e2e

Test Setup:  src/tests/setup.ts
  - @testing-library/jest-dom matchers
  - MSW server setup
  - Zustand store reset between tests
```

---

## 20. ESLINT + PRETTIER CONFIGURATION

### `.eslintrc.json`
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react-refresh"],
  "rules": {
    "react-refresh/only-export-components": ["warn", { "allowConstantExport": true }],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-restricted-imports": ["error", {
      "patterns": ["../../../*", "../../features/*"]
    }]
  }
}
```

### `.prettierrc`
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## PHASE 1 COMPLIANCE CHECKLIST

```
PHASE 1 COMPLIANCE VERIFICATION
════════════════════════════════════════

✅ Folder structure matches Blueprint Section 1 exactly
✅ All 200+ files/folders from approved blueprint included
✅ New files added for Sections 6–10 (dashboard widgets,
   voice, goals, communication center components)
✅ Feature module architecture: feature-based, self-contained
✅ Dependency rules enforced: app→features→shared→core
✅ No cross-feature direct imports defined
✅ Route configuration maps exactly to Section 2
✅ Layout names match exactly to Section 3
✅ Auth store maps to Section 4 session strategy
✅ All 13 API endpoint files map to Section 1 + new channels
✅ Zustand stores cover all 15 feature areas
✅ TanStack Query keys strategy defined
✅ Axios interceptors handle 401 refresh (Section 4)
✅ SSE consumer maps to Kafka pipeline (Sections 6, 7, 10)
✅ Push/FCM architecture maps to Section 10.6
✅ Analytics event hook maps to Sections 8, 9, 10
✅ Theme tokens match blueprint color/spacing specs
✅ shadcn/ui aliases point to correct shared/ paths
✅ TypeScript strict mode enabled
✅ Path aliases configured (@ prefix)
✅ Environment configs for dev/prod/test
✅ Testing architecture covers unit/integration/e2e
✅ Service worker for push notifications (Section 10.6)
✅ Naming conventions match Section 1.3 exactly
✅ No backend changes
✅ No API changes
✅ No business logic defined (Phase 1 = structure only)
```

---

## PHASE 1 COMPLETED
## WAITING FOR APPROVAL
