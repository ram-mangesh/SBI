import axiosInstance from '../client/axios-instance';

export const transactionsApi = {
  list: (customerId: string) => axiosInstance.get(`/transactions/${customerId}`),
  detail: (transactionId: string) => axiosInstance.get(`/transactions/detail/${transactionId}`),
  categories: (customerId: string) => axiosInstance.get(`/transactions/${customerId}/categories`),
};
