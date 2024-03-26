import { Meta } from '@storybook/react';

import { NavBar } from './NavBar';
import { MAIN_MENU_AGENT_ITEMS } from '@/utils/const';

export default {
  title: 'Components/Molecules/NavBar',
  component: NavBar,
} as Meta;

export const withVariant = (): JSX.Element => <NavBar links={MAIN_MENU_AGENT_ITEMS} />;
