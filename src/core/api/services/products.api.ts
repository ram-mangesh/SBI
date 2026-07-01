import axiosInstance from '../client/axios-instance';

export const productsApi = {
  list: () => axiosInstance.get('/products'),
  detail: (productId: string) => axiosInstance.get(`/products/${productId}`),
  compare: (productIds: string[]) => axiosInstance.post('/products/compare', { productIds }),
};
