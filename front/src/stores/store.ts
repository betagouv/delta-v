/* eslint-disable import/no-cycle */
import create, { GetState, SetState, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';

import { createGlobalAppStateSlice, GlobalAppStateSlice } from './global/appState.store';
import { createUseCaseGlobalSlice, GlobalUseCaseSlice } from './global/useCase.store';
import { createProductsAppStateSlice, ProductsAppStateSlice } from './products/appState.store';
import { createUseCaseProductSlice, ProductsUseCaseSlice } from './products/useCase.store';
import {
  createSimulatorAppStateSlice,
  MeansOfTransport,
  SimulatorAppStateSlice,
} from './simulator/appState.store';
import { createUseCaseSimulatorSlice, SimulatorUseCaseSlice } from './simulator/useCase.store';

export type StoreState = SimulatorUseCaseSlice &
  SimulatorAppStateSlice &
  ProductsUseCaseSlice &
  ProductsAppStateSlice &
  GlobalUseCaseSlice &
  GlobalAppStateSlice;

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>,
  api: StoreApi<StoreState>,
) => T;

const dummyStorageApi = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

/**
 * Make sure to enforce type for each slice
 */

export const useStore = create<StoreState>(
  persist(
    (set, get, api) => ({
      ...createSimulatorAppStateSlice(set, get, api),
      ...createUseCaseSimulatorSlice(set, get, api),
      ...createUseCaseProductSlice(set, get, api),
      ...createProductsAppStateSlice(set, get, api),
      ...createGlobalAppStateSlice(set, get, api),
      ...createUseCaseGlobalSlice(set, get, api),
    }),
    {
      name: 'app-storage',
      getStorage: () => (typeof window !== 'undefined' ? localStorage : dummyStorageApi),
      version: 3,
      migrate(persistedState: StoreState, version) {
        const newPersistedState = { ...persistedState };
        if (version !== 3) {
          newPersistedState.simulator.appState.simulatorRequest.age =
            newPersistedState.simulator.appState.simulatorRequest.age ?? 0;
          newPersistedState.simulator.appState.simulatorRequest.meanOfTransport =
            newPersistedState.simulator.appState.simulatorRequest.meanOfTransport ??
            MeansOfTransport.PLANE;
          newPersistedState.simulator.appState.simulatorRequest.country =
            newPersistedState.simulator.appState.simulatorRequest.country ?? 'DE';
          newPersistedState.simulator.appState.simulatorRequest.border =
            newPersistedState.simulator.appState.simulatorRequest.border ?? false;
          newPersistedState.simulator.appState.simulatorRequest.shoppingProducts = [];
          newPersistedState.simulator.appState.simulatorResponse = undefined;
        }

        return newPersistedState;
      },
    },
  ),
);

export const clearStore = () => {
  localStorage.removeItem('app-storage');
};
