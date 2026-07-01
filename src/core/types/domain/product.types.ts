// ============================================================================
// Domain Types — Product
// Source of Truth: BankMate AI Frontend Blueprint · Sections 6, 7
// ============================================================================

import type { ProductCategory, ProductType } from '@/core/constants/products.constants';

export interface ProductFeature {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  type: ProductType;
  provider?: string;
  shortDescription: string;
  longDescription?: string;
  interestRate?: number;
  minAmount?: number;
  maxAmount?: number;
  minTenureMonths?: number;
  maxTenureMonths?: number;
  fees?: number;
  features?: ProductFeature[];
  eligibilityCriteria?: string[];
  icon?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilters {
  category?: ProductCategory | 'ALL';
  type?: ProductType;
  search?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface ProductComparisonItem {
  product: Product;
  attributes: Record<string, string | number>;
}

export default {};
