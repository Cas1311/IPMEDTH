import { defineStore } from 'pinia';
import { login } from '@/services/authService';
import { logout } from '@/services/authService';
import { getToken } from '@/services/authService';
import { isAuthenticated } from '@/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: isAuthenticated(),
  }),

  actions: {
    async login(credentials) {
      try {
        const response  = await login(credentials);
        const data = response.data;

        if (data.token) {
            this.user = data.user;
            this.isAuthenticated = true;
            localStorage.setItem("token", data.token);
          } else {
            throw new Error("Invalid credentials");
          }
  
          return data; 
        } catch (error) {
          throw error; 
        }
      },

    logout() {
      logout();
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
