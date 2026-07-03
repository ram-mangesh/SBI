// ============================================================================
// Public Pages — Placeholders
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.5 / 2.8
// Marketing & info routes rendered under BlankLayout (no auth).
// Each page is a thin PagePlaceholder until its feature module ships.
// ============================================================================

import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Info,
  Landmark,
  LayoutDashboard,
  Package,
  Phone,
  LifeBuoy,
  FileText,
  Scroll,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  Map as MapIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/core/config/routes.config';
import { PagePlaceholder } from '@/shared/components/feedback/PagePlaceholder';
import { buttonVariants } from '@/shared/components/ui/Button';
import { cn } from '@/core/utils/cn.utils';

const primaryRoutes = [
  {
    label: 'Customer App',
    description: 'Dashboard, recommendations, products, applications and KYC.',
    to: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    tone: 'border-primary-200 bg-primary-50 text-primary-700',
  },
  {
    label: 'AI Chat',
    description: 'Open the SbiSetu Ai copilot and agent conversations.',
    to: ROUTES.CHAT,
    icon: Bot,
    tone: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  {
    label: 'Admin Console',
    description: 'Products, campaigns, analytics, config and monitoring.',
    to: ROUTES.ADMIN_DASHBOARD,
    icon: BarChart3,
    tone: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  {
    label: 'RM Workspace',
    description: 'Customers, leads, tasks, appointments and targets.',
    to: ROUTES.RM_DASHBOARD,
    icon: UsersRound,
    tone: 'border-sky-200 bg-sky-50 text-sky-700',
  },
];

const customerFlow = [
  { label: 'Onboarding', to: ROUTES.ONBOARDING },
  { label: 'Life Events', to: ROUTES.LIFE_EVENTS },
  { label: 'Recommendations', to: ROUTES.RECOMMENDATIONS },
  { label: 'Products', to: ROUTES.PRODUCTS },
  { label: 'Applications', to: ROUTES.APPLICATIONS },
  { label: 'KYC', to: ROUTES.KYC },
  { label: 'Notifications', to: ROUTES.NOTIFICATIONS },
  { label: 'Voice', to: ROUTES.VOICE },
];

const productHighlights = [
  {
    title: 'Life-event banking',
    description: 'Detect moments like education, home purchase or retirement and turn them into guided banking actions.',
    icon: Sparkles,
  },
  {
    title: 'Personalized product fit',
    description: 'Rank loans, cards, deposits and insurance with eligibility, affordability and match score context.',
    icon: CreditCard,
  },
  {
    title: 'Application journey',
    description: 'Move from product choice to document upload, offer review and status tracking in one flow.',
    icon: CheckCircle2,
  },
];

export function HomePage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] text-gray-950">
      <header className="flex items-center justify-between gap-4 py-5">
        <Link to={ROUTES.ROOT} className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
            <Landmark className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-bold leading-5">SbiSetu Ai</span>
            <span className="block text-xs font-medium text-muted-app">Phase 1 banking workspace</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Public navigation">
          <Link className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))} to={ROUTES.PUBLIC_PRODUCTS}>
            Products
          </Link>
          <Link className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))} to={ROUTES.HELP}>
            Help
          </Link>
          <Link className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))} to={ROUTES.LOGIN}>
            Login
          </Link>
        </nav>
      </header>

      <section className="grid gap-8 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase text-primary-700">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Sections 1 to 10 connected
          </span>

          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-normal text-gray-950 sm:text-5xl lg:text-6xl">
            SbiSetu Ai
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            A role-based AI banking frontend with customer journeys, recommendations, applications,
            communication center, admin controls and RM workspaces wired into one route map.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className={cn(buttonVariants({ size: 'lg' }))} to={ROUTES.DASHBOARD}>
              Open Customer Dashboard
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))} to={ROUTES.REGISTER}>
              Create Account
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ['10', 'Blueprint sections'],
              ['4', 'Role workspaces'],
              ['482', 'Phase 1 files mapped'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-black text-gray-950">{value}</p>
                <p className="mt-1 text-xs font-medium uppercase text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm font-bold text-gray-950">Route Launcher</p>
              <p className="mt-1 text-xs text-muted-app">Jump directly into any workspace.</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
              Ready
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {primaryRoutes.map((route) => {
              const Icon = route.icon;

              return (
                <Link
                  key={route.to}
                  to={route.to}
                  className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition hover:border-primary-300 hover:bg-primary-50"
                >
                  <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border', route.tone)}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-gray-950">{route.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-gray-500">{route.description}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-primary-600" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-4 border-t border-gray-100 py-8 lg:grid-cols-3">
        {productHighlights.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-base font-bold text-gray-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-5 border-t border-gray-100 py-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-bold uppercase text-primary-700">Customer route flow</p>
          <h2 className="mt-2 text-2xl font-black text-gray-950">Every main journey has a direct route.</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Use these links to test Section 5 through Section 10 screens quickly from the landing page.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {customerFlow.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
            >
              {item.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-lg border border-gray-200 bg-gray-950 p-5 text-white sm:p-6">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold text-emerald-300">Developer route shortcuts</p>
            <h2 className="mt-2 text-2xl font-black">Start from the route that matches your test.</h2>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              Customer pages may redirect if auth/profile guards are active, but the landing now exposes all major entry points.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link className={cn(buttonVariants({ variant: 'secondary' }))} to={ROUTES.LOGIN}>
              <UserRound className="h-4 w-4" aria-hidden="true" />
              Login
            </Link>
            <Link className={cn(buttonVariants({ variant: 'outline' }), 'border-white/30 bg-transparent text-white hover:bg-white/10')} to={ROUTES.ADMIN_DASHBOARD}>
              <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
              Admin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function AboutPage() {
  return (
    <PagePlaceholder
      icon={Info}
      badge="Public"
      title="About BankMate AI"
      description="Company story, mission and the team building intelligent banking for India."
    />
  );
}

export function PublicProductsPage() {
  return (
    <PagePlaceholder
      icon={Landmark}
      badge="Public"
      title="Banking Products"
      description="Browse savings accounts, loans, cards and investments available to everyone — no sign-in required."
    />
  );
}

export function PublicProductDetailPage() {
  return (
    <PagePlaceholder
      icon={Package}
      badge="Public"
      title="Product Details"
      description="Public product overview: features, eligibility and fees. Sign in to apply or get a personalized recommendation."
    />
  );
}

export function ContactPage() {
  return (
    <PagePlaceholder
      icon={Phone}
      badge="Public"
      title="Contact Us"
      description="Reach our support team via phone, email or chat. Office locations and response-time SLAs."
    />
  );
}

export function HelpPage() {
  return (
    <PagePlaceholder
      icon={LifeBuoy}
      badge="Public"
      title="Help Center"
      description="Searchable knowledge base with FAQs, how-to guides and video tutorials."
    />
  );
}

export function HelpArticlePage() {
  return (
    <PagePlaceholder
      icon={FileText}
      badge="Public"
      title="Help Article"
      description="Individual support article with step-by-step instructions and related topics."
    />
  );
}

export function TermsPage() {
  return (
    <PagePlaceholder
      icon={Scroll}
      badge="Legal"
      title="Terms of Service"
      description="The terms governing your use of BankMate AI products and services."
    />
  );
}

export function PrivacyPage() {
  return (
    <PagePlaceholder
      icon={ShieldCheck}
      badge="Legal"
      title="Privacy Policy"
      description="How we collect, use and protect your personal and financial data."
    />
  );
}

export function SitemapPage() {
  return (
    <PagePlaceholder
      icon={MapIcon}
      badge="Public"
      title="Sitemap"
      description="Index of all public pages on BankMate AI for easy navigation and search indexing."
    />
  );
}
