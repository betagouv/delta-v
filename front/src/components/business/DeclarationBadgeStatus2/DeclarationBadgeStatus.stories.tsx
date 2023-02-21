import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DeclarationBadgeStatus> = {
  title: 'Components/Business/DeclarationBadgeStatus',
  component: DeclarationBadgeStatus,
};

export default meta;
type Story = StoryObj<typeof DeclarationBadgeStatus>;

export const Base: Story = {
  args: {
    status: 'draft',
  },
};
