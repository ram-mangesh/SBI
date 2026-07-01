// ============================================================================
// Domain Types — Goal
// Source of Truth: BankMate AI Frontend Blueprint · Sections 6, 8
// ============================================================================

export type GoalStatus = 'ACTIVE' | 'COMPLETED' | 'PAUSED' | 'ABANDONED';
export type GoalType = 'SAVINGS' | 'INVESTMENT' | 'DEBT_FREE' | 'PURCHASE' | 'RETIREMENT' | 'OTHER';

export interface GoalMilestone {
  id: string;
  label: string;
  targetAmount: number;
  achievedAmount: number;
  achievedAt?: string | null;
  dueDate?: string | null;
}

export interface Goal {
  id: string;
  customerId: string;
  type: GoalType;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  status: GoalStatus;
  startDate: string;
  targetDate?: string | null;
  milestones: GoalMilestone[];
  createdAt: string;
  updatedAt: string;
}

export default {};
