import create, { GetState, SetState, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';

// eslint-disable-next-line import/no-cycle
import { createSimulatorAppStateSlice, SimulatorAppStateSlice } from './simulator/appState.store';
// eslint-disable-next-line import/no-cycle
import { createUseCaseSimulatorSlice, SimulatorUseCaseSlice } from './simulator/useCase.store';

export type StoreState = SimulatorUseCaseSlice & SimulatorAppStateSlice;

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>,
  api: StoreApi<StoreState>,
) => T;

/**
 * Make sure to enforce type for each slice
 */

export const useStore = create<StoreState>(
  persist(
    (set, get, api) => ({
      ...createSimulatorAppStateSlice(set, get, api),
      ...createUseCaseSimulatorSlice(set, get, api),
    }),
    {
      name: 'app-storage',
      getStorage: () => localStorage,
    },
  ),
);

export const clearStore = () => {
  localStorage.removeItem('app-storage');
};
