import { Meta } from '@storybook/react';

import { PeriodInput } from './PeriodInput';

export default {
  title: 'Components/Input/StandardInputs/PeriodInput',
  component: PeriodInput,
} as Meta;

export const Base = (): JSX.Element => {
  return (
    <>
      <PeriodInput endDateName="endDate" startDateName="startDate" />
    </>
  );
};
