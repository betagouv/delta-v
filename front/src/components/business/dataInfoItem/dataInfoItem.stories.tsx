import { Meta, StoryObj } from '@storybook/react';

import { dataInfoItem } from './dataInfoItem';

const meta: Meta<typeof dataInfoItem> = {
  title: 'Components/Business/dataInfoItem',
  component: dataInfoItem,
};

export default meta;
type Story = StoryObj<typeof dataInfoItem>;

export const Base: Story = {
  args: {
    label: 'Prénom',
    value: 'Pierre',
    isRequired: true,
  },
};
