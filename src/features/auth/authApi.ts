import { apiClient } from '../../lib/api/client';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export const authApi = {
  async login(payload: LoginRequest) {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', payload);
    return response.data;
  },
};
