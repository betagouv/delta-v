import { Meta, StoryObj } from '@storybook/react';

import { StorybookFormProvider } from '@/../.storybook/decorators';

import { TimeInput } from './index';

const meta: Meta<typeof TimeInput> = {
  title: 'forms/base/TimeInput',
  component: TimeInput,
  tags: ['autodocs'],
  decorators: [(Story: any) => StorybookFormProvider(Story)]
};

export default meta;

type Story = StoryObj<typeof TimeInput>;

export const Primary: Story = {
  args: {
    id: 'username'
  }
};
