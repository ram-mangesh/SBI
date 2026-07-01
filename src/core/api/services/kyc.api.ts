import axiosInstance from '../client/axios-instance';

export const kycApi = {
  status: (customerId: string) => axiosInstance.get(`/kyc/${customerId}/status`),
  uploadDocument: (customerId: string, payload: unknown) => axiosInstance.post(`/kyc/${customerId}/documents`, payload),
  submit: (customerId: string) => axiosInstance.post(`/kyc/${customerId}/submit`),
};
