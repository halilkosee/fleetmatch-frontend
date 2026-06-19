import { apiClient } from '../../lib/api/client';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export type CompanyType = 'BROKER' | 'FLEET';

export type RegisterRequest = {
  companyLegalName: string;
  companyDbaName?: string;
  companyEmail: string;
  companyPhone?: string;
  companyType: CompanyType;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
};

type RegisterResponse = {
  token: string;
};

export const authApi = {
  async login(payload: LoginRequest) {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', payload);
    return response.data;
  },

  async register(payload: RegisterRequest) {
    const response = await apiClient.post<RegisterResponse>('/api/auth/register', payload);
    return response.data;
  },
};
