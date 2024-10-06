import axios from 'axios';

import { ICommonResponse } from './types';
import { getAccessToken, getLastRefresh, getRefreshToken } from '@/utils/auth';

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

export interface ChangePasswordRequestOptions {
  oldPassword: string;
  newPassword: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  lastRefresh: boolean;
  timeToLogout: number;
}

export interface AgentConnectCallbackResponse {
  accessToken: string;
  refreshToken: string;
  lastRefresh: boolean;
}

export interface AgentConnectCallbackOptions {
  code: string;
  state: string;
  iss: string;
}

export interface AgentConnectLogoutResponse {
  logoutUrl: string;
}

export interface AgentConnectLogoutCallbackOptions {
  state: string;
}

export const loginRequest = async (loginData: LoginRequestOptions): Promise<LoginResponse> => {
  const response = await axios.post('/login/', loginData);
  return response.data;
};

export const refreshRequest = async (): Promise<LoginResponse> => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const lastRefresh = getLastRefresh();
  const response = await axios.post('/agent-connect/refresh/', {
    accessToken,
    refreshToken,
    lastRefresh: lastRefresh === 'true',
  });
  return response.data;
};

export const registerRequest = async (registerData: {
  email: string;
  password: string;
}): Promise<ICommonResponse> => {
  const response = await axios.post('/agent/register/', registerData);
  return response.data;
};

export const askEmailValidationRequest = async (email?: string): Promise<ICommonResponse> => {
  const response = await axios.post('/email/validate/ask/', {
    email,
  });
  return response.data;
};

export const askResetPasswordRequest = async (email: string): Promise<ICommonResponse> => {
  const response = await axios.post('/password/ask/', {
    email,
  });
  return response.data;
};

export const resetPasswordRequest = async (
  resetPasswordData: ResetPasswordRequestOptions,
): Promise<ICommonResponse> => {
  const response = await axios.post('/password/reset/', resetPasswordData);
  return response.data;
};

export const changePasswordRequest = async (
  changePasswordData: ChangePasswordRequestOptions,
): Promise<ICommonResponse> => {
  const response = await axios.post('/password/change/', changePasswordData);
  return response.data;
};

export const validateEmailRequest = async (token: string): Promise<ICommonResponse> => {
  const response = await axios.post('/email/validate/', {
    token,
  });
  return response.data;
};

export const initiateAgentConnectRequest = (): void => {
  window.location.href = '/api/agent-connect/initiate';
};

export const agentConnectCallbackRequest = async (
  callbackData: AgentConnectCallbackOptions,
): Promise<AgentConnectCallbackResponse> => {
  const response = await axios.get(
    `/agent-connect/authenticate?code=${callbackData.code}&state=${callbackData.state}&iss=${callbackData.iss}`,
  );
  return response.data;
};

export const agentConnectLogoutRequest = async (): Promise<void> => {
  window.location.href = '/api/agent-connect/logout';
};

export const agentConnectLogoutCallbackRequest = async ({
  state,
}: AgentConnectLogoutCallbackOptions): Promise<void> => {
  await axios.post('/agent-connect/logout-callback', { state });
};
