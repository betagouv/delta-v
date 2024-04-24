import type { Meta, StoryObj } from '@storybook/react';

import { StorybookFormProvider } from '@/../.storybook/decorators';

import { PhoneInput } from '.';

const meta: Meta<typeof PhoneInput> = {
  title: 'forms/base/PhoneInput',
  component: PhoneInput,
  decorators: [(Story: any) => StorybookFormProvider(Story)]
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  args: {
    id: 'id',
    placeholder: 'Placeholder'
  }
};
