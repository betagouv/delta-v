import { Meta } from '@storybook/react';

import { HomeToggle } from './HomeToggle';

export default {
  title: 'Components/Business/HomeToggle',
  component: HomeToggle,
} as Meta;

export const Base = (): JSX.Element => <HomeToggle value />;
