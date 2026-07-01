import { Home, Landmark, Percent, ShieldCheck, Star } from 'lucide-react';
import { ProductCategory, ProductType } from '@/core/constants/products.constants';
import { products, recommendations } from '../data/section8.mock';
import type { EligibilityStatus, Section8Product, Section8Recommendation } from '../types/section8.types';

export function getProduct(productId: string) {
  return products.find((product) => product.id === productId) ?? products[0];
}

export function getRecommendation(recId?: string) {
  return recommendations.find((item) => item.id === recId) ?? recommendations[0];
}

export function recProduct(rec: Section8Recommendation) {
  return getProduct(rec.productId);
}

export function matchBadgeClass(score: number) {
  if (score >= 90) return 'bg-success-light text-success-dark border-success-light';
  if (score >= 75) return 'bg-primary-50 text-primary-700 border-primary-100';
  if (score >= 60) return 'bg-warning-light text-warning-dark border-warning-light';
  return 'bg-gray-100 text-gray-600 border-gray-200';
}

export function affordabilityLabel(score: number) {
  if (score >= 80) return 'Well within your budget';
  if (score >= 60) return 'Within your budget';
  if (score >= 40) return 'Slightly above budget';
  return 'May stretch your budget';
}

export function eligibilityLabel(status: EligibilityStatus) {
  const map: Record<EligibilityStatus, string> = {
    LIKELY_ELIGIBLE: 'Likely Eligible',
    CHECK_ELIGIBILITY: 'Check Eligibility',
    MAY_NOT_QUALIFY: 'May Not Qualify',
    NOT_ELIGIBLE: 'Not Eligible',
  };
  return map[status];
}

export function eligibilityClass(status: EligibilityStatus) {
  if (status === 'LIKELY_ELIGIBLE') return 'bg-success-light text-success-dark';
  if (status === 'CHECK_ELIGIBILITY') return 'bg-primary-50 text-primary-700';
  if (status === 'MAY_NOT_QUALIFY') return 'bg-warning-light text-warning-dark';
  return 'bg-error-light text-error-dark';
}

export function productIcon(product: Section8Product) {
  if (product.type === ProductType.HOME_LOAN) return Home;
  if (product.category === ProductCategory.INSURANCE) return ShieldCheck;
  if (product.category === ProductCategory.CARDS) return Star;
  if (product.category === ProductCategory.INVESTMENTS) return Percent;
  return Landmark;
}

export function filterByCategory(product: Section8Product, category: string) {
  if (category === 'ALL') return true;
  return product.category === category || product.type === category;
}
