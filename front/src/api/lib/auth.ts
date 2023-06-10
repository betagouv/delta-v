import axios from 'axios';

import { ICommonResponse } from './types';
import { getCookie, removeCookie } from '@/utils/cookie';

export type AccessTokenType = {
  accessToken: string;
  refreshToken: string;
  token?: never;
};

export interface LoginRequestOptions {
  email: string;
  password: string;
}

export interface RegisterRequestOptions {
  email: string;
  password: string;
}

export interface ResetPasswordRequestOptions {
  password: string;
  token: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const loginRequest = async (loginData: LoginRequestOptions): Promise<LoginResponse> => {
  const response = await axios.post('/api/login/', loginData);
  return response.data;
};

export const registerRequest = async (registerData: {
  email: string;
  password: string;
}): Promise<ICommonResponse> => {
  const response = await axios.post('/api/agent/register/', registerData);
  return response.data;
};

export const askResetPasswordRequest = async (email: string): Promise<ICommonResponse> => {
  const response = await axios.post('/api/password/ask/', {
    email,
  });
  return response.data;
};

export const resetPasswordRequest = async (
  resetPasswordData: ResetPasswordRequestOptions,
): Promise<ICommonResponse> => {
  const response = await axios.post('/api/password/reset/', resetPasswordData);
  return response.data;
};

export const validateEmailRequest = async (token: string): Promise<ICommonResponse> => {
  const response = await axios.post('/api/email/validate/', {
    token,
  });
  return response.data;
};

export const refreshRequest = async (): Promise<AccessTokenType> => {
  const oldRefreshToken = getCookie('refreshToken') ?? '';
  const oldAccessToken = getCookie('accessToken') ?? '';
  const {
    data: { accessToken, refreshToken },
  } = await axios.post('/refresh/', {
    accessToken: oldAccessToken,
    refreshToken: oldRefreshToken,
  });
  return { accessToken, refreshToken };
};

export interface RefreshParams {
  refreshToken: string;
  accessToken: string;
}

export const logoutRequest = async (): Promise<void> => {
  removeCookie('accessToken');
  removeCookie('refreshToken');
};
