import type { Meta } from '@storybook/react';

import { PhoneInput } from './PhoneInput';

export default {
  title: 'Components/Forms/Base/PhoneInput',
  component: PhoneInput,
} as Meta;

export const base = (): JSX.Element => (
  <div className="p-3">
    <PhoneInput id="address" label="Phone" />
    <br />
  </div>
);
