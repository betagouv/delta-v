/* eslint-disable import/no-cycle */

import axios from 'axios';

import { StoreSlice } from '../store';
import { setCookie } from '@/utils/cookie';

export interface UserUseCaseSlice {
  login: (loginData: { email: string; password: string }) => Promise<boolean>;
}

export const createUseCaseUserSlice: StoreSlice<UserUseCaseSlice> = (set) => ({
  login: async ({ email, password }) => {
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      setCookie('accessToken', response.data.accessToken);
      setCookie('refreshToken', response.data.refreshToken);
      return true;
    } catch (error: any) {
      set((state: any) => {
        const newState = { ...state };
        newState.user.appState.error = error?.response?.data;
        return newState;
      });
      return false;
    }
  },
});
