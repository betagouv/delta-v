import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

import { StorybookFormProvider } from '@/../.storybook/decorators';

import { TextInput } from '.';

const meta: Meta<typeof TextInput> = {
  title: 'forms/base/TextInput',
  component: TextInput,
  decorators: [(Story: any) => StorybookFormProvider(Story)]
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: 'Lorem ipsum',
    id: 'InputBox id',
    placeholder: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    helperText: 'Consectetur adipiscing elit',
    readOnly: false
  }
};

export const WithLeftIcon = () => (
  <TextInput
    label="Lorem ipsum"
    id="InputBox id"
    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    helperText="Consectetur adipiscing elit"
    readOnly={false}
    leftIcon={<BiSearchAlt2 className="w-5 h-5 text-slate-500 dark:text-slate-400" />}
  />
);

export const WithRightIcon = () => (
  <TextInput
    label="Lorem ipsum"
    id="InputBox id"
    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    helperText="Consectetur adipiscing elit"
    readOnly={false}
    rightIcon={<BiSearchAlt2 className="w-5 h-5 text-slate-500 dark:text-slate-400" />}
  />
);

export const Horizontal = () => (
  <TextInput
    horizontal={true}
    label="Lorem ipsum"
    id="InputBox id"
    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    helperText="Consectetur adipiscing elit"
    readOnly={false}
    leftIcon={<BiSearchAlt2 className="w-5 h-5 text-slate-500 dark:text-slate-400" />}
  />
);
