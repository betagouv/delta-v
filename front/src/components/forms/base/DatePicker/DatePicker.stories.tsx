import type { Meta, StoryObj } from '@storybook/react';

import { StorybookFormProvider } from '@/../.storybook/decorators';

import { DatePicker } from '.';

const meta: Meta<typeof DatePicker> = {
  title: 'forms/base/DatePicker',
  component: DatePicker,
  decorators: [(Story: any) => StorybookFormProvider(Story)]
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    id: 'Lorem ipsum dolor sit amet',
    label: 'Date',
    placeholder: 'dd/mm/yyyy'
  }
};
