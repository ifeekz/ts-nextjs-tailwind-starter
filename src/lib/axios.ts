// lib/axios
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const COOKIE_DOMAIN = `.${process.env.NEXT_PUBLIC_DOMAIN}`; // leading dot is important

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

let isRefreshing = false;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (err: any) => void;
};

let refreshQueue: QueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  refreshQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else if (token) {
      p.resolve(token);
    }
  });

  refreshQueue = [];
};

const logout = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  window.location.href = '/en/login';
};

/* -----------------------------------------------------------
 * REQUEST INTERCEPTOR
 * ----------------------------------------------------------- */
api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* -----------------------------------------------------------
 * RESPONSE INTERCEPTOR (refresh + retry + logout)
 * ----------------------------------------------------------- */
api.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = Cookies.get('refresh_token');

          if (!refreshToken) {
            return Promise.reject('No refresh token found');
          }

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
            { refreshToken },
          );

          if (res.status !== 200) {
            logout();
            return Promise.reject('Unable to refresh token');
          }

          const newAccessToken = res.data.accessToken;
          const newRefreshToken = res.data.refreshToken;

          Cookies.set('access_token', newAccessToken, {
            domain: COOKIE_DOMAIN,
            path: '/',
            secure: true, // use only over HTTPS (ngrok or real TLS)
            sameSite: 'lax',
            expires: 7,
          });
          Cookies.set('refresh_token', newRefreshToken, {
            domain: COOKIE_DOMAIN,
            path: '/',
            secure: true, // use only over HTTPS (ngrok or real TLS)
            sameSite: 'lax',
            expires: 14,
          });

          processQueue(null, newAccessToken);

          isRefreshing = false;

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          logout();

          return Promise.reject(refreshError);
        }
      }

      // If a refresh is already in progress → queue this request
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token: string) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    return Promise.reject(error);
  },
);

export default api;
