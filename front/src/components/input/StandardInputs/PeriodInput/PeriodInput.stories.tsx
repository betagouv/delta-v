import { useState } from 'react';

import { Meta } from '@storybook/react';

import { PeriodInput } from './PeriodInput';

export default {
  title: 'Components/Input/StandardInputs/PeriodInput',
  component: PeriodInput,
} as Meta;

export const Base = (): JSX.Element => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const onChangeDate = (newStartDate: Date | null, newEndDate: Date | null) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <>
      <PeriodInput
        endDate={endDate}
        startDate={startDate}
        onChangeDate={() => onChangeDate(startDate, endDate)}
      />
    </>
  );
};
