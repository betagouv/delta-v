import { Meta, StoryObj } from '@storybook/react';

import { NewDataInfoItem } from './NewDataInfoItem';

const meta: Meta<typeof NewDataInfoItem> = {
  title: 'Components/Business/NewDataInfoItem',
  component: NewDataInfoItem,
};

export default meta;
type Story = StoryObj<typeof NewDataInfoItem>;

export const Base: Story = {
  args: {
    label: 'Prénom',
    value: 'Pierre',
    isRequired: true,
  },
};
