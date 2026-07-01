// ============================================================================
// Relationship Manager Pages — Placeholders
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.5 / 2.8
// /rm/* routes rendered under RMLayout behind AuthGuard + RoleGuard(RM).
// Each page is a thin PagePlaceholder until its feature module ships.
// ============================================================================

import {
  LayoutDashboard,
  Users,
  UserPlus,
  CheckSquare,
  Calendar,
  TrendingUp,
  PhoneCall,
  ClipboardList,
  Target,
} from 'lucide-react';
import { PagePlaceholder } from '@/shared/components/feedback/PagePlaceholder';

// ── Overview ──────────────────────────────────────────────────────────────
export function RmDashboardPage() {
  return (
    <PagePlaceholder
      icon={LayoutDashboard}
      badge="RM"
      title="RM Dashboard"
      description="Your portfolio at a glance: assigned customers, pipeline value, pending tasks and today's meetings."
    />
  );
}

export function RmPerformancePage() {
  return (
    <PagePlaceholder
      icon={TrendingUp}
      badge="RM"
      title="Performance"
      description="Targets vs. achievement, conversion rates and incentive metrics for the current review cycle."
    />
  );
}

// ── Engage ────────────────────────────────────────────────────────────────
export function RmCustomersPage() {
  return (
    <PagePlaceholder
      icon={Users}
      badge="RM"
      title="My Customers"
      description="Portfolio of assigned customers with quick access to profiles, holdings and recent activity."
    />
  );
}

export function RmCustomerDetailPage() {
  return (
    <PagePlaceholder
      icon={Users}
      badge="RM"
      title="Customer Detail"
      description="Assigned customer profile, holdings, recent activity and next best actions."
    />
  );
}

export function RmCustomerEngagePage() {
  return (
    <PagePlaceholder
      icon={PhoneCall}
      badge="RM"
      title="Customer Engagement"
      description="Call, message or schedule a follow-up with a customer and capture the outcome."
    />
  );
}

export function RmLeadsPage() {
  return (
    <PagePlaceholder
      icon={UserPlus}
      badge="RM"
      title="Leads"
      description="Inbound and assigned leads across stages — qualify, nurture and convert with guided next steps."
    />
  );
}

export function RmLeadDetailPage() {
  return (
    <PagePlaceholder
      icon={UserPlus}
      badge="RM"
      title="Lead Detail"
      description="Lead profile, source, qualification notes and recommended conversion actions."
    />
  );
}

export function RmLeadConvertPage() {
  return (
    <PagePlaceholder
      icon={UserPlus}
      badge="RM"
      title="Convert Lead"
      description="Convert a qualified lead into a customer or product application workflow."
    />
  );
}

export function RmTasksPage() {
  return (
    <PagePlaceholder
      icon={CheckSquare}
      badge="RM"
      title="Tasks"
      description="Follow-ups, reminders and to-dos prioritized by due date and customer value."
    />
  );
}

export function RmTaskDetailPage() {
  return (
    <PagePlaceholder
      icon={ClipboardList}
      badge="RM"
      title="Task Detail"
      description="Task context, due date, customer link and completion outcome."
    />
  );
}

export function RmCalendarPage() {
  return (
    <PagePlaceholder
      icon={Calendar}
      badge="RM"
      title="Calendar"
      description="Meetings, calls and customer appointments with conflict detection and reminder scheduling."
    />
  );
}

export function RmAppointmentsPage() {
  return (
    <PagePlaceholder
      icon={Calendar}
      badge="RM"
      title="Appointments"
      description="Upcoming meetings, calls and branch appointments with assigned customers."
    />
  );
}

export function RmTargetsPage() {
  return (
    <PagePlaceholder
      icon={Target}
      badge="RM"
      title="Targets"
      description="Monthly and quarterly targets with progress, gaps and priority actions."
    />
  );
}
