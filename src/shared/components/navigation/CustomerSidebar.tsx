// ============================================================================
// CustomerSidebar
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.6
// Thin wrapper around <Sidebar/> wired to the customer nav config.
// ============================================================================

import { Sidebar } from './Sidebar';
import { CUSTOMER_NAV } from './nav.config';

export function CustomerSidebar() {
  return <Sidebar role="customer" sections={CUSTOMER_NAV} />;
}

export default CustomerSidebar;