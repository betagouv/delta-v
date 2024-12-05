// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';

export interface CountdownState {
  countdownEnd: number | null;
}

export const COUNTDOWN_EMPTY_STATE: CountdownState = {
  countdownEnd: null,
};

export interface CountdownSlice {
  countdown: {
    appState: CountdownState;
  };
}

export const createCountdownSlice: StoreSlice<CountdownSlice> = () => ({
  countdown: {
    appState: COUNTDOWN_EMPTY_STATE,
  },
});
