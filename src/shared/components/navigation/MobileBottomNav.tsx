// ============================================================================
// Mobile Bottom Nav
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.13 (Mobile Nav)
// Fixed bottom tab bar for customer routes on small screens. Top 5
// destinations only — deeper navigation lives in the drawer.
// ============================================================================

import { NavLink } from 'react-router-dom';
import { cn } from '@/core/utils/cn.utils';
import { CUSTOMER_BOTTOM_NAV } from './nav.config';
import { useUIStore } from '@/store';

export interface MobileBottomNavProps {
  role: 'customer' | 'admin' | 'rm';
}

export function MobileBottomNav({ role }: MobileBottomNavProps) {
  const openMobileNav = useUIStore((s) => s.openMobileNav);

  // Bottom nav is customer-only per blueprint; admin/rm fall back to the drawer.
  if (role !== 'customer') return null;

  const items = CUSTOMER_BOTTOM_NAV;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex items-stretch border-t border-gray-200 bg-white/95 backdrop-blur lg:hidden"
      aria-label="Primary"
    >
      {items.map((item) => {
        const Icon = item.icon;
        if (item.label === 'More') {
          return (
            <button
              key={item.to}
              type="button"
              onClick={openMobileNav}
              className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        }
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors',
                isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn('h-5 w-5', isActive && 'text-primary-600')}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default MobileBottomNav;
