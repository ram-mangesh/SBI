// ============================================================================
// UI Component Types
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1
// Shared prop/type definitions used across shared/components/ui.
// ============================================================================

import type { ButtonSize, ButtonVariant, BadgeColor, StatusColor } from './theme.types';

export type { ButtonSize, ButtonVariant, BadgeColor, StatusColor };

export type Size = 'sm' | 'md' | 'lg' | 'xl';

export interface ClassNameProp {
  className?: string;
}

export interface LoadingState {
  isLoading: boolean;
}

export interface ErrorState {
  error: Error | null;
}

export interface AsyncState<T> extends LoadingState, ErrorState {
  data: T | null;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface BreadCrumbItem {
  label: string;
  href?: string;
}

export interface StepItem {
  id: string | number;
  label: string;
  description?: string;
  status?: 'pending' | 'active' | 'completed' | 'error';
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface PaginatedMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export default {};
