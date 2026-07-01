import axiosInstance from '../client/axios-instance';

export const customerApi = {
  getProfile: (customerId: string) => axiosInstance.get(`/customers/${customerId}`),
  updateProfile: (customerId: string, payload: unknown) => axiosInstance.put(`/customers/${customerId}`, payload),
  getFinancialSnapshot: (customerId: string) => axiosInstance.get(`/customers/${customerId}/financial-profile`),
};
