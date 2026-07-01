import axiosInstance from '../client/axios-instance';

export const analyticsApi = {
  event: (payload: unknown) => axiosInstance.post('/analytics/events', payload),
};
