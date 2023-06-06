import { Routing } from './const';
import { DeclarationRequest, MeansOfTransport } from '@/stores/declaration/appState.store';

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
    declarationRequest.contactDetails.firstName === '' ||
    declarationRequest.contactDetails.lastName === '' ||
    declarationRequest.contactDetails.address === '' ||
    declarationRequest.contactDetails.city === '' ||
    declarationRequest.contactDetails.postalCode === '' ||
    declarationRequest.contactDetails.email === '' ||
    declarationRequest.contactDetails.phoneNumber === '' ||
    declarationRequest.contactDetails.age === 0
  ) {
    return 1;
  }
  if (
    declarationRequest.meansOfTransportAndCountry.meansOfTransport === MeansOfTransport.OTHER &&
    declarationRequest.meansOfTransportAndCountry.country === 'FR'
  ) {
    return 2;
  }
  if (declarationRequest.validateProducts.length === 0) {
    return 3;
  }
  return 4;
};

export const getCurrentLevelPath = (path: string): number => {
  return routes.find((route) => path.startsWith(route.path))?.level ?? 1;
};

export const getCurrentPath = (declarationRequest: DeclarationRequest): string => {
  const currentLevel = getLevelWithData(declarationRequest);
  return routes.find((route) => route.level === currentLevel)?.path ?? Routing.home;
};
