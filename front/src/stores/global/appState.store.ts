// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';

export interface GlobalData {
  displayInfoSimulator: boolean;
  displayTuto: boolean;
}

export interface GlobalAppStateSlice {
  global: {
    appState: GlobalData;
  };
}

export const GLOBAL_EMPTY_STATE = {
  displayInfoSimulator: true,
  displayTuto: true,
};

export const createGlobalAppStateSlice: StoreSlice<GlobalAppStateSlice> = () => ({
  global: {
    appState: GLOBAL_EMPTY_STATE,
  },
});
