/* eslint-disable import/no-cycle */
import { countries } from 'countries-list';
import create, { GetState, SetState, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  createCurrenciesAppStateSlice,
  CurrenciesAppStateSlice,
} from './currencies/appState.store';
import { createUseCaseCurrencySlice, CurrenciesUseCaseSlice } from './currencies/useCase.store';
import {
  createDeclarationAppStateSlice,
  DeclarationAppStateSlice,
} from './declaration/appState.store';
import {
  createUseCaseDeclarationSlice,
  DeclarationUseCaseSlice,
} from './declaration/useCase.store';
import { createFaqAppStateSlice, FaqAppStateSlice } from './faq/appState.store';
import { createUseCaseFaqSlice, FaqUseCaseSlice } from './faq/useCase.store';
import { createGlobalAppStateSlice, GlobalAppStateSlice } from './global/appState.store';
import { createUseCaseGlobalSlice, GlobalUseCaseSlice } from './global/useCase.store';
import {
  createPrepareMyTripAppStateSlice,
  PrepareMyTripAppStateSlice,
} from './prepareMyTrip/appState.store';
import {
  createUseCasePrepareMyTripSlice,
  PrepareMyTripUseCaseSlice,
} from './prepareMyTrip/useCase.store';
import { createProductsAppStateSlice, ProductsAppStateSlice } from './products/appState.store';
import { createUseCaseProductSlice, ProductsUseCaseSlice } from './products/useCase.store';
import {
  createSimulatorAppStateSlice,
  MeansOfTransport,
  SimulatorAppStateSlice,
} from './simulator/appState.store';
import { createUseCaseSimulatorSlice, SimulatorUseCaseSlice } from './simulator/useCase.store';
import { createUsersAppStateSlice, UsersAppStateSlice } from './users/appState.store';
import { createUseCaseUserSlice, UsersUseCaseSlice } from './users/useCase.store';

export type StoreState = SimulatorUseCaseSlice &
  SimulatorAppStateSlice &
  DeclarationAppStateSlice &
  DeclarationUseCaseSlice &
  ProductsUseCaseSlice &
  ProductsAppStateSlice &
  CurrenciesUseCaseSlice &
  CurrenciesAppStateSlice &
  GlobalUseCaseSlice &
  GlobalAppStateSlice &
  FaqAppStateSlice &
  FaqUseCaseSlice &
  PrepareMyTripAppStateSlice &
  PrepareMyTripUseCaseSlice &
  UsersAppStateSlice &
  UsersUseCaseSlice;

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
      ...createDeclarationAppStateSlice(set, get, api),
      ...createUseCaseDeclarationSlice(set, get, api),
      ...createUseCaseProductSlice(set, get, api),
      ...createProductsAppStateSlice(set, get, api),
      ...createCurrenciesAppStateSlice(set, get, api),
      ...createUseCaseCurrencySlice(set, get, api),
      ...createGlobalAppStateSlice(set, get, api),
      ...createUseCaseGlobalSlice(set, get, api),
      ...createFaqAppStateSlice(set, get, api),
      ...createUseCaseFaqSlice(set, get, api),
      ...createPrepareMyTripAppStateSlice(set, get, api),
      ...createUseCasePrepareMyTripSlice(set, get, api),
      ...createUsersAppStateSlice(set, get, api),
      ...createUseCaseUserSlice(set, get, api),
    }),

    {
      name: 'app-storage',
      getStorage: () => (typeof window !== 'undefined' ? localStorage : dummyStorageApi),
      version: 4,
      partialize: (state) => {
        return {
          simulator: state.simulator,
          declaration: state.declaration,
          products: state.products,
          currencies: state.currencies,
          global: state.global,
          users: state.users,
        };
      },
      migrate(persistedState: StoreState, version) {
        const newPersistedState = { ...persistedState };
        if (version < 3) {
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

        if (version < 4) {
          newPersistedState.simulator.appState.simulatorRequest.defaultCurrency =
            countries[
              newPersistedState.simulator.appState.simulatorRequest.country ?? 'FR'
            ].currency;
        }

        return newPersistedState;
      },
    },
  ),
);

export const clearStore = () => {
  localStorage.removeItem('app-storage');
};
