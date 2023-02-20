import { Meta, StoryObj } from '@storybook/react';

import { declarationBadgeStatus } from './declarationBadgeStatus';

const meta: Meta<typeof declarationBadgeStatus> = {
  title: 'Components/Business/declarationBadgeStatus',
  component: declarationBadgeStatus,
};

export default meta;
type Story = StoryObj<typeof declarationBadgeStatus>;

export const Base: Story = {
  args: {
    status: 'draft',
  },
};
