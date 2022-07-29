import { Meta } from '@storybook/react';

import { TabBar, TabItem } from './TabBar';

export default {
  title: 'Components/Common/TabBar',
  component: TabBar,
} as Meta;

const items: TabItem[] = [
  {
    icon: 'home',
    title: 'Accueil',
    path: '/',
  },
  {
    icon: 'search',
    title: 'Recherche',
    path: '/search',
  },
];

export const base = (): JSX.Element => (
  <div className="p-3">
    <TabBar items={items} openSimulator={() => {}} />
    <br />
  </div>
);
