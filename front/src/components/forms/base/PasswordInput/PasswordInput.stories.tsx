import type { Meta, StoryObj } from '@storybook/react';

import { StorybookFormProvider } from '@/../.storybook/decorators';

import { PasswordInput } from '.';

const meta: Meta<typeof PasswordInput> = {
  title: 'forms/base/PasswordInput',
  component: PasswordInput,
  decorators: [(Story: any) => StorybookFormProvider(Story)]
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    id: 'Lorem ipsum dolor sit amet',
    label: 'Password'
  }
};
