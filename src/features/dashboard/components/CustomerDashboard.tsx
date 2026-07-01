import type { ComponentType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Bot,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  CircleAlert,
  CreditCard,
  FileCheck2,
  HeartPulse,
  Landmark,
  MessageSquare,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  WalletCards,
} from 'lucide-react';
import { ROUTES, routeBuilders } from '@/core/config/routes.config';
import { cn } from '@/core/utils/cn.utils';
import { WidgetContainer } from '@/shared/components/layout';
import { useAuthStore } from '@/store/auth.store';

type Tone = 'primary' | 'success' | 'warning' | 'error' | 'muted';

interface MetricItem {
  label: string;
  value: string;
  helper: string;
  tone: Tone;
}

interface RecommendationItem {
  id: string;
  productId: string;
  title: string;
  category: string;
  matchScore: number;
  reason: string;
  affordability: string;
  eligibility: string;
}

interface GoalItem {
  title: string;
  progress: number;
  target: string;
  status: string;
}

interface ActivityItem {
  label: string;
  amount: string;
  meta: string;
  tone: Tone;
}

interface QuickActionItem {
  label: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
}

const metrics: MetricItem[] = [
  { label: 'Available savings', value: 'INR 4.8L', helper: 'Up 12% from last month', tone: 'success' },
  { label: 'Monthly cashflow', value: 'INR 82K', helper: 'Salary received 2 days ago', tone: 'primary' },
  { label: 'Credit readiness', value: 'Good', helper: 'Eligible for pre-approved offers', tone: 'success' },
  { label: 'Liability ratio', value: '28%', helper: 'Within recommended range', tone: 'warning' },
];

const recommendations: RecommendationItem[] = [
  {
    id: 'rec-home-topup',
    productId: 'home-loan-topup',
    title: 'Home Loan Top-up',
    category: 'Loan',
    matchScore: 94,
    reason: 'Your salary stability and low liability ratio make this a strong fit.',
    affordability: 'EMI within 34% of income',
    eligibility: 'Pre-qualified',
  },
  {
    id: 'rec-savings-plus',
    productId: 'savings-plus',
    title: 'Savings Plus Account',
    category: 'Account',
    matchScore: 88,
    reason: 'Higher monthly balance can earn better bundled benefits.',
    affordability: 'No EMI impact',
    eligibility: 'Instant eligible',
  },
  {
    id: 'rec-credit-card',
    productId: 'travel-credit-card',
    title: 'Travel Rewards Card',
    category: 'Credit Card',
    matchScore: 81,
    reason: 'Recent travel spends indicate rewards can offset annual fees.',
    affordability: 'Low risk',
    eligibility: 'Likely eligible',
  },
];

const goals: GoalItem[] = [
  { title: 'Home down payment', progress: 68, target: 'INR 12L by Dec 2026', status: 'On track' },
  { title: 'Emergency fund', progress: 42, target: 'INR 6L target', status: 'Needs INR 18K/month' },
  { title: 'Vacation fund', progress: 76, target: 'INR 2.5L target', status: 'Ahead by 1 month' },
];

const activities: ActivityItem[] = [
  { label: 'Salary credit', amount: '+INR 82,000', meta: 'Savings account · 2 days ago', tone: 'success' },
  { label: 'Home EMI', amount: '-INR 31,500', meta: 'Loan account · 5 days ago', tone: 'muted' },
  { label: 'Mutual fund SIP', amount: '-INR 12,000', meta: 'Investment · 7 days ago', tone: 'primary' },
  { label: 'Utility payment', amount: '-INR 4,280', meta: 'Bills · 8 days ago', tone: 'warning' },
];

const quickActions: QuickActionItem[] = [
  { label: 'Apply for product', to: ROUTES.PRODUCTS, icon: Landmark },
  { label: 'Upload KYC', to: ROUTES.KYC_UPLOAD, icon: Upload },
  { label: 'Ask AI', to: ROUTES.CHAT, icon: MessageSquare },
  { label: 'Create goal', to: ROUTES.GOAL_NEW, icon: Target },
  { label: 'View offers', to: ROUTES.RECOMMENDATIONS, icon: Sparkles },
  { label: 'Track application', to: ROUTES.APPLICATIONS, icon: FileCheck2 },
];

