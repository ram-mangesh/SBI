// ============================================================================
// Error State
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.7 (Error Pages)
// Reusable full-page error display shared by every status page (4xx/5xx/offline).
// Renders a centered icon badge, status code, title, message and action slot.
// ============================================================================

import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/core/utils/cn.utils';

export type ErrorTone = 'default' | 'info' | 'warning' | 'danger';

export interface ErrorStateProps {
  /** Lucide icon rendered inside the badge. */
  icon: LucideIcon;
  /** HTTP-style status code shown large above the title. */
  statusCode?: string | number;
  /** Headline. */
  title: string;
  /** Supporting copy. */
  message: string;
  /** Color tone of the icon badge. */
  tone?: ErrorTone;
  /** Action buttons / links rendered below the message. */
  actions?: ReactNode;
  className?: string;
}

const TONE_BADGE: Record<ErrorTone, string> = {
  default: 'bg-gray-100 text-gray-500 ring-gray-200',
  info: 'bg-primary-50 text-primary-600 ring-primary-100',
  warning: 'bg-amber-50 text-amber-600 ring-amber-100',
  danger: 'bg-red-50 text-red-600 ring-red-100',
};

const TONE_CODE: Record<ErrorTone, string> = {
  default: 'text-gray-300',
  info: 'text-primary-200',
  warning: 'text-amber-200',
  danger: 'text-red-200',
};

export function ErrorState({
  icon: Icon,
  statusCode,
  title,
  message,
  tone = 'default',
  actions,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center',
        className,
      )}
    >
      <div
        className={cn(
          'mb-6 flex h-20 w-20 items-center justify-center rounded-3xl ring-1',
          TONE_BADGE[tone],
        )}
      >
        <Icon className="h-10 w-10" aria-hidden="true" />
      </div>

      {statusCode !== undefined ? (
        <p className={cn('text-5xl font-black tracking-tight', TONE_CODE[tone])}>
          {statusCode}
        </p>
      ) : null}

      <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
      <p className="mt-2 max-w-md text-sm text-gray-500">{message}</p>

      {actions ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export default ErrorState;