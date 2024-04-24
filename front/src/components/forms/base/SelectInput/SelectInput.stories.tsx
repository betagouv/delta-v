import type { Meta, StoryObj } from '@storybook/react';

import { StorybookFormProvider } from '@/../.storybook/decorators';

import { SelectInput } from '.';

const meta: Meta<typeof SelectInput> = {
  title: 'forms/base/SelectInput',
  component: SelectInput,
  decorators: [(Story: any) => StorybookFormProvider(Story)]
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

export const Default: Story = {
  args: {
    id: 'gender',
    label: 'Select',
    placeholder: 'Choose gender',
    options: [
      { value: 'false', label: 'No' },
      { value: 'true', label: 'Yes' }
    ]
  }
};
