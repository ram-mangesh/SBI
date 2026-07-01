// ============================================================================
// Z-Index System
// Source of Truth: BankMate AI Frontend Blueprint · Section 3 (Layout Architecture)
//   3.3.5 (Sticky Header Rules) · 3.4 (Sidebar) · 3.9 (Modal) · 3.10 (Drawer)
//
// Single source of truth for stacking order across the app. Layout chrome,
// overlays and portals all reference these tokens so layers never collide.
//
//   Layer            | Token        | Value  | Notes
//   ─────────────────┼──────────────┼────────┼─────────────────────────────
//   Base content     | BASE         |   1    | Normal document flow
//   Page title (sticky) | PAGE_TITLE |  40    | Sticky in-content header
//   Filter panel     | FILTER_PANEL |  50    | Sticky filters under title
//   Route progress   | ROUTE_BAR    |  60    | Top loading bar
//   Bottom nav       | BOTTOM_NAV   |  90    | Mobile tab bar
//   Life event banner| BANNER       |  90    | Below header, scrolls away
//   App header       | HEADER       | 100    | Sticky top bar
//   Sidebar          | SIDEBAR      | 200    | Fixed desktop sidebar
//   Drawer scrim     | DRAWER_SCRIM | 999    | Mobile nav backdrop
//   Drawer / Dropdown| DRAWER       | 1000   | Drawers + dropdowns
//   Modal backdrop   | MODAL_BACKDROP | 1000 | Modal scrim
//   Modal            | MODAL        | 1001   | Centered modal
//   Loading overlay  | LOADING      | 9998   | Global loading overlay
//   Global modal portal | GLOBAL_MODAL | 9999 | App-wide modal portal
//   Toast portal     | TOAST        | 10000  | Highest — always visible
// ============================================================================

export const Z_INDEX = {
  BASE: 1,
  PAGE_TITLE: 40,
  FILTER_PANEL: 50,
  ROUTE_BAR: 60,
  BOTTOM_NAV: 90,
  BANNER: 90,
  HEADER: 100,
  SIDEBAR: 200,
  DRAWER_SCRIM: 999,
  DRAWER: 1000,
  DROPDOWN: 500,
  MODAL_BACKDROP: 1000,
  MODAL: 1001,
  LOADING: 9998,
  GLOBAL_MODAL: 9999,
  TOAST: 10000,
} as const;

/** Tailwind-style z-index class map — used where inline styles are undesirable. */
export const Z_CLASS = {
  base: 'z-[1]',
  pageTitle: 'z-40',
  filterPanel: 'z-50',
  routeBar: 'z-[60]',
  bottomNav: 'z-30',
  banner: 'z-[90]',
  header: 'z-[100]',
  sidebar: 'z-[200]',
  drawerScrim: 'z-[999]',
  drawer: 'z-[1000]',
  dropdown: 'z-[500]',
  modal: 'z-[1001]',
  loading: 'z-[9998]',
  globalModal: 'z-[9999]',
  toast: 'z-[10000]',
} as const;

export type ZIndexToken = keyof typeof Z_INDEX;

export default { Z_INDEX, Z_CLASS };
