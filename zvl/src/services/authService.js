import axiosInstance from './axiosInstance';


export async function login(credentials) {
    try {
        const response = await axiosInstance.post('/login', credentials);
        return response
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export async function register(credentials) {
    try {
        const response = await axiosInstance.post('/users', credentials);
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

export async function getUserInfo() {
    try {
        const response = await axiosInstance.get('/user');
        return response
    } catch (error) {
        console.error('Error getting user information:', error);
        throw error;
    }
}
