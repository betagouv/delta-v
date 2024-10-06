/* eslint-disable import/no-cycle */

import jwtDecode from 'jwt-decode';

import { StoreSlice } from '../store';
import { USER_EMPTY_STATE } from './appState.store';

export interface UsersUseCaseSlice {
  setUserFromToken: (
    accessToken: string,
    refreshToken: string,
    lastRefresh: boolean,
  ) => Promise<void>;
  clearUser: () => Promise<void>;
}

interface IAuthObject {
  userId: string;
  email: string;
}

export const createUseCaseUserSlice: StoreSlice<UsersUseCaseSlice> = (set) => ({
  setUserFromToken: async (accessToken, refreshToken, lastRefresh) => {
    if (!accessToken || !refreshToken) {
      return;
    }

    set((state: any) => {
      const newState = { ...state };
      const { exp } = jwtDecode<{ exp: number }>(refreshToken);
      const { userId, email } = jwtDecode<IAuthObject>(accessToken);

      newState.users.appState.user.userId = userId;
      newState.users.appState.user.email = email;
      newState.users.appState.user.isAgent = true;
      newState.users.appState.user.exp = exp;
      newState.users.appState.user.lastRefresh = lastRefresh;

      return newState;
    });
  },
  clearUser: async () => {
    set((state: any) => {
      const newState = { ...state };
      newState.users.appState = USER_EMPTY_STATE;
      return newState;
    });
  },
});
