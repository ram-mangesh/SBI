import axiosInstance from '../client/axios-instance';

export const voiceApi = {
  campaigns: () => axiosInstance.get('/voice/campaigns'),
  initiate: (payload: unknown) => axiosInstance.post('/voice/initiate', payload),
  history: (customerId: string) => axiosInstance.get(`/voice/history/${customerId}`),
  preferences: () => axiosInstance.get('/voice/preferences'),
  updatePreferences: (payload: unknown) => axiosInstance.put('/voice/preferences', payload),
};
