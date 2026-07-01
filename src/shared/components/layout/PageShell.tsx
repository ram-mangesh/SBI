// ============================================================================
// PageShell
// Source of Truth: Frontend Blueprint Section 3.6 / 3.7 / 3.11
// Standard page content frame for authenticated layouts.
// ============================================================================

import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';
import { cn } from '@/core/utils/cn.utils';

export type PageShellWidth = 'full' | 'dashboard' | 'detail' | 'list' | 'narrow' | 'form';

export interface PageShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
  width?: PageShellWidth;
  actions?: ReactNode;
  banner?: ReactNode;
  className?: string;
}

const WIDTH_CLASS: Record<PageShellWidth, string> = {
  full: 'max-w-none',
  dashboard: 'bm-container-dashboard',
  detail: 'bm-container-detail',
  list: 'bm-container-list',
  narrow: 'bm-container-narrow',
  form: 'bm-container-form',
};

const TITLE_OVERRIDES: Record<string, string> = {
  rm: 'Relationship Manager',
  kyc: 'KYC',
  ai: 'AI',
};

function titleCaseSegment(segment: string): string {
  return segment
    .split('-')
    .map((part) => TITLE_OVERRIDES[part] ?? part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function titleFromPath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  const lastMeaningful = [...parts].reverse().find((part) => !/^[:0-9a-f-]{4,}$/i.test(part));
  if (!lastMeaningful) return 'Dashboard';
  return titleCaseSegment(decodeURIComponent(lastMeaningful));
}

export function LifeEventBanner({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <div className="bm-life-event-banner mb-4 overflow-hidden px-4 py-3 sm:px-5">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/15">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Life event signal detected</p>
          <p className="mt-0.5 text-xs text-white/80">
            Personalized banking recommendations will surface here when the life-event engine detects a new milestone.
          </p>
        </div>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-md p-1 text-white/80 hover:bg-white/10 hover:text-white"
            aria-label="Dismiss life event banner"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function PageShell({
  children,
  title,
  description,
  width = 'dashboard',
  actions,
  banner,
  className,
}: PageShellProps) {
  const location = useLocation();
  const pageTitle = title ?? titleFromPath(location.pathname);

  return (
    <div className={cn('bm-container mx-auto w-full py-4 sm:py-6', WIDTH_CLASS[width], className)}>
      {banner}

      <section className="bm-page-title -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold text-app sm:text-2xl">{pageTitle}</h1>
            {description ? <p className="mt-1 max-w-2xl text-sm text-muted-app">{description}</p> : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      </section>

      <div className="pt-4">{children}</div>
    </div>
  );
}

export default PageShell;
