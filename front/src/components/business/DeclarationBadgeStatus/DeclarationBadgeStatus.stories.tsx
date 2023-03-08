import { Meta, StoryObj } from '@storybook/react';

import { DeclarationBadgeStatus } from './DeclarationBadgeStatus';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

const meta: Meta<typeof DeclarationBadgeStatus> = {
  title: 'Components/Business/DeclarationBadgeStatus',
  component: DeclarationBadgeStatus,
};

export default meta;
type Story = StoryObj<typeof DeclarationBadgeStatus>;

export const Base: Story = {
  args: { status: DeclarationStatus.DRAFT },
};
