/* eslint-disable import/no-cycle */

import axios, { AxiosResponse } from 'axios';
import { SetState } from 'zustand';

import { StoreSlice, StoreState } from '../store';
import { setCookie } from '@/utils/cookie';

export interface UserUseCaseSlice {
  login: (loginData: { email: string; password: string }) => Promise<boolean>;
  askResetPassword: (askResetPasswordData: { email: string }) => Promise<boolean>;
  resetPassword: (resetPasswordData: { password: string; token: string }) => Promise<boolean>;
}

const manageApiCall = async (
  apiCall: Promise<AxiosResponse<any, any>>,
  set: SetState<StoreState>,
): Promise<{ success: boolean; response: AxiosResponse<any, any> }> => {
  try {
    const response = await apiCall;
    set((state: any) => {
      const newState = { ...state };
      newState.user.appState.success = response?.data;
      newState.user.appState.error = undefined;
      return newState;
    });
    return { success: true, response };
  } catch (error: any) {
    set((state: any) => {
      const newState = { ...state };
      newState.user.appState.error = error?.response?.data;
      newState.user.appState.success = undefined;
      return newState;
    });
    return { success: false, response: error?.response };
  }
};

export const createUseCaseUserSlice: StoreSlice<UserUseCaseSlice> = (set) => ({
  login: async ({ email, password }) => {
    const apiCall = axios.post('/api/login', {
      email,
      password,
    });
    const { success, response } = await manageApiCall(apiCall, set);
    if (success) {
      setCookie('accessToken', response.data.accessToken);
      setCookie('refreshToken', response.data.refreshToken);
    }
    return success;
  },
  askResetPassword: async ({ email }) => {
    const apiCall = axios.post('/api/password/ask', {
      email,
    });
    const { success } = await manageApiCall(apiCall, set);
    return success;
  },
  resetPassword: async ({ password, token }) => {
    const apiCall = axios.post('/api/password/reset', {
      password,
      token,
    });
    const { success } = await manageApiCall(apiCall, set);
    return success;
  },
});
