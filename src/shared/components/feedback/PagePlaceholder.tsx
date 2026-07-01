// ============================================================================
// Page Placeholder
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.5 (Placeholder Pages)
// Lightweight "coming soon" shell used by every route while its feature module
// is unbuilt. Keeps the route tree navigable and the layout chrome visible.
// ============================================================================

import type { LucideIcon } from 'lucide-react';
import { cn } from '@/core/utils/cn.utils';

export interface PagePlaceholderProps {
  /** Page title shown as the heading. */
  title: string;
  /** Short description of what the page will do. */
  description?: string;
  /** Lucide icon rendered in the badge. */
  icon?: LucideIcon;
  /** Optional eyebrow label (e.g. "Customer", "Admin"). */
  badge?: string;
  /** Optional call-to-action rendered below the description. */
  children?: React.ReactNode;
  className?: string;
}

export function PagePlaceholder({
  title,
  description,
  icon: Icon,
  badge,
  children,
  className,
}: PagePlaceholderProps) {
  return (
    <div className={cn('flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center', className)}>
      {Icon ? (
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
          <Icon className="h-8 w-8" aria-hidden="true" />
        </div>
      ) : null}

      {badge ? (
        <span className="mb-3 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-500">
          {badge}
        </span>
      ) : null}

      <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>

      {description ? (
        <p className="mt-2 max-w-md text-sm text-gray-500">{description}</p>
      ) : null}

      <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-dashed border-gray-300 px-3 py-1 text-xs font-medium text-gray-400">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Coming Soon
      </span>

      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}

export default PagePlaceholder;