import type { ReactNode } from 'react';
import { ChangeEvent, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Check,
  CheckCircle2,
  Circle,
  Clock,
  FileCheck,
  FileText,
  Landmark,
  Loader2,
  Plus,
  ShieldCheck,
  Upload,
  WalletCards,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { EmbeddedCopilot } from '@/features/chat/components/CopilotExperience';
import { ROUTES, routeBuilders } from '@/core/config/routes.config';
import { cn } from '@/core/utils/cn.utils';
import { defaultProduct, initialDocuments, productsById } from '../data/application.mock';
import { useApplicationStore } from '../store/application.store';
import type { ApplicationFilter, ApplicationRecord, BackendApplicationStatus, DocumentState } from '../types/application.types';
import { applicationIcon, formatAmount, formatDate, getApp, statusClass, statusLabel, timelineFor } from '../utils/application.utils';

const steps = [
  { id: 1, label: 'Customer Info' },
  { id: 2, label: 'Financial Details' },
  { id: 3, label: 'Documents' },
  { id: 4, label: 'Review' },
  { id: 5, label: 'Submit' },
];

function Panel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="bm-card p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-app">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-app">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-10 w-full rounded-md border border-app bg-surface px-3 text-sm text-app"
      />
    </label>
  );
}

function Stepper() {
  const wizardStep = useApplicationStore((state) => state.wizardStep);
  const setWizardStep = useApplicationStore((state) => state.setWizardStep);

  return (
    <div className="rounded-lg border border-app bg-surface p-3">
      <div className="md:hidden">
        <div className="flex justify-between text-sm font-semibold text-app">
          <span>Step {wizardStep} of 5: {steps[wizardStep - 1].label}</span>
          <span>{wizardStep * 20}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-primary-600" style={{ width: `${wizardStep * 20}%` }} />
        </div>
      </div>
      <ol className="hidden items-center gap-2 md:flex" aria-label="Application progress">
        {steps.map((step) => {
          const completed = step.id < wizardStep;
          const active = step.id === wizardStep;
          return (
            <li key={step.id} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                disabled={!completed && !active}
                onClick={() => completed && setWizardStep(step.id)}
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-bold',
                  completed && 'border-success bg-success text-white',
                  active && 'border-primary-600 bg-primary-600 text-white',
                  !completed && !active && 'border-gray-200 bg-gray-100 text-gray-400',
                )}
              >
                {completed ? <Check className="h-4 w-4" /> : step.id}
              </button>
              <span className={cn('text-sm font-semibold', active ? 'text-app' : 'text-muted-app')}>{step.label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function AutosaveIndicator() {
  const autosaveStatus = useApplicationStore((state) => state.autosaveStatus);
  const content = {
    idle: ['Idle', Circle],
    saving: ['Saving...', Loader2],
    saved: ['Saved', CheckCircle2],
    error: ["Couldn't save", AlertCircle],
  } as const;
  const [label, Icon] = content[autosaveStatus];
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted-app">
      <Icon className={cn('h-3.5 w-3.5', autosaveStatus === 'saving' && 'animate-spin')} />
      {label}
    </span>
  );
}

function CustomerInfoStep() {
  const data = useApplicationStore((state) => state.wizardData.customerInfo);
  const saveField = useApplicationStore((state) => state.saveField);
  return (
    <Panel title="Confirm Your Details">
      <div className="mb-4 flex items-center gap-4 rounded-lg bg-surface-muted p-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
          <ShieldCheck className="h-7 w-7" />
        </span>
        <div>
          <p className="font-semibold text-app">{data.fullName}</p>
          <p className="text-sm text-muted-app">{data.email} - Verified</p>
          <p className="text-sm text-muted-app">{data.mobile} - Verified</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Address Line 1" value={data.addressLine1} onChange={(value) => saveField('customerInfo', { addressLine1: value })} />
        <Field label="City" value={data.city} onChange={(value) => saveField('customerInfo', { city: value })} />
        <Field label="State" value={data.state} onChange={(value) => saveField('customerInfo', { state: value })} />
        <Field label="PIN Code" value={data.pinCode} onChange={(value) => saveField('customerInfo', { pinCode: value })} />
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm font-medium text-app">
        <input
          type="checkbox"
          checked={data.addressConfirmed}
          onChange={(event) => saveField('customerInfo', { addressConfirmed: event.target.checked })}
          className="h-4 w-4"
        />
        This is my current residential address
      </label>
      <Link to={ROUTES.PROFILE_EDIT} className="mt-3 inline-flex text-sm font-semibold text-primary-700">
        Update profile
      </Link>
    </Panel>
  );
}

function FinancialStep() {
  const data = useApplicationStore((state) => state.wizardData.employmentFinancial);
  const saveField = useApplicationStore((state) => state.saveField);
  const emiRatio = Math.min(95, Math.round((24580 / Math.max(data.monthlyIncome, 1)) * 100));
  return (
    <div className="space-y-4">
      <Panel title="Employment & Financial Details">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Employer Name" value={data.employerName} onChange={(value) => saveField('employmentFinancial', { employerName: value })} />
          <Field label="Designation" value={data.designation} onChange={(value) => saveField('employmentFinancial', { designation: value })} />
          <Field
            label="Monthly Net Salary"
            value={data.monthlyIncome}
            type="number"
            onChange={(value) => saveField('employmentFinancial', { monthlyIncome: Number(value) })}
          />
          <Field
            label="Years at Current Employer"
            value={data.yearsAtEmployer}
            type="number"
            onChange={(value) => saveField('employmentFinancial', { yearsAtEmployer: Number(value) })}
          />
          <Field label="Salary Account Bank" value={data.salaryBank} onChange={(value) => saveField('employmentFinancial', { salaryBank: value })} />
          <Field
            label="Requested Amount"
            value={data.requestedAmount}
            type="number"
            onChange={(value) => saveField('employmentFinancial', { requestedAmount: Number(value) })}
          />
        </div>
      </Panel>
      <Panel title="Live Affordability Preview">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-app">Estimated EMI affordability</p>
            <p className="text-sm text-muted-app">Final result is confirmed by QualificationAgent on step completion.</p>
          </div>
          <span className={cn('rounded-full px-3 py-1 text-sm font-semibold', emiRatio < 40 ? 'bg-success-light text-success-dark' : 'bg-warning-light text-warning-dark')}>
            EMI uses {emiRatio}% of income
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
          <div className={cn('h-full rounded-full', emiRatio < 40 ? 'bg-success' : 'bg-warning')} style={{ width: `${emiRatio}%` }} />
        </div>
      </Panel>
    </div>
  );
}

function DocumentStep() {
  const documents = useApplicationStore((state) => state.documents);
  const uploadDocument = useApplicationStore((state) => state.uploadDocument);
  const verified = documents.filter((doc) => doc.state === 'VERIFIED').length;
  const progress = Math.round((verified / documents.length) * 100);
  return (
    <Panel title="Upload Documents">
      <div className="mb-4 rounded-lg bg-success-light p-3 text-sm text-success-dark">
        Identity Verification: Verified on 12 Jan 2026. Common KYC documents are reused from your existing KYC profile.
      </div>
      <div className="mb-4">
        <div className="mb-1 flex justify-between text-sm">
          <span className="font-semibold text-app">{verified} of {documents.length} documents verified</span>
          <span className="text-muted-app">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-primary-600" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="rounded-lg border border-app p-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-app">{doc.label}</p>
                <p className="text-sm text-muted-app">{doc.hint}</p>
                {doc.state === 'REJECTED' && <p className="text-sm text-error">{doc.rejectionReason ?? 'Unclear image, please re-upload.'}</p>}
              </div>
              <DocumentStateBadge state={doc.state} />
            </div>
            {doc.state === 'UPLOADING' || doc.state === 'PROCESSING' ? (
              <div className="mt-3 h-2 rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-primary-600" style={{ width: `${doc.progress}%` }} />
              </div>
            ) : null}
            <div className="mt-3 flex gap-2">
              {doc.state === 'VERIFIED' ? (
                <>
                  <button type="button" className="rounded-md border border-app px-3 py-1.5 text-sm font-semibold text-app">View</button>
                  <button type="button" onClick={() => uploadDocument(doc.id)} className="rounded-md border border-app px-3 py-1.5 text-sm font-semibold text-app">Replace</button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => uploadDocument(doc.id)} className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white">
                    <Upload className="h-4 w-4" /> Upload
                  </button>
                  <button type="button" className="rounded-md border border-app px-3 py-1.5 text-sm font-semibold text-app">Scan</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-app">Accepted formats: PDF, JPG, PNG. Max 5MB per file.</p>
    </Panel>
  );
}

function DocumentStateBadge({ state }: { state: DocumentState }) {
  const classes: Record<DocumentState, string> = {
    NOT_UPLOADED: 'bg-gray-100 text-gray-700',
    UPLOADING: 'bg-primary-50 text-primary-700',
    PROCESSING: 'bg-primary-50 text-primary-700',
    VERIFIED: 'bg-success-light text-success-dark',
    REJECTED: 'bg-error-light text-error-dark',
    EXPIRED: 'bg-warning-light text-warning-dark',
  };
  const label = state.replaceAll('_', ' ');
  return <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', classes[state])}>{label}</span>;
}

function ReviewStep() {
  const wizardData = useApplicationStore((state) => state.wizardData);
  const documents = useApplicationStore((state) => state.documents);
  const setReviewFlag = useApplicationStore((state) => state.setReviewFlag);
  const setWizardStep = useApplicationStore((state) => state.setWizardStep);
  const verified = documents.filter((doc) => doc.state === 'VERIFIED').length;
  return (
    <Panel title="Review Your Application">
      <div className="space-y-3">
        <ReviewBlock title="Product Summary" onEdit={() => setWizardStep(2)}>
          BankMate Home Flex Loan - {formatAmount(wizardData.employmentFinancial.requestedAmount)} at 8.45% p.a. Tenure {wizardData.employmentFinancial.tenureMonths} months.
        </ReviewBlock>
        <ReviewBlock title="Customer Information" onEdit={() => setWizardStep(1)}>
          {wizardData.customerInfo.fullName} - {wizardData.customerInfo.email} - {wizardData.customerInfo.mobile}
        </ReviewBlock>
        <ReviewBlock title="Employment & Financial" onEdit={() => setWizardStep(2)}>
          {wizardData.employmentFinancial.employerName} - {wizardData.employmentFinancial.designation} - {formatAmount(wizardData.employmentFinancial.monthlyIncome)}/month.
        </ReviewBlock>
        <ReviewBlock title="Documents" onEdit={() => setWizardStep(3)}>
          {verified} of {documents.length} documents verified.
        </ReviewBlock>
      </div>
      <div className="mt-4 space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium text-app">
          <input
            type="checkbox"
            checked={wizardData.reviewConfirmed}
            onChange={(event) => setReviewFlag('reviewConfirmed', event.target.checked)}
            className="h-4 w-4"
          />
          I confirm all the above information is accurate
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-app">
          <input
            type="checkbox"
            checked={wizardData.termsAccepted}
            onChange={(event) => setReviewFlag('termsAccepted', event.target.checked)}
            className="h-4 w-4"
          />
          I agree to the Terms & Conditions and Privacy Policy
        </label>
      </div>
    </Panel>
  );
}

function ReviewBlock({ title, children, onEdit }: { title: string; children: ReactNode; onEdit: () => void }) {
  return (
    <div className="rounded-lg border border-app p-3">
      <div className="mb-1 flex items-center justify-between">
        <p className="font-semibold text-app">{title}</p>
        <button type="button" onClick={onEdit} className="text-sm font-semibold text-primary-700">Edit</button>
      </div>
      <p className="text-sm text-muted-app">{children}</p>
    </div>
  );
}

function SuccessStep({ submittedAppId }: { submittedAppId: string | null }) {
  return (
    <Panel title="Application Submitted">
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-light text-success-dark">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h2 className="mt-4 text-2xl font-bold text-app">Your application is submitted</h2>
        <p className="mt-2 text-muted-app">We will notify you as your application moves through review.</p>
        <div className="mt-5 flex justify-center gap-3">
          <Link to={submittedAppId ? routeBuilders.applicationStatus(submittedAppId) : ROUTES.APPLICATIONS} className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
            Track Status
          </Link>
          <Link to={ROUTES.DASHBOARD} className="rounded-md border border-app px-4 py-2 text-sm font-semibold text-app">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </Panel>
  );
}

export function ApplicationWizardExperience({ manual = false }: { manual?: boolean }) {
  const params = useParams();
  const navigate = useNavigate();
  const wizardStep = useApplicationStore((state) => state.wizardStep);
  const setWizardStep = useApplicationStore((state) => state.setWizardStep);
  const autosave = useApplicationStore((state) => state.autosave);
  const submitApplication = useApplicationStore((state) => state.submitApplication);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const productId = params.productId ?? (manual ? 'home-flex' : 'home-flex');
  const product = productsById[productId] ?? defaultProduct;

  function next() {
    autosave();
    if (wizardStep === 4) {
      const appId = submitApplication(product.productId);
      setSubmittedAppId(appId);
      setWizardStep(5);
      return;
    }
    setWizardStep(wizardStep + 1);
  }

  function back() {
    setWizardStep(wizardStep - 1);
  }

  return (
    <div className="space-y-4 pb-24">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary-700">Digital Application</p>
          <h1 className="text-2xl font-bold text-app">{product.productName}</h1>
          <p className="text-sm text-muted-app">Draft application created from existing /applications endpoint mapping.</p>
        </div>
        <div className="flex items-center gap-2">
          <AutosaveIndicator />
          <button type="button" onClick={() => navigate(ROUTES.APPLICATIONS)} className="rounded-md border border-app px-3 py-2 text-sm font-semibold text-app">
            Save & Exit
          </button>
        </div>
      </div>
      <Stepper />
      <KycGateBanner />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main>
          {wizardStep === 1 && <CustomerInfoStep />}
          {wizardStep === 2 && <FinancialStep />}
          {wizardStep === 3 && <DocumentStep />}
          {wizardStep === 4 && <ReviewStep />}
          {wizardStep === 5 && <SuccessStep submittedAppId={submittedAppId} />}
          <div className="mt-4 flex items-center justify-between rounded-lg border border-app bg-surface p-3">
            <button type="button" onClick={back} disabled={wizardStep <= 1} className="rounded-md border border-app px-4 py-2 text-sm font-semibold text-app disabled:opacity-40">
              Back
            </button>
            <span className="text-sm text-muted-app">Autosave: <AutosaveIndicator /></span>
            {wizardStep < 5 && (
              <button type="button" onClick={next} className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
                {wizardStep === 4 ? 'Submit Application' : 'Next'}
              </button>
            )}
          </div>
        </main>
        <aside className="hidden xl:block">
          <EmbeddedCopilot context="QUALIFICATION_AGENT" />
        </aside>
      </div>
    </div>
  );
}

function KycGateBanner() {
  const kycStatus = useApplicationStore((state) => state.kycStatus);
  if (kycStatus === 'approved') {
    return (
      <section className="rounded-lg border border-success-light bg-success-light p-3 text-sm text-success-dark">
        KYC Approved. Your identity documents can be reused for this application.
      </section>
    );
  }
  return (
    <section className="rounded-lg border border-warning-light bg-warning-light p-3 text-sm text-warning-dark">
      KYC is {kycStatus.replace('_', ' ')}. Document upload and submission remain blocked until approved.
    </section>
  );
}

function filterApplications(apps: ApplicationRecord[], filter: ApplicationFilter) {
  if (filter === 'in_progress') return apps.filter((app) => ['SUBMITTED', 'UNDER_REVIEW'].includes(app.status));
  if (filter === 'action_needed') return apps.filter((app) => app.status === 'DOCUMENT_PENDING' || app.status === 'DRAFT');
  if (filter === 'completed') return apps.filter((app) => ['APPROVED', 'DISBURSED', 'REJECTED', 'WITHDRAWN', 'OFFER_ACCEPTED'].includes(app.status));
  return apps;
}

export function ApplicationsDashboardExperience() {
  const [filter, setFilter] = useState<ApplicationFilter>('all');
  const applications = useApplicationStore((state) => state.applications);
  const visible = useMemo(
    () => filterApplications([...applications].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)), filter),
    [applications, filter],
  );

  return (
    <div className="space-y-5 pb-24">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-app">My Applications</h1>
          <p className="text-muted-app">Track drafts, reviews, action items, approvals, and completed products.</p>
        </div>
        <Link to={ROUTES.APPLICATION_NEW} className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" />
          New Application
        </Link>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {[
          ['all', 'All'],
          ['in_progress', 'In Progress'],
          ['action_needed', 'Action Needed'],
          ['completed', 'Completed'],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value as ApplicationFilter)}
            className={cn('shrink-0 rounded-md border px-3 py-2 text-sm font-semibold', filter === value ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-app bg-surface text-muted-app')}
          >
            {label}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <section className="rounded-lg border border-dashed border-app bg-surface p-8 text-center">
          <FileText className="mx-auto h-9 w-9 text-primary-600" />
          <h2 className="mt-3 text-lg font-semibold text-app">Nothing here right now</h2>
          <p className="mt-1 text-sm text-muted-app">Switch tabs or explore recommendations to get started.</p>
          <Link to={ROUTES.RECOMMENDATIONS} className="mt-4 inline-flex rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
            View Recommendations
          </Link>
        </section>
      ) : (
        <section className="grid gap-4">
          {visible.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </section>
      )}
    </div>
  );
}

function ApplicationCard({ app }: { app: ApplicationRecord }) {
  const Icon = applicationIcon(app.status);
  const action =
    app.status === 'DRAFT'
      ? { label: 'Continue', to: routeBuilders.productApply(app.productId) }
      : app.status === 'APPROVED'
        ? { label: 'View Offer', to: routeBuilders.applicationAccept(app.id) }
        : { label: app.status === 'DOCUMENT_PENDING' ? 'Action Required' : 'View Details', to: routeBuilders.applicationDetail(app.id) };
  return (
    <article className="bm-card p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-semibold text-app">{app.productName}</h2>
            <p className="text-sm text-muted-app">{formatAmount(app.amount)} - {app.productProvider}</p>
            <p className="mt-1 text-xs text-muted-app">
              {app.referenceNumber ? `Ref: ${app.referenceNumber}` : `${app.progress}% complete`} - Updated {formatDate(app.updatedAt)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={app.status} />
          <Link to={action.to} className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white">
            {action.label}
          </Link>
        </div>
      </div>
      {app.status === 'DRAFT' && (
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-primary-600" style={{ width: `${app.progress}%` }} />
        </div>
      )}
    </article>
  );
}

function StatusBadge({ status }: { status: BackendApplicationStatus }) {
  return <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', statusClass(status))}>{statusLabel(status)}</span>;
}

export function ApplicationDetailExperience({ statusOnly = false }: { statusOnly?: boolean }) {
  const params = useParams();
  const app = getApp(params.appId);

  return (
    <div className="space-y-5 pb-24">
      <Link to={ROUTES.APPLICATIONS} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
        <ArrowLeft className="h-4 w-4" />
        Back to applications
      </Link>
      <StatusHero app={app} />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="space-y-5">
          <ApplicationTimeline app={app} />
          {!statusOnly && (
            <>
              <Panel title="Application Summary">
                <div className="grid gap-3 md:grid-cols-3">
                  <SummaryTile icon={WalletCards} label="Amount" value={formatAmount(app.amount)} />
                  <SummaryTile icon={Landmark} label="Interest" value={app.interestRate ? `${app.interestRate}% p.a.` : 'Card limit'} />
                  <SummaryTile icon={Clock} label="Tenure" value={app.tenureMonths ? `${app.tenureMonths} months` : 'Revolving'} />
                </div>
              </Panel>
              <Panel title="Documents">
                <div className="space-y-2">
                  {initialDocuments.slice(0, 5).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between rounded-md bg-surface-muted p-3 text-sm">
                      <span className="font-medium text-app">{doc.label}</span>
                      <span className="text-success-dark">Verified</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </>
          )}
        </main>
        <aside className="space-y-4">
          <StatusActionCard app={app} />
          <Panel title="Notifications">
            <div className="flex gap-3">
              <Bell className="h-5 w-5 text-primary-600" />
              <p className="text-sm text-muted-app">Status changes are delivered through existing push, SMS, email, WhatsApp, and in-app channels.</p>
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function StatusHero({ app }: { app: ApplicationRecord }) {
  return (
    <section className="rounded-lg bg-primary-600 p-5 text-white">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-primary-100">{app.referenceNumber ?? 'Draft application'}</p>
          <h1 className="mt-1 text-2xl font-bold">{app.productName}</h1>
          <p className="mt-2 text-sm text-primary-100">{app.productProvider} - {formatAmount(app.amount)}</p>
        </div>
        <span className="w-fit rounded-full bg-white px-3 py-1 text-sm font-semibold text-primary-700">{statusLabel(app.status)}</span>
      </div>
    </section>
  );
}

function ApplicationTimeline({ app }: { app: ApplicationRecord }) {
  return (
    <Panel title="Timeline Tracking">
      <ol className="space-y-0" aria-label="Application timeline">
        {timelineFor(app).map((event, index, events) => (
          <li key={event.id} className="relative flex gap-3 pb-6 last:pb-0">
            {index < events.length - 1 && <span className={cn('absolute left-3 top-7 h-full border-l', event.completed ? 'border-primary-200' : 'border-dashed border-gray-200')} />}
            <span className={cn('relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-surface', event.completed ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-300 text-gray-400')}>
              {event.completed ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
            </span>
            <div>
              <p className="font-semibold text-app">{event.label}</p>
              <p className="text-sm text-muted-app">{event.completed ? formatDate(event.timestamp) : event.timestamp}</p>
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

function StatusActionCard({ app }: { app: ApplicationRecord }) {
  if (app.status === 'DRAFT') {
    return (
      <Panel title="Draft">
        <p className="text-sm text-muted-app">{app.progress}% complete. Pick up where you left off.</p>
        <Link to={routeBuilders.productApply(app.productId)} className="mt-3 block rounded-md bg-primary-600 px-4 py-2 text-center text-sm font-semibold text-white">
          Continue Application
        </Link>
      </Panel>
    );
  }
  if (app.status === 'APPROVED') {
    return (
      <Panel title="Approved">
        <p className="text-sm text-muted-app">Your offer is ready for review and acceptance.</p>
        <Link to={routeBuilders.applicationAccept(app.id)} className="mt-3 block rounded-md bg-primary-600 px-4 py-2 text-center text-sm font-semibold text-white">
          View & Accept Offer
        </Link>
      </Panel>
    );
  }
  if (app.status === 'REJECTED') {
    return (
      <Panel title="Not Approved">
        <p className="text-sm text-muted-app">Reason: {app.rejectionReason}</p>
        <div className="mt-3 flex gap-2">
          <Link to={ROUTES.RECOMMENDATIONS} className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white">View Alternatives</Link>
          <Link to={ROUTES.CHAT_CUSTOMER} className="rounded-md border border-app px-3 py-2 text-sm font-semibold text-app">Talk to AI</Link>
        </div>
      </Panel>
    );
  }
  return (
    <Panel title={statusLabel(app.status)}>
      <p className="text-sm text-muted-app">Expected decision: 2-3 business days. We will notify you for each status change.</p>
      <Link to={routeBuilders.applicationStatus(app.id)} className="mt-3 block rounded-md border border-app px-4 py-2 text-center text-sm font-semibold text-app">
        View Timeline
      </Link>
    </Panel>
  );
}

function SummaryTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-muted p-3">
      <Icon className="h-5 w-5 text-primary-600" />
      <p className="mt-2 text-xs text-muted-app">{label}</p>
      <p className="font-semibold text-app">{value}</p>
    </div>
  );
}

export function AcceptOfferExperience() {
  const params = useParams();
  const navigate = useNavigate();
  const app = getApp(params.appId);
  const [accepted, setAccepted] = useState(false);
  const acceptOffer = useApplicationStore((state) => state.acceptOffer);
  const withdrawApplication = useApplicationStore((state) => state.withdrawApplication);

  function accept() {
    if (!accepted) return;
    acceptOffer(app.id);
    navigate(routeBuilders.applicationStatus(app.id));
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5 pb-24">
      <Link to={routeBuilders.applicationStatus(app.id)} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
        <ArrowLeft className="h-4 w-4" />
        Back to status
      </Link>
      <section className="bm-card p-5">
        <div className="mb-5 flex items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-success-light text-success-dark">
            <FileCheck className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-semibold text-success-dark">Your Offer</p>
            <h1 className="text-2xl font-bold text-app">{app.productName}</h1>
            <p className="text-muted-app">Review sanctioned terms before accepting.</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <OfferRow label="Amount" value={formatAmount(app.amount)} />
          <OfferRow label="Interest Rate" value={app.interestRate ? `${app.interestRate}% p.a.` : '0% revolving'} />
          <OfferRow label="Tenure" value={app.tenureMonths ? `${app.tenureMonths} months` : 'Card limit'} />
          <OfferRow label="EMI" value={app.emi ? `${formatAmount(app.emi)} / month` : 'As per statement'} />
          <OfferRow label="Processing Fee" value={app.productId === 'signature-card' ? 'Rs 999 annual fee' : 'Rs 2,500'} />
          <OfferRow label="Reference" value={app.referenceNumber ?? app.id} />
        </div>
        <label className="mt-5 flex items-center gap-2 text-sm font-medium text-app">
          <input type="checkbox" checked={accepted} onChange={(event: ChangeEvent<HTMLInputElement>) => setAccepted(event.target.checked)} className="h-4 w-4" />
          I accept the terms of this offer
        </label>
        <div className="mt-5 flex gap-3">
          <button type="button" disabled={!accepted} onClick={accept} className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white disabled:bg-gray-300">
            Accept Offer
          </button>
          <button type="button" onClick={() => { withdrawApplication(app.id); navigate(routeBuilders.applicationStatus(app.id)); }} className="rounded-md border border-app px-4 py-2 text-sm font-semibold text-app">
            Decline
          </button>
        </div>
      </section>
    </div>
  );
}

function OfferRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-muted p-3">
      <p className="text-xs text-muted-app">{label}</p>
      <p className="mt-1 font-semibold text-app">{value}</p>
    </div>
  );
}
