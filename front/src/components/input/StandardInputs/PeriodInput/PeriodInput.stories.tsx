import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { PeriodInput } from './PeriodInput';

export default {
  title: 'Components/Input/StandardInputs/PeriodInput',
  component: PeriodInput,
} as Meta;

export const Base = (): JSX.Element => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PeriodInput
          register={register}
          startDateInputId="startDate"
          endDateInputId="endDate"
          // noBorder
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
