// ============================================================================
// Products Constants
// Source of Truth: BankMate AI Frontend Blueprint · Section 6
//   Product categories: Loans / Cards / Insurance / Investments / Savings
//   Specific product types from Section 6 references.
// ============================================================================

export const ProductCategory = {
  LOANS: 'LOANS',
  CARDS: 'CARDS',
  INSURANCE: 'INSURANCE',
  INVESTMENTS: 'INVESTMENTS',
  SAVINGS: 'SAVINGS',
} as const;

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  LOANS: 'Loans',
  CARDS: 'Credit Cards',
  INSURANCE: 'Insurance',
  INVESTMENTS: 'Investments',
  SAVINGS: 'Savings',
};

// Filter tabs per Section 6.5.2 / 6.2.4
export const PRODUCT_FILTER_TABS = ['All', 'Loans', 'Credit Cards', 'Insurance', 'Investments', 'Savings'] as const;

export const ProductType = {
  HOME_LOAN: 'HOME_LOAN',
  PERSONAL_LOAN: 'PERSONAL_LOAN',
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  FIXED_DEPOSIT: 'FIXED_DEPOSIT',
  RECURRING_DEPOSIT: 'RECURRING_DEPOSIT',
  SAVINGS_ACCOUNT: 'SAVINGS_ACCOUNT',
  MUTUAL_FUND: 'MUTUAL_FUND',
  LIFE_INSURANCE: 'LIFE_INSURANCE',
  HEALTH_INSURANCE: 'HEALTH_INSURANCE',
  AUTO_LOAN: 'AUTO_LOAN',
  EDUCATION_LOAN: 'EDUCATION_LOAN',
} as const;

export type ProductType = (typeof ProductType)[keyof typeof ProductType];

// Product type → category mapping
export const PRODUCT_TYPE_CATEGORY: Record<ProductType, ProductCategory> = {
  HOME_LOAN: ProductCategory.LOANS,
  PERSONAL_LOAN: ProductCategory.LOANS,
  AUTO_LOAN: ProductCategory.LOANS,
  EDUCATION_LOAN: ProductCategory.LOANS,
  CREDIT_CARD: ProductCategory.CARDS,
  DEBIT_CARD: ProductCategory.CARDS,
  FIXED_DEPOSIT: ProductCategory.INVESTMENTS,
  RECURRING_DEPOSIT: ProductCategory.INVESTMENTS,
  MUTUAL_FUND: ProductCategory.INVESTMENTS,
  SAVINGS_ACCOUNT: ProductCategory.SAVINGS,
  LIFE_INSURANCE: ProductCategory.INSURANCE,
  HEALTH_INSURANCE: ProductCategory.INSURANCE,
};

export const PRODUCT_CATEGORIES = Object.values(ProductCategory);

export default {
  ProductCategory,
  ProductType,
  PRODUCT_CATEGORY_LABELS,
  PRODUCT_FILTER_TABS,
  PRODUCT_TYPE_CATEGORY,
  PRODUCT_CATEGORIES,
};
