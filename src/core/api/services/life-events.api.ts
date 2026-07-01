import axiosInstance from '../client/axios-instance';

export const lifeEventsApi = {
  list: (customerId: string) => axiosInstance.get(`/customers/${customerId}/life-events`),
  detail: (eventId: string) => axiosInstance.get(`/life-events/${eventId}`),
  refreshDetection: (customerId: string) => axiosInstance.post(`/customers/${customerId}/life-events/detect`),
};
