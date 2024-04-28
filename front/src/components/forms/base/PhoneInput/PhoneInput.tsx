import React, { useState } from 'react';

import { useController, useFormContext } from 'react-hook-form';
import PhoneInputWithCountrySelect from 'react-phone-number-input';

import 'react-phone-number-input/style.css';

import { InputGroup } from '../../helper/InputGroup';

export type PhoneInputProps = {
  id: string;
  label?: string;
  placeholder?: string;
  clearableArea?: boolean;
  readOnly?: boolean;
};

export const PhoneInput = ({
  id,
  label,
  placeholder,
  readOnly,
  clearableArea,
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

  const handleClearNumber = () => {
    setPhone('');
  };

  return (
    <InputGroup
      label={label}
      id={id}
      clearableArea={clearableArea}
      onClear={handleClearNumber}
      error={formError?.message as unknown as string | undefined}
    >
      <PhoneInputWithCountrySelect
        id={id}
        international={false}
        placeholder={placeholder}
        countryCallingCodeEditable={false}
        initialValueFormat="national"
        defaultCountry="FR"
        limitMaxLength
        value={phone}
        readOnly={readOnly}
        onChange={handleOnChange}
      />
    </InputGroup>
  );
};