function toneClasses(tone: Tone): string {
  const map: Record<Tone, string> = {
    primary: 'bg-primary-50 text-primary-800 border-primary-100',
    success: 'bg-success-light text-success-dark border-success/20',
    warning: 'bg-warning-light text-warning-dark border-warning/20',
    error: 'bg-error-light text-error-dark border-error/20',
    muted: 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return map[tone];
}

function ProgressBar({ value, tone = 'primary' }: { value: number; tone?: Tone }) {
  const colorClass: Record<Tone, string> = {
    primary: 'bg-primary-600',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    muted: 'bg-gray-400',
  };

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
      <div
        className={cn('h-full rounded-full', colorClass[tone])}
        style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
      />
    </div>
  );
}

function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800">
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function WelcomeArea() {
  const user = useAuthStore((state) => state.user);
  const profileCompletionPct = useAuthStore((state) => state.profileCompletionPct);
  const kycStatus = useAuthStore((state) => state.kycStatus);
  const firstName = user?.fullName?.split(' ')[0] || 'there';
  const profilePct = Math.max(profileCompletionPct, user?.profileCompleted ? 100 : 72);
  const kycLabel = kycStatus || user?.kycStatus || 'PENDING';

  return (
    <section className="bm-widget border-primary-100 bg-primary-50/60">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-3 py-1 text-xs font-semibold text-primary-800">
            <Bot className="h-3.5 w-3.5" aria-hidden="true" />
            Next best action ready
          </div>
          <h1 className="text-2xl font-bold text-gray-950">Good to see you, {firstName}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
            Your dashboard is prioritizing home finance, profile completion, and pending application actions from your current banking context.
          </p>
        </div>
        <div className="grid min-w-0 gap-3 sm:grid-cols-3 lg:min-w-[520px]">
          <div className="rounded-lg border border-white bg-white/80 p-3">
            <p className="text-xs font-medium text-gray-500">Profile</p>
            <p className="mt-1 text-lg font-bold text-gray-950">{profilePct}%</p>
            <ProgressBar value={profilePct} tone={profilePct >= 90 ? 'success' : 'primary'} />
          </div>
          <div className="rounded-lg border border-white bg-white/80 p-3">
            <p className="text-xs font-medium text-gray-500">KYC</p>
            <p className="mt-1 text-lg font-bold text-gray-950">{kycLabel}</p>
            <p className="mt-1 text-xs text-gray-500">Actionable if pending</p>
          </div>
          <div className="rounded-lg border border-white bg-white/80 p-3">
            <p className="text-xs font-medium text-gray-500">AI confidence</p>
            <p className="mt-1 text-lg font-bold text-gray-950">92%</p>
            <p className="mt-1 text-xs text-gray-500">Strong data freshness</p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to={ROUTES.RECOMMENDATIONS}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Review recommendations
        </Link>
        <Link
          to={ROUTES.KYC}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Check KYC
        </Link>
      </div>
    </section>
  );
}

function FinancialSnapshot() {
  return (
    <WidgetContainer
      title="Financial Snapshot"
      description="Summary signals used for recommendations"
      variant="stat"
      actions={<TextLink to={ROUTES.PROFILE_FINANCIAL}>Details</TextLink>}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.label} className={cn('rounded-lg border p-3', toneClasses(metric.tone))}>
            <p className="text-xs font-semibold">{metric.label}</p>
            <p className="mt-1 text-xl font-bold">{metric.value}</p>
            <p className="mt-1 text-xs opacity-80">{metric.helper}</p>
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
}

