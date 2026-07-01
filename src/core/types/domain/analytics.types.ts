// ============================================================================
// Domain Types — Analytics
// Source of Truth: BankMate AI Frontend Blueprint · Sections 6, 9
// ============================================================================

export interface MetricsCard {
  id: string;
  label: string;
  value: number | string;
  change?: number; // percentage change
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  category?: string;
}

export interface DashboardWidgetData {
  widgets: Record<string, unknown>;
}

export interface AdminMetrics {
  totalCustomers: number;
  activeCustomers: number;
  totalApplications: number;
  conversionRate: number;
  revenue: number;
  averageTicketSize: number;
}

export default {};
