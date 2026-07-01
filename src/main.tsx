// ============================================================================
// Main Entry — React 19
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1
// ============================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app/App';
import '@/styles/global.css';
import '@/styles/components.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Ensure index.html contains <div id="root"></div>.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
