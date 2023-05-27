// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';

export interface UserAppStateSlice {
  user: {
    appState: {
      isAgent?: boolean;
      error?: any;
    };
  };
}

export const USER_EMPTY_STATE = {
  isAgent: undefined,
  error: undefined,
};

export const createUserAppStateSlice: StoreSlice<UserAppStateSlice> = () => ({
  user: {
    appState: USER_EMPTY_STATE,
  },
});
