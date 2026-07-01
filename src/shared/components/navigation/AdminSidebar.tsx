// ============================================================================
// AdminSidebar
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.6
// Thin wrapper around <Sidebar/> wired to the admin nav config.
// ============================================================================

import { Sidebar } from './Sidebar';
import { ADMIN_NAV } from './nav.config';

export function AdminSidebar() {
  return <Sidebar role="admin" sections={ADMIN_NAV} />;
}

export default AdminSidebar;