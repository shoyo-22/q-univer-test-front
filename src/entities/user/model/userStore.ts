import { defineStore } from 'pinia';
import { api } from '@/shared/api/base';

interface User {
  id: string;
  username: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isLoggedIn: false,
  }),
  actions: {
    async checkAuth() {
      try {
        const response = await api.get('/user/profile');
        if (response.data.user) {
          this.user = response.data.user;
          this.isLoggedIn = true;
        } else {
          this.user = null;
          this.isLoggedIn = false;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        this.user = null;
        this.isLoggedIn = false;
      }
    },

    async login(username: string, password: string) {
      try {
        const response = await api.post('/auth/login', { username, password });
        if (response.data.user) {
          this.user = response.data.user;
          this.isLoggedIn = true;
        }
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    async register(username: string, password: string) {
      try {
        const response = await api.post('/auth/register', { username, password });
        if (response.data.user) {
          this.user = response.data.user;
          this.isLoggedIn = true;
        }
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },

    async logout() {
      try {
        await api.post('/auth/logout');
        this.user = null;
        this.isLoggedIn = false;
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
  },
});
