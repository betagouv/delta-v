import { Meta, StoryObj } from '@storybook/react';

import { MenuLink } from './MenuLink';

const meta: Meta<typeof MenuLink> = {
  title: 'Components/Business/MenuLink',
  component: MenuLink,
};

export default meta;
type Story = StoryObj<typeof MenuLink>;

export const Playground: Story = {
  args: {
    title: 'Lorem ipsum dolor',
    to: 'https://github.com/betagouv/delta-v',
    badgeNumber: '',
    iconName: '',
  },
};

const MENU_LINK_DATA = {
  title: 'Lorem ipsum dolor',
  to: 'https://github.com/betagouv/delta-v',
  badgeNumber: 12,
  iconName: 'camera',
};

export const Base = () => (
  <div>
    <MenuLink title="With icon" to={MENU_LINK_DATA.to} iconName={MENU_LINK_DATA.iconName} />
    <br />
    <MenuLink
      title="With badge number"
      to={MENU_LINK_DATA.to}
      badgeNumber={MENU_LINK_DATA.badgeNumber}
    />
    <br />
    <MenuLink title="No icon / no number" to={MENU_LINK_DATA.to} />
  </div>
);
