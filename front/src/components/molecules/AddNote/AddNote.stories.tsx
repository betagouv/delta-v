import { Meta, StoryObj } from '@storybook/react';

import { AddNote } from './AddNote';

const meta: Meta<typeof AddNote> = {
  title: 'Components/Business/AddNote',
  component: AddNote,
};

export default meta;
type Story = StoryObj<typeof AddNote>;

export const Base: Story = {
  args: {
    label: 'Prénom',
    value: 'Pierre',
    isRequired: true,
  },
};
