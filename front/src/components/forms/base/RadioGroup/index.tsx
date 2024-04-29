import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import InputGroup from '../../core/InputGroup';

export type RadioInputOptionType = {
  value: string;
  title: string;
  description?: string;
};

export type RadioGroupProps = {
  id: string;
  options: RadioInputOptionType[];
  label?: string;
  horizontal?: boolean;
  readOnly?: boolean;
  helperText?: string;
  tooltipMessage?: string;
};

export const RadioGroup = ({
  id,
  options,
  label,
  horizontal,
  helperText,
  readOnly,
  tooltipMessage,
}: RadioGroupProps) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const { field: radioField } = useController({
    control,
    name: id,
  });

  const formError = errors[id];

  const handleOnChange = (value: string) => {
    radioField.onChange(value);
  };

  const selection = watch(id);

  return (
    <InputGroup
      id={id}
      label={label}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
      tooltipMessage={tooltipMessage}
    >
      <div className={`flex gap-4 ${horizontal ? 'flex-row' : 'flex-col'}`}>
        {options.map((option) => {
          const generatedId = `${id}-${option.value}`;
          return (
            <div key={option.value} className="relative gap-4 flex items-center">
              <input
                id={generatedId}
                name={id}
                value={option.value}
                type="radio"
                checked={selection === option.value}
                onChange={() => handleOnChange(option.value)}
                disabled={readOnly}
                className={!readOnly ? '!cursor-pointer' : undefined}
              />
              <label className="flex flex-col cursor-pointer" htmlFor={generatedId}>
                <span>{option.title}</span>
                {option.description && <small>{option.description}</small>}
              </label>
            </div>
          );
        })}
      </div>
    </InputGroup>
  );
};
