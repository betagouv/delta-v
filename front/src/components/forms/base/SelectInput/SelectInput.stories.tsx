import type { Meta } from '@storybook/react';

import { SelectInput } from './SelectInput';

export default {
  title: 'Components/Forms/Base/SelectInput',
  component: SelectInput,
} as Meta;

export const Base = () => (
  <div>
    <SelectInput id="gender" label="Select" placeholder="Choose gender">
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="none">Prefer not to say</option>
    </SelectInput>
  </div>
);
