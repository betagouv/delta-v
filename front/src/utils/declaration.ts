import { Routing } from './const';
import { DeclarationRequest } from '@/stores/declaration/appState.store';

export interface RouteLevel {
  path: string;
  level: number;
}

export const routes: RouteLevel[] = [
  {
    path: '/agent/declaration/ajout/coordonnees',
    level: 1,
  },
  {
    path: '/agent/declaration/ajout/transports',
    level: 2,
  },
  {
    path: '/agent/declaration/ajout/marchandises',
    level: 3,
  },
  {
    path: '/agent/declaration/ajout/recapitulatif',
    level: 4,
  },
];

export const getLevelWithData = (declarationRequest: DeclarationRequest): number => {
  if (
    declarationRequest.contactDetails.firstName === undefined ||
    declarationRequest.contactDetails.lastName === undefined ||
    declarationRequest.contactDetails.address === undefined ||
    declarationRequest.contactDetails.city === undefined ||
    declarationRequest.contactDetails.postalCode === undefined ||
    declarationRequest.contactDetails.email === undefined ||
    declarationRequest.contactDetails.phoneNumber === undefined
  ) {
    return 1;
  }
  if (
    declarationRequest.meansOfTransportAndCountry.meansOfTransport === undefined ||
    declarationRequest.meansOfTransportAndCountry.country === undefined
  ) {
    return 2;
  }
  if (declarationRequest.border === undefined) {
    return 4;
  }
  return 5;
};

export const getCurrentLevelPath = (path: string): number => {
  return routes.find((route) => path.startsWith(route.path))?.level ?? 1;
};

export const getCurrentPath = (declarationRequest: DeclarationRequest): string => {
  const currentLevel = getLevelWithData(declarationRequest);
  return routes.find((route) => route.level === currentLevel)?.path ?? Routing.home;
};
