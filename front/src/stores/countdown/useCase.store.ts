// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';

export interface CountdownUseCaseSlice {
  setCountdownEnd: (endTime: number) => void;
  clearCountdown: () => void;
  getCountdownEnd: () => number | null;
}

export const createUseCaseCountdownSlice: StoreSlice<CountdownUseCaseSlice> = (set, get) => ({
  setCountdownEnd: (endTime: number): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.countdown.appState.countdownEnd = endTime;
      return newState;
    });
  },
  clearCountdown: (): void => {
    set((state: any) => {
      const newState = { ...state };
      newState.countdown.appState.countdownEnd = null;
      return newState;
    });
  },
  getCountdownEnd: (): number | null => {
    return get().countdown.appState.countdownEnd;
  },
});
