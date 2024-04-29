import type { Meta } from '@storybook/react';

import { RadioGroup } from '.';

export default {
  title: 'Components/Forms/Base/RadioGroup',
  component: RadioGroup,
  args: {
    id: 'element',
    label: 'Prefered element',
    options: [
      { value: 'ice', title: 'Ice' },
      { value: 'fire', title: 'Fire' },
      { value: 'electricity', title: 'Electricity' },
    ],
  },
} as Meta;

export const Base = (args: any) => (
  <div>
    <RadioGroup id="element" {...args} />
  </div>
);
