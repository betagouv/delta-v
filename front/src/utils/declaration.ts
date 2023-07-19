import { DeclarationRequest } from '@/stores/declaration/appState.store';

export interface RouteLevel {
  path: string;
  level: number;
}

export const routes: RouteLevel[] = [
  {
    path: '/declaration/ajout/age',
    level: 1,
  },
  {
    path: '/declaration/ajout/coordonnees',
    level: 2,
  },
  {
    path: '/declaration/ajout/transports',
    level: 3,
  },
  {
    path: '/declaration/ajout/marchandises',
    level: 4,
  },
  {
    path: '/declaration/ajout/recapitulatif',
    level: 5,
  },
];

export const getLevelWithData = (declarationRequest: DeclarationRequest): number => {
  if (declarationRequest.contactDetails.age === undefined) {
    return 1;
  }
  if (
    declarationRequest.contactDetails.firstName === undefined ||
    declarationRequest.contactDetails.lastName === undefined ||
    declarationRequest.contactDetails.address === undefined ||
    declarationRequest.contactDetails.city === undefined ||
    declarationRequest.contactDetails.postalCode === undefined ||
    declarationRequest.contactDetails.email === undefined ||
    declarationRequest.contactDetails.phoneNumber === undefined
  ) {
    return 2;
  }
  if (
    declarationRequest.meansOfTransportAndCountry.meansOfTransport === undefined &&
    declarationRequest.meansOfTransportAndCountry.country === undefined
  ) {
    return 3;
  }
  if (declarationRequest.shoppingProducts.length === 0) {
    return 4;
  }
  return 5;
};

export const getCurrentLevelPath = (path: string): number => {
  return routes.find((route) => path.startsWith(route.path))?.level ?? 1;
};
