import axiosInstance from '../client/axios-instance';

export const applicationsApi = {
  list: (customerId: string) => axiosInstance.get(`/applications/${customerId}`),
  detail: (applicationId: string) => axiosInstance.get(`/applications/detail/${applicationId}`),
  submit: (payload: unknown) => axiosInstance.post('/applications', payload),
  acceptOffer: (applicationId: string) => axiosInstance.post(`/applications/${applicationId}/accept`),
};
