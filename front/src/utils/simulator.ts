import { Routing } from './const';
import { SimulatorRequest } from '@/stores/simulator/appState.store';

export interface RouteLevel {
  path: string;
  level: number;
}

export const routes: RouteLevel[] = [
  {
    path: '/simulateur/configuration/etape1',
    level: 1,
  },
  {
    path: '/simulateur/configuration/etape2',
    level: 2,
  },
  {
    path: '/simulateur/configuration/etape3',
    level: 3,
  },
  {
    path: '/simulateur/configuration/etape4',
    level: 4,
  },
  {
    path: '/simulateur/produits',
    level: 5,
  },
  {
    path: '/simulateur/panier',
    level: 5,
  },
  {
    path: '/simulateur/recapitulatif',
    level: 5,
  },
];

export const getLevelWithData = (simulatorRequest: SimulatorRequest): number => {
  if (simulatorRequest.age === undefined) {
    return 1;
  }
  if (simulatorRequest.meanOfTransport === undefined) {
    return 2;
  }
  if (simulatorRequest.country === undefined) {
    return 3;
  }
  if (simulatorRequest.border === undefined) {
    return 4;
  }
  return 5;
};

export const getCurrentLevelPath = (path: string): number => {
  return routes.find((route) => path.startsWith(route.path))?.level ?? 1;
};

export const getCurrentPath = (simulatorRequest: SimulatorRequest): string => {
  const currentLevel = getLevelWithData(simulatorRequest);
  return routes.find((route) => route.level === currentLevel)?.path ?? Routing.home;
};
