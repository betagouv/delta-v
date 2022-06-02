import { Alpha2Code } from 'i18n-iso-countries';

// eslint-disable-next-line import/no-cycle
import { StoreSlice } from '../store';

export enum MeansOfTransport {
  PLANE = 'plane',
  BOAT = 'boat',
  TRAIN = 'train',
  CAR = 'car',
  OTHER = 'other',
}

export interface SimulatorAppStateSlice {
  simulator: {
    appState: {
      age: number | undefined;
      meanOfTransport: MeansOfTransport | undefined;
      country: Alpha2Code | undefined;
      border: boolean | undefined;
    };
  };
}

export const SIMULATOR_EMPTY_STATE = {
  age: undefined,
  meanOfTransport: undefined,
  country: undefined,
  border: undefined,
};

export const createSimulatorAppStateSlice: StoreSlice<SimulatorAppStateSlice> = () => ({
  simulator: {
    appState: SIMULATOR_EMPTY_STATE,
  },
});
