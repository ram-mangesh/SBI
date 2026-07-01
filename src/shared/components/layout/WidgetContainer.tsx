// ============================================================================
// WidgetContainer
// Source of Truth: Frontend Blueprint Section 3.8
// Reusable widget frame for dashboard cards, chart panels, lists, and stats.
// ============================================================================

import type { ReactNode } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/core/utils/cn.utils';

export type WidgetVariant = 'stat' | 'chart' | 'list' | 'recommendation' | 'timeline' | 'table';

export interface WidgetContainerProps {
  title?: string;
  description?: string;
  variant?: WidgetVariant;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

const VARIANT_CLASS: Record<WidgetVariant, string> = {
  stat: 'min-h-28',
  chart: 'min-h-72',
  list: 'min-h-64',
  recommendation: 'min-h-56',
  timeline: 'min-h-72',
  table: 'min-h-80',
};

export function WidgetContainer({
  title,
  description,
  variant = 'list',
  actions,
  children,
  className,
}: WidgetContainerProps) {
  return (
    <section className={cn('bm-widget', VARIANT_CLASS[variant], className)}>
      {(title || description || actions) ? (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title ? <h2 className="truncate text-sm font-semibold text-app">{title}</h2> : null}
            {description ? <p className="mt-1 text-xs text-muted-app">{description}</p> : null}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {actions}
            <button
              type="button"
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-700"
              aria-label="Widget options"
            >
              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </header>
      ) : null}
      {children}
    </section>
  );
}

export default WidgetContainer;
