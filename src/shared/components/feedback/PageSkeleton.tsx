// ============================================================================
// Page Skeleton
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.11 (Loading Strategy)
// Suspense fallback shown while a lazy route chunk is downloading. Mimics the
// general page layout so the transition feels stable rather than blank.
// ============================================================================

import { cn } from '@/core/utils/cn.utils';

export interface PageSkeletonProps {
  /** Show the app-header-sized bar at the top (default true). */
  withHeader?: boolean;
  className?: string;
}

function Bar({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200/80', className)}
      aria-hidden="true"
    />
  );
}

export function PageSkeleton({ withHeader = true, className }: PageSkeletonProps) {
  return (
    <div className={cn('flex flex-col', className)} aria-busy="true" aria-live="polite">
      {withHeader ? <Bar className="h-14 w-full rounded-none" /> : null}

      <div className="mx-auto w-full max-w-5xl px-4 py-8 lg:px-8">
        <Bar className="h-7 w-48" />
        <Bar className="mt-3 h-4 w-72" />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 p-4">
              <Bar className="h-4 w-24" />
              <Bar className="mt-3 h-8 w-16" />
              <Bar className="mt-3 h-3 w-full" />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading page…</span>
    </div>
  );
}

export default PageSkeleton;