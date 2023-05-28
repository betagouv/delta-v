import { Alpha2Code } from 'i18n-iso-countries';

import { TabItem } from '@/components/common/TabBar';

export enum Routing {
  home = '/',
  simulator = '/simulateur/configuration/etape0',
  faq = '/faqs',
  prepareMyTrip = '/preparer-mon-voyage',
  prepareMyTripConfig = '/preparer-mon-voyage/configuration',
  about = '/a-propos',
  tuto = '/tuto',
}

export enum RoutingAgent {
  home = '/agent/',
  nomenclature = '/agent/nomenclature',
  quittances = '/agent/quittances',
  actualities = '/agent/actualites',
  account = '/agent/mon-compte',
  contactUs = '/agent/contact',
  qrCodeManuel = '/agent/qr-code-manuel',
  declaration = '/agent/declaration',
}

export enum RoutingAuthentication {
  login = '/agent/authentification',
  register = '/agent/authentification/inscription',
  forgetPassword = '/agent/authentification/mot-de-passe-oublie',
  resetPassword = '/agent/authentification/mot-de-passe-oublie/reset',
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
    icon: 'calculator',
    title: (
      <>
        Simuler <br />
        mes achats
      </>
    ),
    simulator: true,
  },
  {
    icon: 'question',
    title: 'FAQ',
    path: Routing.faq,
  },
  {
    icon: 'info',
    title: 'À propos',
    path: Routing.about,
  },
];

export const MENU_AGENT_ITEMS = [
  {
    title: 'Accueil',
    path: RoutingAgent.home,
  },
  {
    title: 'Nomenclature',
    path: RoutingAgent.nomenclature,
  },
  {
    title: 'Quittance',
    path: RoutingAgent.quittances,
  },
  {
    title: 'Actualités',
    path: RoutingAgent.actualities,
  },
  {
    title: 'Mon compte',
    path: RoutingAgent.account,
  },
  {
    title: 'Nous contacter',
    path: RoutingAgent.contactUs,
  },
];
