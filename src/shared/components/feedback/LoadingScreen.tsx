// ============================================================================
// Loading Screen
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1
// Full-screen centered loading indicator used during app bootstrap.
// ============================================================================

export interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      {message && (
        <p className="text-sm text-gray-500">{message}</p>
      )}
    </div>
  );
}

export default LoadingScreen;
