import globalAxios from 'axios';
import { AuthRes } from './types';

export const API_URL = import.meta.env.VITE_API_URL;

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
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const originalRequest = error.config;

    try {
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config._isRetry &&
        accessToken &&
        refreshToken
      ) {
        originalRequest._isRetry = true;

        const response = await globalAxios.post<AuthRes>(
          `${API_URL}/authentication/refresh-tokens`,
          { refreshToken: refreshToken },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        localStorage.setItem('access_token', response.data.tokens.accessToken);
        localStorage.setItem('refresh_token', response.data.tokens.refreshToken);

        return http.request(originalRequest);
      }
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }

    throw error.response.data.message;
  },
);
