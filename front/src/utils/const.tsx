import type { Alpha2Code } from 'i18n-iso-countries';

import { SvgNames } from '@/components/molecules/SvgIcon';
import { TabItem } from '@/components/molecules/TabBar';

export enum Routing {
  home = '/',
  simulator = '/simulateur/configuration/etape0',
  faq = '/faqs',
  createDeclaration = '/declaration/ajout/age',
  prepareMyTrip = '/preparer-mon-voyage',
  prepareMyTripConfig = '/preparer-mon-voyage/configuration',
  about = '/a-propos',
  tuto = '/tuto',
  simulatorBasket = '/simulateur/panier',
  simulatorProduct = '/simulateur/produits',
  simulatorSummary = '/simulateur/recapitulatif',
  simulatorDeclaration = '/simulateur/declaration',
  simulatorStep3 = '/simulateur/configuration/etape3',
  declarationProducts = '/declaration/produits',
  declarationAge = '/declaration/ajout/age',
  declarationContactDetails = '/declaration/ajout/coordonnees',
  declarationTransport = '/declaration/ajout/transports',
}

export enum RoutingAgent {
  home = '/agent',
  createDeclaration = '/agent/declaration/ajout/coordonnees',
  nomenclature = '/agent/nomenclature',
  declarations = '/agent/declaration',
  actualities = '/agent/actualites',
  account = '/agent/mon-compte',
  changePassword = '/agent/mon-compte/changer-mot-de-passe',
  changePasswordSuccess = '/agent/mon-compte/changer-mot-de-passe/validation',
  setDefaultCountry = '/agent/mon-compte/pays-par-defaut',
  contactUs = '/agent/contact',
  qrCodeManuel = '/agent/qr-code-manuel',
}

export enum RoutingAuthentication {
  login = '/agent/authentification',
  register = '/agent/authentification/inscription',
  registerSuccess = '/agent/authentification/inscription-reussie',
  registerValidation = '/agent/authentification/validation',
  forgetPassword = '/agent/authentification/mot-de-passe-oublie',
  forgetPasswordLinkSent = '/agent/authentification/mot-de-passe-oublie/lien-envoye',
  forgetPasswordLinkClicked = '/agent/authentification/mot-de-passe-oublie/nouveau-mot-de-passe',
  resetPassword = '/agent/authentification/mot-de-passe-oublie/reinitialiser',
  resetPasswordChange = '/agent/authentification/mot-de-passe-oublie/changer',
  resetPasswordSuccess = '/agent/authentification/mot-de-passe-oublie/validation',
}

export const DECLARATION_STEP_PAGE: Record<number, string> = {
  1: '/agent/declaration/ajout/coordonnees',
  2: '/agent/declaration/ajout/transports',
  3: '/agent/declaration/ajout/marchandises',
  4: '/agent/declaration/ajout/recapitulatif',
};

export const disabledCountries: Alpha2Code[] = [
  'FR',
  'BL',
  'GF',
  'PF',
  'TF',
  'MF',
  'MQ',
  'GP',
  'RE',
  'YT',
  'WF',
  'PM',
  'NC',
];

export const countriesAlternatives = [
  {
    id: 'CH',
    alternatives: ['Suisse', 'Switzerland', 'Schweiz'],
  },
  {
    id: 'US',
    alternatives: ['USA', 'United States', 'Etats-Unis'],
  },
  {
    id: 'GB',
    alternatives: ['Royaume-Uni', 'United Kingdom', 'Angleterre', 'UK'],
  },
  {
    id: 'DE',
    alternatives: ['Allemagne', 'Germany', 'Deutschland'],
  },
];

export const MENU_ITEMS: TabItem[] = [
  {
    icon: 'home',
    title: 'Accueil',
    path: Routing.home,
  },
  {
    title: (
      <>
        Préparer <br />
        mon voyage
      </>
    ),
    icon: 'luggages',
    path: Routing.prepareMyTripConfig,
  },
  {
    title: (
      <>
        Déclarer <br />
        mes achats
      </>
    ),
    path: Routing.createDeclaration,
    icon: 'douanier',
    declaration: true,
  },
  {
    icon: 'calculator',
    title: (
      <>
        Simuler <br />
        mes achats
      </>
    ),
    simulator: true,
    path: Routing.simulator,
  },
  {
    icon: 'question',
    title: 'FAQ',
    path: Routing.faq,
  },
];

export interface MenuAgentItem {
  id: string;
  title: string;
  path?: string;
  svgIcon: SvgNames;
  openDeclarationResumeModal?: boolean;
  disabled?: boolean;
}

export const MAIN_MENU_AGENT_ITEMS: MenuAgentItem[] = [
  {
    id: 'declaration',
    title: 'Créer une déclaration',
    svgIcon: 'categoryCreateDeclaration' as SvgNames,
    openDeclarationResumeModal: true,
  },
  {
    id: 'declarationList',
    title: 'Déclarations',
    path: RoutingAgent.declarations,
    svgIcon: 'douanier' as SvgNames,
  },
  {
    id: 'nomenclature',
    title: 'Nomenclature',
    path: RoutingAgent.nomenclature,
    svgIcon: 'categoryVetements' as SvgNames,
  },
  {
    id: 'actualities',
    title: 'Actualités',
    path: RoutingAgent.actualities,
    svgIcon: 'categoryActualities' as SvgNames,
    disabled: true,
  },
  {
    id: 'contact',
    title: 'Contact',
    path: RoutingAgent.contactUs,
    svgIcon: 'categoryContact' as SvgNames,
    disabled: false,
  },
  {
    id: 'account',
    title: 'Espace personnel',
    path: RoutingAgent.account,
    svgIcon: 'categorySmiley' as SvgNames,
    disabled: false,
  },
];

export const MY_ACCOUNT_MENU_AGENT_ITEMS: MenuAgentItem[] = [
  {
    id: 'change-password',
    title: 'Modifier mon mot de passe',
    path: RoutingAgent.changePassword,
    svgIcon: 'lock' as SvgNames,
  },
  {
    id: 'set-default-country',
    title: 'Modifier le pays de nomenclature par défaut',
    path: RoutingAgent.setDefaultCountry,
    svgIcon: 'earth' as SvgNames,
  },
];

export const isRoutingAgent = (path: string): boolean => {
  return Object.values(RoutingAgent).includes(path as RoutingAgent);
};
