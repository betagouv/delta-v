import { Alpha2Code } from 'i18n-iso-countries';

import { SvgNames } from '@/components/common/SvgIcon';
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
  home = '/',
  createDeclaration = '/agent/declaration/ajout/coordonnees',
  nomenclature = '/agent/nomenclature',
  declarations = '/agent/declaration',
  actualities = '/agent/actualites',
  account = '/agent/mon-compte',
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
    path: Routing.simulator,
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

interface MenuAgentItem {
  id: string;
  title: string;
  path?: string;
  svgIcon: SvgNames;
  openDeclarationResumeModal?: boolean;
  disabled?: boolean;
}

export const MENU_AGENT_ITEMS: MenuAgentItem[] = [
  {
    id: 'declaration',
    title: 'Créer une déclaration',
    svgIcon: 'categoryCreateDeclaration' as SvgNames,
    openDeclarationResumeModal: true,
  },
  {
    id: 'nomenclature',
    title: 'Nomenclature',
    path: RoutingAgent.nomenclature,
    svgIcon: 'categoryVetements' as SvgNames,
    disabled: true,
  },
  {
    id: 'declarationList',
    title: 'Déclarations',
    path: RoutingAgent.declarations,
    svgIcon: 'categoryDouanier' as SvgNames,
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
    title: 'Nous contacter',
    path: RoutingAgent.contactUs,
    svgIcon: 'categoryContact' as SvgNames,
    disabled: true,
  },
  {
    id: 'account',
    title: 'Mon compte',
    path: RoutingAgent.account,
    svgIcon: 'categorySmiley' as SvgNames,
    disabled: true,
  },
];
