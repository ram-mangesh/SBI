// ============================================================================
// Offline
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.7 (Error Pages)
// Shown when the browser reports no network connection.
// ============================================================================

import { WifiOff, RefreshCw } from 'lucide-react';
import { ErrorState } from '@/shared/components/feedback/ErrorState';

export function OfflinePage() {
  return (
    <ErrorState
      icon={WifiOff}
      title="You're offline"
      message="It looks like you've lost your internet connection. Reconnect and try again to continue using BankMate AI."
      tone="warning"
      actions={
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Retry connection
        </button>
      }
    />
  );
}

export default OfflinePage;