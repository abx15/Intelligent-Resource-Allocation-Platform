import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isAuthRequest = originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/register');

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh-token'); // Or from store if persisted
                if (!refreshToken) throw new Error('No refresh token available');

                const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
                const { accessToken, refreshToken: newRefreshToken } = response.data.data;

                useAuthStore.getState().setAuth(useAuthStore.getState().user!, accessToken);
                localStorage.setItem('refresh-token', newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('refresh-token');
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
