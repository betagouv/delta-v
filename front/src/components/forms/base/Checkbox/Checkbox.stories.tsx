import React from 'react';

import { Checkbox } from '.';

export default {
  title: 'Components/Forms/Base/Checkbox',
  component: Checkbox,
  argTypes: {
    label: { control: 'text' },
    id: { control: 'text' },
    helperText: { control: 'text' },
    readOnly: { control: 'boolean' },
  },
};

export const Horizontal = () => (
  <Checkbox
    horizontal={true}
    label="Lorem ipsum"
    id="InputBox id"
    helperText="Consectetur adipiscing elit"
    readOnly={false}
  />
);

export const Disabled = () => (
  <Checkbox
    horizontal={true}
    label="Lorem ipsum"
    id="InputBox id"
    helperText="Consectetur adipiscing elit"
    readOnly={true}
  />
);