function LifeEventsBanner() {
  return (
    <WidgetContainer
      title="Life Events"
      description="Detected context shaping today's recommendations"
      variant="list"
      actions={<TextLink to={ROUTES.LIFE_EVENTS}>Manage</TextLink>}
    >
      <div className="rounded-lg border border-warning/20 bg-warning-light p-4 text-warning-dark">
        <div className="flex items-start gap-3">
          <HeartPulse className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">Home purchase planning detected</p>
            <p className="mt-1 text-sm">
              Your savings pattern and recent product views suggest a possible home-buying goal in the next 6-12 months.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link to={ROUTES.LIFE_EVENTS} className="rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
          Confirm event
        </Link>
        <Link to={ROUTES.RECOMMENDATIONS} className="rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
          View related offers
        </Link>
      </div>
    </WidgetContainer>
  );
}

function RecommendationCenter() {
  return (
    <WidgetContainer
      title="AI Recommendation Center"
      description="Ranked by match score, eligibility, affordability, and life-event context"
      variant="recommendation"
      className="xl:col-span-4"
      actions={<TextLink to={ROUTES.RECOMMENDATIONS}>All offers</TextLink>}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {recommendations.map((item) => (
          <article key={item.id} className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-primary-700">{item.category}</p>
                <h3 className="mt-1 text-base font-bold text-gray-950">{item.title}</h3>
              </div>
              <span className="rounded-full bg-success-light px-2.5 py-1 text-xs font-bold text-success-dark">
                {item.matchScore}%
              </span>
            </div>
            <p className="mt-3 min-h-[64px] text-sm leading-5 text-gray-600">{item.reason}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-gray-500">Eligibility</dt>
                <dd className="font-semibold text-gray-900">{item.eligibility}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-gray-500">Affordability</dt>
                <dd className="font-semibold text-gray-900">{item.affordability}</dd>
              </div>
            </dl>
            <div className="mt-4">
              <ProgressBar value={item.matchScore} tone="success" />
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              <Link
                to={routeBuilders.productApply(item.productId)}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary-600 px-4 text-sm font-semibold text-white hover:bg-primary-700"
              >
                Apply now
              </Link>
              <Link
                to={routeBuilders.productDetail(item.productId)}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </WidgetContainer>
  );
}

function GoalTracker() {
  return (
    <WidgetContainer
      title="Goal Tracker"
      description="Progress and AI contribution nudges"
      variant="list"
      actions={<TextLink to={ROUTES.GOALS}>Open</TextLink>}
    >
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.title}>
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{goal.title}</p>
                <p className="text-xs text-gray-500">{goal.target}</p>
              </div>
              <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                {goal.status}
              </span>
            </div>
            <ProgressBar value={goal.progress} tone={goal.progress >= 65 ? 'success' : 'warning'} />
            <p className="mt-1 text-xs text-gray-500">{goal.progress}% funded</p>
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
}

function RecentActivity() {
  return (
    <WidgetContainer
      title="Recent Activity"
      description="Latest account movements"
      variant="list"
      actions={<TextLink to={ROUTES.TRANSACTIONS}>View all</TextLink>}
    >
      <ul className="divide-y divide-gray-100">
        {activities.map((activity) => (
          <li key={activity.label} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
            <div className="flex min-w-0 items-center gap-3">
              <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border', toneClasses(activity.tone))}>
                <ReceiptText className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">{activity.label}</p>
                <p className="truncate text-xs text-gray-500">{activity.meta}</p>
              </div>
            </div>
            <p className="shrink-0 text-sm font-bold text-gray-900">{activity.amount}</p>
          </li>
        ))}
      </ul>
    </WidgetContainer>
  );
}

function QuickActions() {
  return (
    <WidgetContainer title="Quick Actions" description="Common journeys with one tap" variant="list" className="xl:col-span-2">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              to={action.to}
              className="flex min-h-16 items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-sm font-semibold text-gray-800 hover:border-primary-200 hover:bg-primary-50"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </WidgetContainer>
  );
}

function NotificationSummary() {
  return (
    <WidgetContainer
      title="Notifications"
      description="High-priority alerts and nudges"
      variant="list"
      actions={<TextLink to={ROUTES.NOTIFICATIONS}>Inbox</TextLink>}
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-lg border border-primary-100 bg-primary-50 p-3">
          <Bell className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Offer expires in 3 days</p>
            <p className="text-xs text-gray-600">Review your pre-qualified top-up loan offer.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-3">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-gray-900">KYC document review pending</p>
            <p className="text-xs text-gray-600">PAN verification may need updated address proof.</p>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
}

function ApplicationStatus() {
  return (
    <WidgetContainer
      title="Application Status"
      description="Resume and track active journeys"
      variant="timeline"
      actions={<TextLink to={ROUTES.APPLICATIONS}>Track</TextLink>}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success-light text-success-dark">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">Personal loan application</p>
            <p className="text-xs text-gray-500">Approved in principle · Offer ready for review</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warning-light text-warning-dark">
            <CalendarClock className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">Credit card upgrade</p>
            <p className="text-xs text-gray-500">Waiting for income proof · Due by Monday</p>
          </div>
        </div>
        <Link
          to={ROUTES.APPLICATIONS}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Open applications
        </Link>
      </div>
    </WidgetContainer>
  );
}

function FinancialHealthScore() {
  return (
    <WidgetContainer
      title="Financial Health"
      description="Explainable readiness score"
      variant="chart"
      actions={<TextLink to={ROUTES.PROFILE_FINANCIAL}>Improve</TextLink>}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-[10px] border-success bg-success-light text-success-dark">
          <div className="text-center">
            <p className="text-3xl font-bold">82</p>
            <p className="text-xs font-semibold">Healthy</p>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <div className="mb-1 flex items-center justify-between text-xs font-semibold text-gray-600">
              <span>Savings consistency</span>
              <span>88%</span>
            </div>
            <ProgressBar value={88} tone="success" />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs font-semibold text-gray-600">
              <span>Debt comfort</span>
              <span>72%</span>
            </div>
            <ProgressBar value={72} tone="primary" />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs font-semibold text-gray-600">
              <span>Emergency fund</span>
              <span>46%</span>
            </div>
            <ProgressBar value={46} tone="warning" />
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
}

function ProductPortfolio() {
  const portfolio = [
    { label: 'Savings account', icon: PiggyBank, tone: 'success' as Tone, meta: 'Primary relationship' },
    { label: 'Home loan', icon: BriefcaseBusiness, tone: 'primary' as Tone, meta: '48 EMIs remaining' },
    { label: 'Credit card', icon: CreditCard, tone: 'warning' as Tone, meta: 'Upgrade available' },
    { label: 'Fixed deposit', icon: WalletCards, tone: 'muted' as Tone, meta: 'Matures in 9 months' },
  ];

  return (
    <WidgetContainer
      title="Product Portfolio"
      description="Owned products and portfolio opportunities"
      variant="table"
      className="xl:col-span-2"
      actions={<TextLink to={ROUTES.PRODUCTS}>Products</TextLink>}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {portfolio.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
              <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border', toneClasses(item.tone))}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">{item.label}</p>
                <p className="truncate text-xs text-gray-500">{item.meta}</p>
              </div>
            </div>
          );
        })}
      </div>
    </WidgetContainer>
  );
}

function EmptyRecoveryStrip() {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Dashboard data uses safe fallback content</p>
            <p className="text-sm text-gray-500">
              Live APIs can replace these widget payloads without changing routes, guards, or layout architecture.
            </p>
          </div>
        </div>
        <Link to={ROUTES.CHAT} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800">
          Ask AI for help
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function CustomerDashboard() {
  return (
    <div className="space-y-5">
      <WelcomeArea />
      <div className="bm-widget-grid">
        <FinancialSnapshot />
        <LifeEventsBanner />
        <RecommendationCenter />
        <GoalTracker />
        <RecentActivity />
        <QuickActions />
        <NotificationSummary />
        <ApplicationStatus />
        <FinancialHealthScore />
        <ProductPortfolio />
      </div>
      <EmptyRecoveryStrip />
    </div>
  );
}

export default CustomerDashboard;
