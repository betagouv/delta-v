import type { Meta } from '@storybook/react';

import { DatePicker } from '.';

export default {
  title: 'Components/Forms/DatePicker',
  component: DatePicker,
  args: {
    id: 'Lorem ipsum dolor sit amet',
    label: 'Date',
    placeholder: 'dd/mm/yyyy',
  },
} as Meta;

export const Default = (args: any) => (
  <DatePicker id="Lorem ipsum dolor sit amet" label="Date" placeholder="dd/mm/yyyy" {...args} />
);
