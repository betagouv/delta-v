// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';
// eslint-disable-next-line import/no-cycle

export interface GlobalUseCaseSlice {
  hideInfoSimulator: () => void;
  hideTuto: () => void;
}

export const createUseCaseGlobalSlice: StoreSlice<GlobalUseCaseSlice> = (set) => ({
  hideInfoSimulator: (): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.global.appState.displayInfoSimulator = false;
      return newState;
    });
  },
  hideTuto: (): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.global.appState.displayTuto = false;
      return newState;
    });
  },
});
