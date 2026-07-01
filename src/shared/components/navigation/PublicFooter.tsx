// ============================================================================
// Public Footer
// Source of Truth: BankMate AI Frontend Blueprint · Section 3.5.1 (Public Footer)
// Multi-column marketing footer for public/error pages: About / Products /
// Resources columns, social links, and a legal bottom bar.
// ============================================================================

import { Link } from 'react-router-dom';
import { ROUTES } from '@/core/config/routes.config';
import { APP_NAME } from '@/core/constants/app.constants';

interface FooterColumn {
  heading: string;
  links: { label: string; to: string }[];
}

const COLUMNS: FooterColumn[] = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: ROUTES.ABOUT },
      { label: 'Products', to: ROUTES.PUBLIC_PRODUCTS },
      { label: 'Contact', to: ROUTES.CONTACT },
      { label: 'Help Center', to: ROUTES.HELP },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'Loans', to: ROUTES.PUBLIC_PRODUCTS },
      { label: 'Insurance', to: ROUTES.PUBLIC_PRODUCTS },
      { label: 'Deposits', to: ROUTES.PUBLIC_PRODUCTS },
      { label: 'Investments', to: ROUTES.PUBLIC_PRODUCTS },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Help Center', to: ROUTES.HELP },
      { label: 'FAQ', to: ROUTES.HELP },
      { label: 'Sitemap', to: ROUTES.SITEMAP },
      { label: 'Support', to: ROUTES.CONTACT },
    ],
  },
];

const LEGAL = [
  { label: 'Terms', to: ROUTES.TERMS },
  { label: 'Privacy', to: ROUTES.PRIVACY },
];

export interface PublicFooterProps {
  /** Hide the multi-column section (e.g. error pages). */
  compact?: boolean;
}

export function PublicFooter({ compact = false }: PublicFooterProps) {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-gray-900 text-gray-300">
      {!compact ? (
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-gray-400 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-4">
            {LEGAL.map((l) => (
              <Link key={l.label} to={l.to} className="hover:text-gray-300">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
