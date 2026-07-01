// ============================================================================
// 503 — Maintenance
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.7 (Error Pages)
// Shown during scheduled downtime. No navigation — just wait/retry.
// ============================================================================

import { Wrench, RefreshCw } from 'lucide-react';
import { ErrorState } from '@/shared/components/feedback/ErrorState';

export function MaintenancePage() {
  return (
    <ErrorState
      icon={Wrench}
      statusCode={503}
      title="Under maintenance"
      message="We're performing scheduled maintenance to make BankMate AI better. We'll be back shortly — thank you for your patience."
      tone="warning"
      actions={
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Retry
        </button>
      }
    />
  );
}

export default MaintenancePage;