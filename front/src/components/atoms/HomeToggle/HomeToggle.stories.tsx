import { Meta, Story } from '@storybook/react';

import { HomeToggle, HomeToggleProps } from './HomeToggle';

export default {
  title: 'Components/Atoms/HomeToggle',
  component: HomeToggle,
} as Meta;

export const Playground: Story<HomeToggleProps> = (args) => <HomeToggle {...args} />;

Playground.args = {
  valueLeft: 'Déclaration',
  valueRight: 'Outils',
};

export const Base = (): JSX.Element => {
  return (
    <div>
      <HomeToggle valueLeft="Déclaration" valueRight="Outils" />
    </div>
  );
};
