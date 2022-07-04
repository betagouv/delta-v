import { TabItem } from '@/components/common/TabBar';

export const MENU_ITEMS: TabItem[] = [
  {
    icon: 'home',
    title: 'Accueil',
    path: '/',
  },
  {
    title: 'Préparer mon voyage',
    icon: 'luggages',
  },
  {
    icon: 'calculator',
    title: 'Simuler mes achats',
    path: '/simulateur/configuration/etape1',
  },
  {
    icon: 'question',
    title: 'FAQ',
    path: '/faqs',
  },
  {
    icon: 'info',
    title: 'À propos',
  },
];
