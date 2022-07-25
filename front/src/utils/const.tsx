import { Alpha2Code } from 'i18n-iso-countries';

import { TabItem } from '@/components/common/TabBar';

export enum Routing {
  home = '/',
  simulator = '/simulateur/configuration/etape0',
  faq = '/faqs',
  prepareMyTrip = '/preparer-mon-voyage',
  about = '/a-propos',
}

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
    path: Routing.prepareMyTrip,
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
