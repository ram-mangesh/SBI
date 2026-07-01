// ============================================================================
// RMSidebar
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.6
// Thin wrapper around <Sidebar/> wired to the relationship-manager nav config.
// ============================================================================

import { Sidebar } from './Sidebar';
import { RM_NAV } from './nav.config';

export function RMSidebar() {
  return <Sidebar role="rm" sections={RM_NAV} />;
}

export default RMSidebar;