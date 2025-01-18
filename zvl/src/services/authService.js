import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    
  });


  export async function login(credentials) {
    try {
        const response = await instance.post('/login', credentials);
        return response
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export function logout() {
    localStorage.removeItem('token');
}

export function getToken() {
    return localStorage.getItem('token');
}

export function isAuthenticated() {
    return !!localStorage.getItem('token');
}
