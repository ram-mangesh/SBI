import axiosInstance from '../client/axios-instance';

export const adminApi = {
  dashboard: () => axiosInstance.get('/admin/dashboard'),
  customers: () => axiosInstance.get('/admin/customers'),
  campaigns: () => axiosInstance.get('/admin/campaigns'),
};
