// ============================================================================
// App — Root Component
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §1
// ============================================================================

import { AppProviders } from './AppProviders';
import { AppInitializer } from './AppInitializer';
import { AppRoutes } from '@/routes/AppRoutes';

export function App() {
  return (
    <AppProviders>
      <AppInitializer>
        <AppRoutes />
      </AppInitializer>
    </AppProviders>
  );
}

export default App;
