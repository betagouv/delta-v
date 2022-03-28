import React from 'react';

import { Meta } from '@storybook/react';

import { Input } from './Input';

export default {
  title: 'Components/Input/StandardInputs/Input',
  component: Input,
} as Meta;

export const base = (): JSX.Element => (
  <div>
     <Input name="test" type="text" placeholder="Placeholder" />
  </div>
);
