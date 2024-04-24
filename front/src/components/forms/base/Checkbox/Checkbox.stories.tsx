import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { StorybookFormProvider } from '@/../.storybook/decorators';

import { Checkbox } from '.';

const meta: Meta<typeof Checkbox> = {
  title: 'forms/base/Checkbox',
  component: Checkbox,
  decorators: [(Story: any) => StorybookFormProvider(Story)]
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Lorem ipsum',
    id: 'InputBox id',
    helperText: 'Consectetur adipiscing elit',
    readOnly: false
  }
};

export const Horizontal = () => <Checkbox horizontal={true} label="Lorem ipsum" id="InputBox id" helperText="Consectetur adipiscing elit" readOnly={false} />;

export const Disabled = () => <Checkbox horizontal={true} label="Lorem ipsum" id="InputBox id" helperText="Consectetur adipiscing elit" readOnly={true} />;
