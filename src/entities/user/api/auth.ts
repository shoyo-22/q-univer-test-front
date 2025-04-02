import { api } from '@/shared/api/base';

export interface User {
  id: string;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export const authApi = {
  login: (data: LoginRequest) => {
    return api.post<{ user: User }>('/auth/login', data);
  },

  register: (data: RegisterRequest) => {
    return api.post<{ user: User }>('/auth/register', data);
  },

  logout: () => {
    return api.post('/auth/logout');
  },

  getCurrentUser: () => {
    return api.get<{ user: User }>('/user/profile');
  },
};
