// ============================================================================
// Breadcrumb
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.7 (Breadcrumbs)
// Auto-derives a trail from the current location pathname. Pages can override
// with explicit crumbs via <Breadcrumb items={[...]} />.
// ============================================================================

import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '@/core/config/routes.config';
import { cn } from '@/core/utils/cn.utils';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface BreadcrumbProps {
  /** Explicit crumbs; when omitted the trail is derived from the pathname. */
  items?: BreadcrumbItem[];
  className?: string;
}

/** Human label for a path segment. Falls back to a title-cased segment. */
function labelForSegment(segment: string): string {
  const map: Record<string, string> = {
    customer: 'Customer',
    admin: 'Admin',
    rm: 'RM',
    dashboard: 'Dashboard',
    profile: 'Profile',
    edit: 'Edit',
    financial: 'Financial',
    'life-events': 'Life Events',
    recommendations: 'Recommendations',
    products: 'Products',
    compare: 'Compare',
    apply: 'Apply',
    applications: 'Applications',
    status: 'Status',
    accept: 'Accept',
    calculate: 'Calculator',
    kyc: 'KYC',
    upload: 'Upload',
    goals: 'Goals',
    transactions: 'Transactions',
    notifications: 'Notifications',
    categories: 'Categories',
    voice: 'Voice',
    preferences: 'Preferences',
    history: 'History',
    chat: 'Chat',
    conversations: 'Conversations',
    settings: 'Settings',
    security: 'Security',
    language: 'Language',
    theme: 'Theme',
    onboarding: 'Onboarding',
    customers: 'Customers',
    'customer-types': 'Customer Types',
    'feature-flags': 'Feature Flags',
    config: 'Configuration',
    campaigns: 'Campaigns',
    conversion: 'Conversion',
    revenue: 'Revenue',
    logs: 'Logs',
    errors: 'Errors',
    generate: 'Generate',
    analytics: 'Analytics',
    monitoring: 'Monitoring',
    reports: 'Reports',
    leads: 'Leads',
    tasks: 'Tasks',
    calendar: 'Calendar',
    appointments: 'Appointments',
    targets: 'Targets',
    engage: 'Engage',
    convert: 'Convert',
    performance: 'Performance',
  };
  if (map[segment]) return map[segment];
  // Title-case fallback
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

/** Build a crumb trail from the raw pathname. */
function deriveCrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  if (!segments.length) return [];

  const crumbs: BreadcrumbItem[] = [];
  let acc = '';
  for (const seg of segments) {
    acc += `/${seg}`;
    // Skip pure-id segments (UUID-ish or numeric) — label as "Details".
    const isId = /^[0-9a-f-]{8,}$/i.test(seg) || /^\d+$/.test(seg);
    crumbs.push({
      label: isId ? 'Details' : labelForSegment(decodeURIComponent(seg)),
      to: acc,
    });
  }
  return crumbs;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const location = useLocation();
  const crumbs = items ?? deriveCrumbs(location.pathname);
  if (!crumbs.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1 text-sm">
        <li>
          <Link
            to={ROUTES.ROOT}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Home"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
          </Link>
        </li>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={`${crumb.to ?? crumb.label}-${i}`} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4 text-gray-300" aria-hidden="true" />
              {crumb.to && !isLast ? (
                <Link to={crumb.to} className="text-gray-500 hover:text-gray-900">
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={cn('font-medium', isLast ? 'text-gray-900' : 'text-gray-500')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
