import { create } from 'zustand';
import { defaultProduct, initialApplications, initialDocuments, initialWizardData, productsById } from '../data/application.mock';
import type { ApplicationRecord, ApplicationStore } from '../types/application.types';

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applications: initialApplications,
  wizardStep: 1,
  autosaveStatus: 'saved',
  kycStatus: 'approved',
  wizardData: initialWizardData,
  documents: initialDocuments,
  statusToast: null,
  setWizardStep: (step) => set({ wizardStep: Math.min(Math.max(step, 1), 5) }),
  saveField: (section, value) => {
    set((state) => ({
      wizardData: {
        ...state.wizardData,
        [section]: {
          ...state.wizardData[section],
          ...value,
        },
      },
      autosaveStatus: 'saving',
    }));
    window.setTimeout(() => set({ autosaveStatus: 'saved' }), 450);
  },
  setReviewFlag: (field, value) => {
    set((state) => ({
      wizardData: {
        ...state.wizardData,
        [field]: value,
      },
      autosaveStatus: 'saving',
    }));
    window.setTimeout(() => set({ autosaveStatus: 'saved' }), 450);
  },
  autosave: () => {
    set({ autosaveStatus: 'saving' });
    window.setTimeout(() => set({ autosaveStatus: 'saved' }), 450);
  },
  uploadDocument: (id) => {
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, state: 'UPLOADING', progress: 40 } : doc,
      ),
      autosaveStatus: 'saving',
    }));
    window.setTimeout(() => {
      set((state) => ({
        documents: state.documents.map((doc) =>
          doc.id === id ? { ...doc, state: 'PROCESSING', progress: 80 } : doc,
        ),
      }));
    }, 500);
    window.setTimeout(() => {
      set((state) => ({
        documents: state.documents.map((doc) =>
          doc.id === id ? { ...doc, state: 'VERIFIED', progress: 100 } : doc,
        ),
        autosaveStatus: 'saved',
      }));
    }, 1000);
  },
  submitApplication: (productId = 'home-flex') => {
    const product = productsById[productId] ?? defaultProduct;
    const appId = `app-${product.productId}-${Date.now().toString().slice(-5)}`;
    const app: ApplicationRecord = {
      id: appId,
      ...product,
      referenceNumber: `APP-2026-${Math.floor(10000000 + Math.random() * 89999999)}`,
      status: 'SUBMITTED',
      progress: 100,
      updatedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      currentStep: 5,
      source: 'product_catalog',
    };
    set((state) => ({
      applications: [app, ...state.applications.filter((item) => item.id !== appId)],
      wizardStep: 5,
      statusToast: `${app.productName} submitted successfully`,
    }));
    return appId;
  },
  acceptOffer: (appId) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === appId ? { ...app, status: 'OFFER_ACCEPTED', updatedAt: new Date().toISOString() } : app,
      ),
      statusToast: 'Offer accepted. Disbursal is in progress.',
    })),
  withdrawApplication: (appId) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === appId ? { ...app, status: 'WITHDRAWN', updatedAt: new Date().toISOString() } : app,
      ),
    })),
}));
