import React from 'react';

import type { Meta } from '@storybook/react';

import { TextInput } from '.';
import { Icon } from '@/components/atoms/Icon';

export default {
  title: 'Components/Forms/Base/TextInput',
  component: TextInput,
  args: {
    label: 'Lorem ipsum',
    id: 'InputBox id',
    placeholder: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    helperText: 'Consectetur adipiscing elit',
    readOnly: false,
  },
} as Meta;

export const WithLeftIcon = () => (
  <TextInput
    label="Lorem ipsum"
    id="InputBox id"
    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    helperText="Consectetur adipiscing elit"
    readOnly={false}
    leftIcon={<Icon name="search" />}
  />
);

export const WithRightIcon = () => (
  <TextInput
    label="Lorem ipsum"
    id="InputBox id"
    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    helperText="Consectetur adipiscing elit"
    readOnly={false}
    rightIcon={<Icon name="search" />}
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
    leftIcon={<Icon name="search" />}
  />
);
