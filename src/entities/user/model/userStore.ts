import { defineStore } from 'pinia';
import { api } from '@/shared/api/base';
import type { Course } from '@/pages/root-page/index.vue';

interface User {
  id: string;
  username: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isLoggedIn: false,
    isLoading: false,
    enrolledCoursesByUser: null as Course[] | null,
  }),
  actions: {
    async checkAuth() {
      try {
        this.isLoading = true;

        if (this.user) {
          this.isLoading = false;
          return;
        }

        const response = await api.get('/user/profile');
        if (response.data.user) {
          this.user = response.data.user;
          this.isLoggedIn = true;
          this.enrolledCoursesByUser = response.data.enrolledCourses;
        } else {
          this.user = null;
          this.isLoggedIn = false;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        this.user = null;
        this.isLoggedIn = false;
      } finally {
        this.isLoading = false;
      }
    },

    async login(username: string, password: string) {
      try {
        this.isLoading = true;
        const response = await api.post('/auth/login', { username, password });
        if (response.data.user) {
          this.user = response.data.user;
          this.isLoggedIn = true;
        }
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async register(username: string, password: string) {
      try {
        this.isLoading = true;
        const response = await api.post('/auth/register', { username, password });
        if (response.data.user) {
          this.user = response.data.user;
          this.isLoggedIn = true;
        }
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      } finally {
        this.isLoading = false;
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
