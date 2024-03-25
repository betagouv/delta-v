import { Meta, StoryObj } from '@storybook/react';

import { DataInfoItem } from './DataInfoItem';

const meta: Meta<typeof DataInfoItem> = {
  title: 'Components/Atoms/DataInfoItem',
  component: DataInfoItem,
};

export default meta;
type Story = StoryObj<typeof DataInfoItem>;

export const Base: Story = {
  args: {
    label: 'Prénom',
    value: 'Pierre',
    isRequired: true,
  },
};
