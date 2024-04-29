import React, { useState } from 'react';

import { useController, useFormContext } from 'react-hook-form';
import PhoneInputNative from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import InputGroup from '@/components/forms/core/InputGroup';
import InputGroupHorizontal from '@/components/forms/core/InputGroupHorizontal';

export type PhoneInputProps = {
  id: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  horizontal?: boolean;
  country?: string;
  tooltipMessage?: string;
};

export const PhoneInput = ({
  id,
  label,
  placeholder,
  readOnly,
  horizontal,
  country = 'us',
  tooltipMessage,
}: PhoneInputProps) => {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { field: phoneField } = useController({
    control,
    name: id,
  });

  const formError = errors[id];
  const [phone, setPhone] = useState(getValues(id) ?? '');

  const handleOnChange = (newPhone: string) => {
    setPhone(newPhone);
    phoneField.onChange(newPhone);
  };

  const Group = horizontal ? InputGroupHorizontal : InputGroup;

  return (
    <Group
      label={label}
      id={id}
      error={formError?.message as unknown as string | undefined}
      center
      tooltipMessage={tooltipMessage}
    >
      <PhoneInputNative
        country={country}
        data-testid={`input-${id}`}
        placeholder={placeholder}
        value={phone}
        inputProps={{
          readOnly,
        }}
        containerClass="w-full"
        inputClass="!w-full"
        buttonClass="px-3 py-2 !border-slate-300 !rounded-l-md !bg-slate-100"
        onChange={handleOnChange}
      />
    </Group>
  );
};
