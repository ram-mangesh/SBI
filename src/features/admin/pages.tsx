// ============================================================================
// Admin Pages — Placeholders
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.5 / 2.8
// /admin/* routes rendered under AdminLayout behind AuthGuard + RoleGuard(ADMIN).
// Each page is a thin PagePlaceholder until its feature module ships.
// ============================================================================

import {
  LayoutDashboard,
  Users,
  Package,
  SlidersHorizontal,
  Megaphone,
  BarChart3,
  Activity,
  FileBarChart,
  Settings,
  UserCog,
  PlusCircle,
  FilePenLine,
  ClipboardList,
  Flag,
  LineChart,
  AlertTriangle,
} from 'lucide-react';
import { PagePlaceholder } from '@/shared/components/feedback/PagePlaceholder';

// ── Overview ──────────────────────────────────────────────────────────────
export function AdminDashboardPage() {
  return (
    <PagePlaceholder
      icon={LayoutDashboard}
      badge="Admin"
      title="Admin Dashboard"
      description="Platform-wide KPIs: active users, transaction volume, system health and live operational alerts."
    />
  );
}

export function AdminAnalyticsPage() {
  return (
    <PagePlaceholder
      icon={BarChart3}
      badge="Admin"
      title="Analytics"
      description="Cohort analysis, funnel metrics and product engagement trends across the customer base."
    />
  );
}

export function AdminMonitoringPage() {
  return (
    <PagePlaceholder
      icon={Activity}
      badge="Admin"
      title="System Monitoring"
      description="Real-time service health, latency, error rates and incident timeline for all backend services."
    />
  );
}

// ── Manage ────────────────────────────────────────────────────────────────
export function AdminCustomersPage() {
  return (
    <PagePlaceholder
      icon={Users}
      badge="Admin"
      title="Customer Management"
      description="Search, filter and manage every customer account — status, KYC, assignments and audit trail."
    />
  );
}

export function AdminCustomerDetailPage() {
  return (
    <PagePlaceholder
      icon={UserCog}
      badge="Admin"
      title="Customer Detail"
      description="Full customer profile, products, KYC, activity timeline and audit context."
    />
  );
}

export function AdminCustomerEditPage() {
  return (
    <PagePlaceholder
      icon={FilePenLine}
      badge="Admin"
      title="Edit Customer"
      description="Admin-managed customer corrections with audit logging and approval controls."
    />
  );
}

export function AdminProductsPage() {
  return (
    <PagePlaceholder
      icon={Package}
      badge="Admin"
      title="Product Catalog"
      description="Create and maintain banking products: rates, eligibility rules, fees and publishing state."
    />
  );
}

export function AdminProductNewPage() {
  return (
    <PagePlaceholder
      icon={PlusCircle}
      badge="Admin"
      title="New Product"
      description="Create a banking product with rates, fees, eligibility and publishing controls."
    />
  );
}

export function AdminProductDetailPage() {
  return (
    <PagePlaceholder
      icon={Package}
      badge="Admin"
      title="Product Detail"
      description="Inspect product configuration, eligibility rules and current publication state."
    />
  );
}

export function AdminProductEditPage() {
  return (
    <PagePlaceholder
      icon={FilePenLine}
      badge="Admin"
      title="Edit Product"
      description="Update product metadata, rates, rules and disclosure content."
    />
  );
}

// ── Campaigns ─────────────────────────────────────────────────────────────
export function AdminCampaignsPage() {
  return (
    <PagePlaceholder
      icon={Megaphone}
      badge="Admin"
      title="Campaigns"
      description="Design, schedule and measure voice & messaging campaigns targeting customer segments."
    />
  );
}

export function AdminCampaignNewPage() {
  return (
    <PagePlaceholder
      icon={PlusCircle}
      badge="Admin"
      title="New Campaign"
      description="Create a voice or messaging campaign for a customer segment."
    />
  );
}

export function AdminCampaignDetailPage() {
  return (
    <PagePlaceholder
      icon={Megaphone}
      badge="Admin"
      title="Campaign Detail"
      description="Campaign audience, schedule, delivery metrics and outcomes."
    />
  );
}

