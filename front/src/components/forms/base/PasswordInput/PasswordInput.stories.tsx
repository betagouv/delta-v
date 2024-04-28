import type { Meta } from '@storybook/react';

import { PasswordInput } from './PasswordInput';

export default {
  title: 'Components/Forms/Base/PasswordInput',
  component: PasswordInput,
} as Meta;

export const Base = () => (
  <div>
    <PasswordInput id="address" label="Password" />
  </div>
);
