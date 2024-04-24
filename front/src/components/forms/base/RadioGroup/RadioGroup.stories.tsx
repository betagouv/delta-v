import type { Meta, StoryObj } from '@storybook/react';

import { StorybookFormProvider } from '@/../.storybook/decorators';

import { RadioGroup } from '.';

const meta: Meta<typeof RadioGroup> = {
  title: 'forms/base/RadioGroup',
  component: RadioGroup,
  decorators: [(Story: any) => StorybookFormProvider(Story)]
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    id: 'element',
    label: 'Prefered element',
    options: [
      { value: 'ice', title: 'Ice' },
      { value: 'fire', title: 'Fire' },
      { value: 'electricity', title: 'Electricity' }
    ]
  }
};