export function AdminCampaignEditPage() {
  return (
    <PagePlaceholder
      icon={FilePenLine}
      badge="Admin"
      title="Edit Campaign"
      description="Adjust campaign content, targeting, schedule and activation state."
    />
  );
}

// ── System ────────────────────────────────────────────────────────────────
export function AdminConfigPage() {
  return (
    <PagePlaceholder
      icon={SlidersHorizontal}
      badge="Admin"
      title="Configuration"
      description="Feature flags, integrations, environment variables and runtime tunables for the platform."
    />
  );
}

export function AdminCustomerTypesConfigPage() {
  return (
    <PagePlaceholder
      icon={SlidersHorizontal}
      badge="Admin"
      title="Customer Types Config"
      description="Configure customer segments and their routing or recommendation behavior."
    />
  );
}

export function AdminLifeEventsConfigPage() {
  return (
    <PagePlaceholder
      icon={SlidersHorizontal}
      badge="Admin"
      title="Life Events Config"
      description="Configure life-event taxonomy, triggers and recommendation mappings."
    />
  );
}

export function AdminProductsConfigPage() {
  return (
    <PagePlaceholder
      icon={SlidersHorizontal}
      badge="Admin"
      title="Products Config"
      description="Runtime product configuration and reload controls."
    />
  );
}

export function AdminFeatureFlagsPage() {
  return (
    <PagePlaceholder
      icon={Flag}
      badge="Admin"
      title="Feature Flags"
      description="Manage frontend feature gates and staged rollout switches."
    />
  );
}

export function AdminCustomerAnalyticsPage() {
  return (
    <PagePlaceholder
      icon={BarChart3}
      badge="Admin"
      title="Customer Analytics"
      description="Customer cohorts, segments, engagement and conversion signals."
    />
  );
}

export function AdminProductAnalyticsPage() {
  return (
    <PagePlaceholder
      icon={BarChart3}
      badge="Admin"
      title="Product Analytics"
      description="Product usage, funnel performance and recommendation effectiveness."
    />
  );
}

export function AdminRevenueAnalyticsPage() {
  return (
    <PagePlaceholder
      icon={LineChart}
      badge="Admin"
      title="Revenue Analytics"
      description="Revenue trends, portfolio value and product-line contribution."
    />
  );
}

export function AdminConversionAnalyticsPage() {
  return (
    <PagePlaceholder
      icon={LineChart}
      badge="Admin"
      title="Conversion Analytics"
      description="Lead-to-application and application-to-approval funnel analysis."
    />
  );
}

export function AdminLogsPage() {
  return (
    <PagePlaceholder
      icon={ClipboardList}
      badge="Admin"
      title="System Logs"
      description="Operational logs with filters for services, severity and time windows."
    />
  );
}

export function AdminPerformanceMonitoringPage() {
  return (
    <PagePlaceholder
      icon={Activity}
      badge="Admin"
      title="Performance Monitoring"
      description="Latency, throughput and resource metrics for frontend and backend services."
    />
  );
}

export function AdminErrorsMonitoringPage() {
  return (
    <PagePlaceholder
      icon={AlertTriangle}
      badge="Admin"
      title="Error Monitoring"
      description="Error trends, incident details and impacted routes or services."
    />
  );
}

export function AdminReportsPage() {
  return (
    <PagePlaceholder
      icon={FileBarChart}
      badge="Admin"
      title="Reports"
      description="Generate and export regulatory, operational and business reports on demand or on a schedule."
    />
  );
}

export function AdminReportGeneratePage() {
  return (
    <PagePlaceholder
      icon={FileBarChart}
      badge="Admin"
      title="Generate Report"
      description="Generate regulatory, operational or business reports from selected parameters."
    />
  );
}

export function AdminReportDetailPage() {
  return (
    <PagePlaceholder
      icon={FileBarChart}
      badge="Admin"
      title="Report Detail"
      description="View report status, generated output, exports and audit trail."
    />
  );
}

export function AdminSettingsPage() {
  return (
    <PagePlaceholder
      icon={Settings}
      badge="Admin"
      title="Admin Settings"
      description="Workspace preferences, admin team members, roles and security policy for the admin console."
    />
  );
}
