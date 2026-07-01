import { AlertCircle, BadgeCheck, FileText, PenLine } from 'lucide-react';
import type { ApplicationRecord, BackendApplicationStatus, TimelineEvent } from '../types/application.types';
import { useApplicationStore } from '../store/application.store';

export function formatDate(value?: string) {
  if (!value) return 'Not submitted';
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
}

export function formatAmount(value: number) {
  return `Rs ${value.toLocaleString('en-IN')}`;
}

export function getApp(appId?: string) {
  const apps = useApplicationStore.getState().applications;
  return apps.find((app) => app.id === appId) ?? apps[0];
}

export function statusLabel(status: BackendApplicationStatus) {
  const labels: Record<BackendApplicationStatus, string> = {
    DRAFT: 'Draft',
    SUBMITTED: 'Submitted',
    UNDER_REVIEW: 'Under Review',
    DOCUMENT_PENDING: 'Action Required',
    APPROVED: 'Approved',
    OFFER_ACCEPTED: 'Offer Accepted',
    DISBURSED: 'Completed',
    REJECTED: 'Not Approved',
    WITHDRAWN: 'Withdrawn',
    EXPIRED: 'Expired',
  };
  return labels[status];
}

export function statusClass(status: BackendApplicationStatus) {
  if (status === 'APPROVED' || status === 'OFFER_ACCEPTED' || status === 'DISBURSED') return 'bg-success-light text-success-dark';
  if (status === 'DOCUMENT_PENDING') return 'bg-warning-light text-warning-dark';
  if (status === 'REJECTED' || status === 'WITHDRAWN' || status === 'EXPIRED') return 'bg-error-light text-error-dark';
  if (status === 'DRAFT') return 'bg-gray-100 text-gray-700';
  return 'bg-primary-50 text-primary-700';
}

export function applicationIcon(status?: BackendApplicationStatus) {
  if (status === 'APPROVED' || status === 'OFFER_ACCEPTED') return BadgeCheck;
  if (status === 'DOCUMENT_PENDING') return AlertCircle;
  if (status === 'DRAFT') return PenLine;
  return FileText;
}

export function timelineFor(app: ApplicationRecord): TimelineEvent[] {
  const base: TimelineEvent[] = [
    { id: 'created', label: 'Application Started', timestamp: app.updatedAt, completed: true, tone: 'info' },
    { id: 'submitted', label: 'Application Submitted', timestamp: app.submittedAt ?? app.updatedAt, completed: app.status !== 'DRAFT', tone: 'info' },
    { id: 'documents', label: 'Documents Verified', timestamp: '2026-06-26T14:15:00.000Z', completed: app.status !== 'DRAFT', tone: 'success' },
    { id: 'review', label: 'Review Started', timestamp: '2026-06-27T09:00:00.000Z', completed: ['UNDER_REVIEW', 'APPROVED', 'OFFER_ACCEPTED', 'DISBURSED', 'REJECTED'].includes(app.status), tone: 'info' },
  ];
  if (app.status === 'APPROVED' || app.status === 'OFFER_ACCEPTED' || app.status === 'DISBURSED') {
    base.push({ id: 'approved', label: 'Application Approved', timestamp: app.updatedAt, completed: true, tone: 'success' });
    base.push({ id: 'offer', label: app.status === 'OFFER_ACCEPTED' ? 'Offer Accepted' : 'Offer Generated', timestamp: app.updatedAt, completed: app.status !== 'APPROVED', tone: 'success' });
  } else if (app.status === 'REJECTED') {
    base.push({ id: 'rejected', label: 'Application Not Approved', timestamp: app.updatedAt, completed: true, tone: 'error' });
  } else {
    base.push({ id: 'decision', label: 'Approval Decision', timestamp: 'Typically 2-3 business days', completed: false, tone: 'info' });
  }
  return base;
}
