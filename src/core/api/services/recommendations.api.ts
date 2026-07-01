import axiosInstance from '../client/axios-instance';

export const recommendationsApi = {
  list: (customerId: string) => axiosInstance.get(`/recommendations/${customerId}`),
  detail: (recommendationId: string) => axiosInstance.get(`/recommendations/detail/${recommendationId}`),
  refresh: (customerId: string) => axiosInstance.post(`/recommendations/${customerId}/refresh`),
};
