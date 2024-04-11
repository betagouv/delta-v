import { DECLARATION_STEP_PAGE, Routing } from './const';
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

export const getLevelWithData = (declarationAgentRequest: DeclarationRequest): number => {
  if (
    declarationAgentRequest?.contactDetails.firstName === undefined ||
    declarationAgentRequest?.contactDetails.lastName === undefined ||
    declarationAgentRequest?.contactDetails.address === undefined ||
    declarationAgentRequest?.contactDetails.city === undefined ||
    declarationAgentRequest?.contactDetails.postalCode === undefined ||
    declarationAgentRequest?.contactDetails.email === undefined ||
    declarationAgentRequest?.contactDetails.phoneNumber === undefined ||
    declarationAgentRequest?.contactDetails.age === undefined
  ) {
    return 1;
  }
  if (
    declarationAgentRequest?.meansOfTransportAndCountry.meansOfTransport === undefined &&
    declarationAgentRequest?.meansOfTransportAndCountry.country === undefined
  ) {
    return 2;
  }
  if (declarationAgentRequest?.shoppingProducts.length === 0) {
    return 3;
  }
  return 4;
};

export const getCurrentLevelPath = (path: string): number => {
  return routes.find((route) => path.startsWith(route.path))?.level ?? 1;
};

export const getCurrentPath = (declarationAgentRequest: DeclarationRequest): string => {
  const currentLevel = getLevelWithData(declarationAgentRequest);
  return routes.find((route) => route.level === currentLevel)?.path ?? Routing.home;
};

export const checkIsOneOfDeclarationStepsPath = (path: string): boolean => {
  return Object.values(DECLARATION_STEP_PAGE).includes(path);
};
