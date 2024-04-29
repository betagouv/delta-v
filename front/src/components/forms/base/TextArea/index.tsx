import React from 'react';

import cs from 'classnames';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import InputGroup from '@/components/forms/core/InputGroup';
import InputGroupHorizontal from '@/components/forms/core/InputGroupHorizontal';

export type TextAreaProps = {
  horizontal?: boolean;
  label?: string;
  value?: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  readOnly?: boolean;
  required?: boolean;
  inputOptions?: RegisterOptions;
  defaultValue?: string;
  rows?: number;
  tooltipMessage?: string;
};

export const TextArea = ({
  horizontal,
  defaultValue,
  label,
  value,
  required = false,
  placeholder = '',
  helperText,
  rows = 3,
  id,
  readOnly = false,
  inputOptions,
  tooltipMessage,
}: TextAreaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const formError = errors[id];

  const Group = horizontal ? InputGroupHorizontal : InputGroup;

  return (
    <Group
      id={id}
      label={label}
      required={required}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
      tooltipMessage={tooltipMessage}
    >
      <textarea
        {...register(id, inputOptions)}
        data-testid={`input-${id}`}
        rows={rows}
        value={value}
        name={id}
        id={id}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className={cs(formError && ['error'], 'text-color-slate-300')}
        placeholder={placeholder}
        aria-describedby={id}
      />
    </Group>
  );
};
