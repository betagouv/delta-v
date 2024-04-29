import type { Meta } from '@storybook/react';

import { PhoneInput } from '.';

export default {
  title: 'Components/Forms/Base/PhoneInput',
  component: PhoneInput,
  args: {
    id: 'id',
    placeholder: 'Placeholder',
  },
} as Meta;

export const Base = (args: any) => (
  <div>
    <PhoneInput id="id" {...args} />
  </div>
);
