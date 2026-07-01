// ============================================================================
// 500 — Server Error
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.7 (Error Pages)
// Generic server-side failure. Offers a retry action.
// ============================================================================

import { ServerCrash, RefreshCw } from 'lucide-react';
import { ErrorState } from '@/shared/components/feedback/ErrorState';

export function ServerErrorPage() {
  return (
    <ErrorState
      icon={ServerCrash}
      statusCode={500}
      title="Something went wrong"
      message="An unexpected error occurred on our end. Our team has been notified — please try again in a moment."
      tone="danger"
      actions={
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      }
    />
  );
}

export default ServerErrorPage;