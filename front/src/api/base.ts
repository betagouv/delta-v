import axios from 'axios';

import { refreshRequest } from './lib/auth';
import { Config } from '@/config';
import {
  CustomAxiosRequestConfig,
  clearTokens,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  shouldRefreshToken,
} from '@/utils/auth';
import { isAxiosError } from '@/utils/error';

interface ConfigureAxiosOptions {
  onRefreshTokenError: () => void;
  onRefreshTokenSuccess: (accessToken: string, refreshToken: string, lastRefresh: boolean) => void;
}

export const configureAxios = ({
  onRefreshTokenError,
  onRefreshTokenSuccess,
}: ConfigureAxiosOptions) => {
  axios.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
    const newConfig = { ...config };
    newConfig.baseURL = Config.apiBaseURL;

    newConfig.headers = config.headers || {};

    if (accessToken) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return newConfig;
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (!isAxiosError(error)) {
        return Promise.reject(error);
      }

      const errorResponse = error.response;
      const originalRequest: CustomAxiosRequestConfig = error.config;

      if (!errorResponse) {
        return Promise.reject(error);
      }

      if (typeof window === 'undefined') {
        return Promise.reject(errorResponse.data);
      }

      if (shouldRefreshToken(errorResponse.status, errorResponse.config, originalRequest)) {
        try {
          const response = await refreshRequest();
          setAccessToken(response.accessToken);
          setRefreshToken(response.refreshToken);
          onRefreshTokenSuccess(response.accessToken, response.refreshToken, response.lastRefresh);

          originalRequest.retry = true;
          return await axios(originalRequest);
        } catch (e) {
          clearTokens();
          onRefreshTokenError();
        }
      }

      return Promise.reject(errorResponse.data);
    },
  );
};
