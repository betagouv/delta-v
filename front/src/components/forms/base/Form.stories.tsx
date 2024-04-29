import * as React from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { DatePicker } from './DatePicker';
import { PasswordInput } from './PasswordInput';
import { PhoneInput } from './PhoneInput';
import { SelectInput } from './SelectInput';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/forms/base/Input';
import { TextArea } from '@/components/forms/base/TextArea';

const meta = {
  title: 'forms/All',
};

export default meta;

type SandboxForm = {
  name: string;
  gender: 'male' | 'female' | 'none';
  gender2: 'male' | 'female' | 'none';
  date: Date;
  address: string;
};

export const FormInputs = () => {
  const methods = useForm<SandboxForm>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<SandboxForm> = (data) => {
    // eslint-disable-next-line no-console
    console.log({ data });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-3">
        <Input id="name" label="Input" validation={{ required: 'Name must be filled' }} />
        <SelectInput id="gender" label="Select" placeholder="Choose gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="none">Prefer not to say</option>
        </SelectInput>
        <DatePicker
          id="date"
          label="Date"
          validation={{
            required: 'Date must be filled',
            valueAsDate: true,
          }}
          placeholder="dd/mm/yyyy"
        />
        <TextArea id="address" label="Text Area" />
        <PasswordInput id="address" label="Password" />
        <PhoneInput id="phone" label="Phone" />
        <div className="flex flex-wrap gap-4">
          <Button>Not Submit</Button>
          <Button type="submit">Submit</Button>
        </div>
        <p className="text-sm text-gray-800">Check console after submit</p>
      </form>
    </FormProvider>
  );
};
