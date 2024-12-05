/* eslint-disable import/no-cycle */
import clone from 'clone';
import { countries } from 'countries-list';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import create, { GetState, SetState, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';

import { CountdownSlice, createCountdownSlice } from './countdown/appState.store';
import { CountdownUseCaseSlice, createUseCaseCountdownSlice } from './countdown/useCase.store';
import {
  createCurrenciesAppStateSlice,
  CurrenciesAppStateSlice,
} from './currencies/appState.store';
import { createUseCaseCurrencySlice, CurrenciesUseCaseSlice } from './currencies/useCase.store';
import {
  createDeclarationAppStateSlice,
  DECLARATION_EMPTY_STATE,
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
  SIMULATOR_EMPTY_STATE,
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
  UsersUseCaseSlice &
  CountdownSlice &
  CountdownUseCaseSlice;

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
      ...createCountdownSlice(set, get, api),
      ...createUseCaseCountdownSlice(set, get, api),
    }),

    {
      name: 'app-storage',
      getStorage: () => (typeof window !== 'undefined' ? localStorage : dummyStorageApi),
      version: 5,
      partialize: (state) => {
        return {
          simulator: state.simulator,
          declaration: state.declaration,
          products: state.products,
          currencies: state.currencies,
          global: state.global,
          users: state.users,
          countdown: state.countdown,
        };
      },
      migrate(persistedState: StoreState, version) {
        const newPersistedState = { ...persistedState };
        if (version < 3) {
          newPersistedState.simulator.appState = clone(SIMULATOR_EMPTY_STATE);
        }

        if (version < 4) {
          newPersistedState.simulator.appState.simulatorRequest.defaultCurrency =
            countries[
              newPersistedState.simulator.appState.simulatorRequest.country ?? 'FR'
            ].currency;
        }

        if (version < 5) {
          newPersistedState.declaration.appState = clone(DECLARATION_EMPTY_STATE);
        }

        return newPersistedState;
      },
    },
  ),
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore);
}

export const clearStore = () => {
  localStorage.removeItem('app-storage');
};
