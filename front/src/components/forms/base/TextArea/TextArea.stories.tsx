import type { Meta, StoryObj } from '@storybook/react';

import { StorybookFormProvider } from '@/../.storybook/decorators';

import { TextArea } from '.';

const meta: Meta<typeof TextArea> = {
  title: 'forms/base/TextArea',
  component: TextArea,
  decorators: [(Story: any) => StorybookFormProvider(Story)]
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: 'Lorem ipsum dolor sit amet',
    id: 'TextArea id',
    placeholder: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    helperText: 'Consectetur adipiscing elit',
    readOnly: false
  }
};

export const Horizontal: Story = {
  args: {
    horizontal: true,
    label: 'Lorem ipsum dolor sit amet',
    id: 'TextArea id',
    placeholder: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    helperText: 'Consectetur adipiscing elit',
    readOnly: false
  }
};
