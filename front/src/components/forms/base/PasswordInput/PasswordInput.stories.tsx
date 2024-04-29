import type { Meta } from '@storybook/react';

import { PasswordInput } from '.';

export default {
  title: 'Components/Forms/Base/PasswordInput',
  component: PasswordInput,
  args: {
    id: 'Lorem ipsum dolor sit amet',
    label: 'Password',
  },
} as Meta;

export const Default = (args: any) => (
  <PasswordInput id="Lorem ipsum dolor sit amet" label="Password" {...args} />
);
