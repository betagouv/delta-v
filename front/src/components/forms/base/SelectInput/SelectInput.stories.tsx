import type { Meta } from '@storybook/react';

import { SelectInput } from '.';

export default {
  title: 'Components/Forms/Base/SelectInput',
  component: SelectInput,
  args: {
    id: 'gender',
    label: 'Select',
    placeholder: 'Choose gender',
    options: [
      { value: 'false', label: 'No' },
      { value: 'true', label: 'Yes' },
    ],
  },
} as Meta;

export const Base = (args: any) => (
  <div>
    <SelectInput id="gender" {...args} />
  </div>
);
