import { defineStore } from 'pinia';
import { login } from '@/services/authService';
import { logout } from '@/services/authService';
import { getToken } from '@/services/authService';
import { isAuthenticated } from '@/services/authService';
import { register } from '@/services/authService';
import { getUserInfo } from '@/services/authService';
import { fetchAllUsers } from '@/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: isAuthenticated(),
    role: localStorage.getItem('role') || null,
    userInfo: null,
    users: [],
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await login(credentials);
        const data = response.data;

        if (data.token) {
          this.role = data.user.role
          this.user = data.user;
          this.isAuthenticated = true;
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.user.role);

        } else {
          throw new Error("Invalid credentials");
        }

        return data;
      } catch (error) {
        throw error;
      }
    },

    async register(credentials) {
      try {
        const response = await register(credentials);
        const data = response.data;


        return data;
      } catch (error) {
        throw error;
      }
    },

    async getInfo() {
      try {
        const response = await getUserInfo();
        const data = response.data;
        console.log(this.userInfo)
        this.userInfo = data;
      } catch (error) {
        throw error;
      }
    },

    async getAllUsers() {
      this.loading = true; 
      
      try {
          const users = await fetchAllUsers();
          this.users = users;
          return users;
      } catch (error) {
          console.error("Failed to fetch users:", error);
      } finally {

          this.loading = false; 

      }
  },
  

  logout() {
    logout();
    this.user = null;
    this.role = null;
    this.isAuthenticated = false;
  },
},
});
