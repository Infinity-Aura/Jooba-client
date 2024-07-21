import globalAxios from 'axios';
import { AuthRes } from './types';

export const API_URL: string = import.meta.env.VITE_SERVER_URL;

export const http = globalAxios.create({
  baseURL: API_URL,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  return config;
});

http.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refresh_token');
    if (error.response.status === 401 && error.config && !error.config._isRetry && refreshToken) {
      originalRequest._isRetry = true;
      try {
        const response = await globalAxios.post<AuthRes>(
          `${API_URL}/authentication/refresh-tokens`,
          {
            withCredentials: true,
          },
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );
        localStorage.setItem('access_token', response.data.tokens.accessToken);
        localStorage.setItem('refresh_token', response.data.tokens.refreshToken);
        return http.request(originalRequest);
      } catch (e) {
        console.log('Not authorized');
      }
    }
    throw error;
  },
);
