import * as React from 'react';

import { DatePicker } from './base/DatePicker';
import { PasswordInput } from './base/PasswordInput';
import { PhoneInput } from './base/PhoneInput';
import { RadioGroup } from './base/RadioGroup';
import { SelectInput } from './base/SelectInput';
import { TextArea } from './base/TextArea';
import { TextInput } from './base/TextInput';
import { Form } from './core/Form';

const meta = {
  title: 'forms/FormExample',
};

export default meta;

type SandboxForm = {
  name: string;
  gender: 'male' | 'female' | 'none';
  gender2: 'male' | 'female' | 'none';
  date: Date;
  address: string;
  element: 'ice' | 'fire' | 'electricity';
};

export const FormInputs = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (_data: SandboxForm) => {
    return null;
  };

  return (
    <Form
      onSubmit={onSubmit}
      mode="onTouched"
      className="max-w-sm space-y-3"
      defaultValues={{
        name: 'John Doe',
      }}
    >
      <TextInput id="name" label="Input" />
      <SelectInput
        id="gender"
        label="Select"
        placeholder="Choose gender"
        options={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ]}
      />
      <DatePicker id="date" label="Date" placeholder="dd/mm/yyyy" />
      <TextArea id="address" label="Text Area" />
      <PasswordInput id="password" label="Password" />
      <PhoneInput id="phone" label="Phone" />
      <RadioGroup
        id="element"
        label="Prefered element"
        options={[
          { value: 'ice', title: 'Ice' },
          { value: 'fire', title: 'Fire' },
          { value: 'electricity', title: 'Electricity' },
        ]}
      />
      <div className="flex flex-wrap gap-4">
        <button type="button">No submit</button>
        <button type="submit">Submit</button>
      </div>
      <p className="text-sm text-slate-800">Check console after submit</p>
    </Form>
  );
};
