// ============================================================================
// Core Types — Barrel Export
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §6
// ============================================================================

// ── API ────────────────────────────────────────────────────────────────
export type {
  ApiRequestConfig,
  PaginationParams,
  DateRangeParams,
  BaseListParams,
  LoginRequest,
  RegisterRequest,
  VerifyOtpRequest,
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AnalyticsEventRequest,
} from './api/request.types';

export type {
  ApiResponse,
  PaginatedResponse,
  ApiErrorResponse,
  AuthSessionResponse,
  SessionUser,
  OtpResponse,
  RefreshTokenResponse,
  HealthResponse,
} from './api/response.types';

// ── Domain ──────────────────────────────────────────────────────────────
export type {
  CustomerProfile,
  FinancialProfile,
  CustomerTypeDetails,
} from './domain/customer.types';

export type {
  LifeEvent,
  DetectedLifeEvent,
  LifeEventStage,
  LifeEventStageUpdate,
} from './domain/life-event.types';

export type {
  Product,
  ProductFeature,
  ProductFilters,
  ProductComparisonItem,
} from './domain/product.types';

export type {
  Recommendation,
  RecommendationFilters,
  RecommendationStatus,
  MatchScoreLevel,
} from './domain/recommendation.types';

export type {
  Application,
  ApplicationFormData,
  ApplicationStatus,
  ApplicationStep,
  ApplicationDocument,
  ApplicationOffer,
} from './domain/application.types';

export type {
  KYCVerificationStatus,
  KYCDocument,
  KYCProfile,
} from './domain/kyc.types';

export type {
  Transaction,
  TransactionType,
  TransactionStatus,
  TransactionFilters,
  CategoryBreakdown,
} from './domain/transaction.types';

export type {
  ChatMessage,
  AgentType,
  MessageRole,
  MessageStatus,
  ConversationSummary,
  ChatAgent,
} from './domain/chat.types';

export type {
  Notification,
  NotificationPreferences,
  NotificationReadStatus,
  CommunicationRecord,
  Campaign,
} from './domain/notification.types';

export type {
  VoiceCampaign,
  VoiceCampaignStatus,
  CallRecord,
  CallStatus,
  VoicePreferences,
} from './domain/voice.types';

export type {
  Goal,
  GoalStatus,
  GoalType,
  GoalMilestone,
} from './domain/goal.types';

export type {
  MetricsCard,
  ChartDataPoint,
  DashboardWidgetData,
  AdminMetrics,
} from './domain/analytics.types';

// ── UI ──────────────────────────────────────────────────────────────────
export type {
  ThemeMode,
  ResolvedTheme,
  ThemeContextValue,
  BadgeColor,
  StatusColor,
  ButtonVariant,
  ButtonSize,
  ComponentSize,
} from './ui/theme.types';

export type {
  Size,
  ClassNameProp,
  LoadingState,
  ErrorState,
  AsyncState,
  SelectOption,
  BreadCrumbItem,
  StepItem,
  EmptyStateProps,
  PaginatedMeta,
} from './ui/component.types';
