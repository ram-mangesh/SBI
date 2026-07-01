import axiosInstance from '../client/axios-instance';

export const chatApi = {
  conversations: (customerId: string) => axiosInstance.get(`/chat/${customerId}/conversations`),
  send: (payload: unknown) => axiosInstance.post('/chat/messages', payload),
  history: (conversationId: string) => axiosInstance.get(`/chat/conversations/${conversationId}`),
};
