import Cleave from 'cleave.js/react';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import InputGroup from '@/components/forms/core/InputGroup';
import InputGroupHorizontal from '@/components/forms/core/InputGroupHorizontal';

type TimeInputProps = {
  horizontal?: boolean;
  id: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  tooltipMessage?: string;
};

export const TimeInput = ({ horizontal, id, label, disabled, placeholder, defaultValue, onChange, tooltipMessage, ...rest }: TimeInputProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const formError = errors[id];

  const { field } = useController({
    control,
    name: id
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    field.onChange(value);
    if (onChange) {
      onChange(value);
    }
  };

  const Group = horizontal ? InputGroupHorizontal : InputGroup;

  return (
    <Group id={id} label={label} error={formError?.message as unknown as string | undefined} tooltipMessage={tooltipMessage}>
      <Cleave
        className="block w-full px-3 py-2 placeholder-slate-400 border border-slate-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-slate-200 focus:ring-2 focus:border-slate-300 sm:text-sm disabled:bg-slate-100 disabled:text-slate-400"
        id={id}
        name={id}
        value={defaultValue}
        options={{ time: true, timePattern: ['h', 'm', 's'] }}
        data-testid={`input-${id}`}
        disabled={disabled}
        {...rest}
        type="text"
        placeholder={placeholder || 'HH:MM:SS'}
        onChange={handleChange}
      />
    </Group>
  );
};
