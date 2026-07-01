// ============================================================================
// Navigation Config
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.6 (Sidebar Nav)
//   + Section 2.13 (Mobile Nav)
// Single source of truth for sidebar + mobile-bottom-nav items per role.
// Sidebars render from these arrays so labels/icons/active-matching stay DRY.
// ============================================================================

import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Sparkles,
  Landmark,
  FileText,
  Wallet,
  Target,
  BadgeCheck,
  Mic,
  MessageSquare,
  Bell,
  User,
  Settings,
  BarChart3,
  Activity,
  Users,
  Package,
  Megaphone,
  SlidersHorizontal,
  FileBarChart,
  TrendingUp,
  Calendar,
  CheckSquare,
  UserPlus,
  MoreHorizontal,
  Languages,
  Palette,
} from 'lucide-react';
import { ROUTES } from '@/core/config/routes.config';
import type { FeatureFlag } from '@/core/constants/feature-flags.constants';
import type { NavRole } from '@/store';

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  /** Path prefix used for active-link matching (defaults to `to`). */
  match?: string;
  /** Feature flag that must be enabled for the item to render. */
  flag?: FeatureFlag;
  /** Shown as a small badge on the item (e.g. counts). */
  badge?: string;
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

// ── Customer ──────────────────────────────────────────────────────────────
export const CUSTOMER_NAV: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', to: ROUTES.DASHBOARD, icon: LayoutDashboard },
      { label: 'Recommendations', to: ROUTES.RECOMMENDATIONS, icon: Sparkles },
      { label: 'Compare Recs', to: ROUTES.RECOMMENDATION_COMPARE, icon: Sparkles, match: ROUTES.RECOMMENDATIONS },
    ],
  },
  {
    label: 'Banking',
    items: [
      { label: 'Products', to: ROUTES.PRODUCTS, icon: Landmark },
      { label: 'Applications', to: ROUTES.APPLICATIONS, icon: FileText },
      { label: 'Transactions', to: ROUTES.TRANSACTIONS, icon: Wallet },
      { label: 'Categories', to: ROUTES.TRANSACTION_CATEGORIES, icon: Wallet, match: ROUTES.TRANSACTIONS },
      { label: 'Goals', to: ROUTES.GOALS, icon: Target, flag: 'financial_goals' as FeatureFlag },
    ],
  },
  {
    label: 'Verification',
    items: [
      { label: 'KYC', to: ROUTES.KYC, icon: BadgeCheck },
    ],
  },
  {
    label: 'Assist',
    items: [
      { label: 'Voice', to: ROUTES.VOICE, icon: Mic, flag: 'voice_agent' as FeatureFlag },
      { label: 'Chat', to: ROUTES.CHAT_CUSTOMER, icon: MessageSquare },
      { label: 'Notifications', to: ROUTES.NOTIFICATIONS, icon: Bell },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Profile', to: ROUTES.PROFILE, icon: User },
      { label: 'Settings', to: ROUTES.SETTINGS, icon: Settings },
      { label: 'Language', to: ROUTES.SETTINGS_LANGUAGE, icon: Languages, match: ROUTES.SETTINGS },
      { label: 'Theme', to: ROUTES.SETTINGS_THEME, icon: Palette, match: ROUTES.SETTINGS },
    ],
  },
];

// ── Admin ─────────────────────────────────────────────────────────────────
export const ADMIN_NAV: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', to: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
      { label: 'Analytics', to: ROUTES.ADMIN_ANALYTICS, icon: BarChart3 },
      { label: 'Monitoring', to: ROUTES.ADMIN_MONITORING, icon: Activity },
    ],
  },
  {
    label: 'Manage',
    items: [
      { label: 'Customers', to: ROUTES.ADMIN_CUSTOMERS, icon: Users },
      { label: 'Products', to: ROUTES.ADMIN_PRODUCTS, icon: Package },
      { label: 'Campaigns', to: ROUTES.ADMIN_CAMPAIGNS, icon: Megaphone, flag: 'voice_campaigns' as FeatureFlag },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Configuration', to: ROUTES.ADMIN_CONFIG, icon: SlidersHorizontal },
      { label: 'Feature Flags', to: ROUTES.ADMIN_CONFIG_FEATURE_FLAGS, icon: SlidersHorizontal, match: ROUTES.ADMIN_CONFIG },
      { label: 'Reports', to: ROUTES.ADMIN_REPORTS, icon: FileBarChart },
      { label: 'Settings', to: ROUTES.ADMIN_SETTINGS, icon: Settings },
    ],
  },
];

// ── Relationship Manager ──────────────────────────────────────────────────
export const RM_NAV: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', to: ROUTES.RM_DASHBOARD, icon: LayoutDashboard },
      { label: 'Performance', to: ROUTES.RM_PERFORMANCE, icon: TrendingUp },
    ],
  },
  {
    label: 'Engage',
    items: [
      { label: 'Customers', to: ROUTES.RM_CUSTOMERS, icon: Users },
      { label: 'Leads', to: ROUTES.RM_LEADS, icon: UserPlus },
      { label: 'Tasks', to: ROUTES.RM_TASKS, icon: CheckSquare },
      { label: 'Calendar', to: ROUTES.RM_CALENDAR, icon: Calendar },
      { label: 'Targets', to: ROUTES.RM_TARGETS, icon: Target },
    ],
  },
];

export const NAV_BY_ROLE: Record<NavRole, NavSection[]> = {
  customer: CUSTOMER_NAV,
  admin: ADMIN_NAV,
  rm: RM_NAV,
};

// ── Mobile bottom nav (customer) — top 5 destinations only ────────────────
export const CUSTOMER_BOTTOM_NAV: NavItem[] = [
  { label: 'Home', to: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Recs', to: ROUTES.RECOMMENDATIONS, icon: Sparkles },
  { label: 'Apps', to: ROUTES.APPLICATIONS, icon: FileText },
  { label: 'Chat', to: ROUTES.CHAT_CUSTOMER, icon: MessageSquare },
  { label: 'More', to: ROUTES.SETTINGS, icon: MoreHorizontal },
];

export default { CUSTOMER_NAV, ADMIN_NAV, RM_NAV, NAV_BY_ROLE, CUSTOMER_BOTTOM_NAV };
