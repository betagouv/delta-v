// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';

export interface UserAppStateSlice {
  user: {
    appState: {
      isAgent?: boolean;
      error?: any;
      success?: any;
    };
  };
}

export const USER_EMPTY_STATE = {
  isAgent: undefined,
  error: undefined,
  success: undefined,
};

export const createUserAppStateSlice: StoreSlice<UserAppStateSlice> = () => ({
  user: {
    appState: USER_EMPTY_STATE,
  },
});
