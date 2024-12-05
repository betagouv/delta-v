import { AxiosRequestConfig } from 'axios';

import { getCookie, removeCookie, setCookie } from './cookie';

const AUTHENTICATION_ERROR_STATUS = 401;
const REFRESH_ACCESS_TOKEN_API_URL = '/refresh/';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  retry?: boolean;
}

export const setAccessToken = (value: string) => {
  if (value) {
    setCookie('accessToken', value);
  }
};

export const setRefreshToken = (value: string) => {
  if (value) {
    setCookie('refreshToken', value);
  }
};

export const setLastRefresh = (value: string) => {
  if (value) {
    setCookie('lastRefresh', value);
  }
};

export const getAccessToken = (): string | undefined => getCookie('accessToken');
export const getRefreshToken = (): string | undefined => getCookie('refreshToken');
export const getLastRefresh = (): string | undefined => getCookie('lastRefresh');

export const clearTokens = () => {
  removeCookie('accessToken');
  removeCookie('refreshToken');
  removeCookie('lastRefresh');
};

export const hasToken = () => {
  return !!getAccessToken() && !!getRefreshToken();
};

const isAccessTokenExpiredError = (status: number) => status === AUTHENTICATION_ERROR_STATUS;

const isRefreshEndpointFromConfig = (config: AxiosRequestConfig) =>
  config?.url === REFRESH_ACCESS_TOKEN_API_URL;

export const shouldRefreshToken = (
  status: number,
  config: AxiosRequestConfig<any>,
  originalRequest: CustomAxiosRequestConfig,
) => {
  if (originalRequest.retry) {
    return false;
  }

  if (isRefreshEndpointFromConfig(config)) {
    return false;
  }

  if (!isAccessTokenExpiredError(status)) {
    return false;
  }

  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  if (!accessToken || !refreshToken) {
    return false;
  }

  return true;
};
