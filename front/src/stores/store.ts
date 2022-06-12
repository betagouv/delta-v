/* eslint-disable import/no-cycle */
import create, { GetState, SetState, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';

import { createProductsAppStateSlice, ProductsAppStateSlice } from './products/appState.store';
import { createUseCaseProductSlice, ProductsUseCaseSlice } from './products/useCase.store';
import { createSimulatorAppStateSlice, SimulatorAppStateSlice } from './simulator/appState.store';
import { createUseCaseSimulatorSlice, SimulatorUseCaseSlice } from './simulator/useCase.store';

export type StoreState = SimulatorUseCaseSlice &
  SimulatorAppStateSlice &
  ProductsUseCaseSlice &
  ProductsAppStateSlice;

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
      ...createUseCaseProductSlice(set, get, api),
      ...createProductsAppStateSlice(set, get, api),
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
