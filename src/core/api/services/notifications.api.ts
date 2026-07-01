import axiosInstance from '../client/axios-instance';

export const notificationsApi = {
  list: (customerId: string) => axiosInstance.get(`/notifications/${customerId}`),
  history: (customerId: string) => axiosInstance.get(`/notifications/${customerId}/history`),
  markRead: (notificationId: string) => axiosInstance.put(`/notifications/${notificationId}/read`),
  markAllRead: (customerId: string) => axiosInstance.put(`/notifications/${customerId}/read-all`),
  preferences: () => axiosInstance.get('/notifications/preferences'),
  updatePreferences: (payload: unknown) => axiosInstance.put('/notifications/preferences', payload),
};
