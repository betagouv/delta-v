// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';

export interface UsersAppStateSlice {
  users: {
    appState: {
      user: {
        userId?: string;
        email?: string;
        isAgent?: boolean;
        exp?: number;
        lastRefresh?: boolean;
      };
    };
  };
}

export const USER_EMPTY_STATE = {
  user: {
    userId: undefined,
    email: undefined,
    isAgent: undefined,
  },
};

export const createUsersAppStateSlice: StoreSlice<UsersAppStateSlice> = () => ({
  users: {
    appState: USER_EMPTY_STATE,
  },
});
