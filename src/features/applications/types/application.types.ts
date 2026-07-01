export type BackendApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'DOCUMENT_PENDING'
  | 'APPROVED'
  | 'OFFER_ACCEPTED'
  | 'DISBURSED'
  | 'REJECTED'
  | 'WITHDRAWN'
  | 'EXPIRED';

export type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'error';
export type KycStatus = 'not_started' | 'in_progress' | 'approved' | 'rejected';
export type DocumentState = 'NOT_UPLOADED' | 'UPLOADING' | 'PROCESSING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
export type ApplicationFilter = 'all' | 'in_progress' | 'action_needed' | 'completed';

export interface WizardData {
  customerInfo: {
    fullName: string;
    email: string;
    mobile: string;
    pan: string;
    addressLine1: string;
    city: string;
    state: string;
    pinCode: string;
    addressConfirmed: boolean;
  };
  employmentFinancial: {
    customerType: 'SALARIED' | 'SELF_EMPLOYED' | 'STUDENT' | 'SENIOR' | 'NRI';
    employerName: string;
    designation: string;
    monthlyIncome: number;
    yearsAtEmployer: number;
    salaryBank: string;
    requestedAmount: number;
    tenureMonths: number;
  };
  reviewConfirmed: boolean;
  termsAccepted: boolean;
}

export interface ApplicationDocumentItem {
  id: string;
  label: string;
  hint: string;
  state: DocumentState;
  progress: number;
  rejectionReason?: string;
}

export interface TimelineEvent {
  id: string;
  label: string;
  timestamp: string;
  completed: boolean;
  tone?: 'success' | 'warning' | 'error' | 'info';
}

export interface ApplicationRecord {
  id: string;
  productId: string;
  productName: string;
  productProvider: string;
  referenceNumber?: string;
  status: BackendApplicationStatus;
  progress: number;
  amount: number;
  interestRate: number;
  tenureMonths: number;
  emi: number;
  updatedAt: string;
  submittedAt?: string;
  currentStep: number;
  source: 'recommendation' | 'product_catalog' | 'dashboard_quick_action' | 'ai_copilot';
  rejectionReason?: string;
}

export interface ApplicationStore {
  applications: ApplicationRecord[];
  wizardStep: number;
  autosaveStatus: AutosaveStatus;
  kycStatus: KycStatus;
  wizardData: WizardData;
  documents: ApplicationDocumentItem[];
  statusToast: string | null;
  setWizardStep: (step: number) => void;
  saveField: <K extends 'customerInfo' | 'employmentFinancial'>(section: K, value: Partial<WizardData[K]>) => void;
  setReviewFlag: (field: 'reviewConfirmed' | 'termsAccepted', value: boolean) => void;
  autosave: () => void;
  uploadDocument: (id: string) => void;
  submitApplication: (productId?: string) => string;
  acceptOffer: (appId: string) => void;
  withdrawApplication: (appId: string) => void;
}
