import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

export default {
  title: 'Components/Forms/Base/Input',
  component: Input,
} as Meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Lorem ipsum',
    id: 'InputBox id',
    placeholder: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    helperText: 'Consectetur adipiscing elit',
    readOnly: true,
  },
};

export const Examples = () => (
  <div>
    <Input
      label="Titre"
      id="a"
      placeholder="Contenu non modifiable"
      helperText="Texte d'aide"
      readOnly
    ></Input>
    <Input label="Titre" id="a" placeholder="Contenu modifiable" helperText="Texte d'aide"></Input>
  </div>
);
