import type { Meta } from '@storybook/react';

import { DatePicker } from './DatePicker';

export default {
  title: 'Components/Forms/DatePicker',
  component: DatePicker,
} as Meta;

export const Base = () => (
  <div>
    <DatePicker
      id="date"
      label="Date"
      validation={{
        required: 'Date must be filled',
        valueAsDate: true,
      }}
      placeholder="dd/mm/yyyy"
    />
  </div>
);
