import * as React from 'react';

import cs from 'classnames';
import { RegisterOptions } from 'react-hook-form';

import { useFormContextOrFallBack } from '../../core/Form/useFormContextOrFallBack';
import InputGroup from '@/components/forms/core/InputGroup';
import InputGroupHorizontal from '@/components/forms/core/InputGroupHorizontal';

export type TextInputProps = {
  horizontal?: boolean;
  /** Input label */
  label?: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;

  required?: boolean;
  /**
   * Input type
   * @example text, email, password
   */
  type?: 'text' | 'number' | 'email';
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Default inputOptions like onChange, value, onBlur... : NOT needed if in RHF */
  inputOptions?: RegisterOptions;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  defaultValue?: string;
  tooltipMessage?: string;
};

export const TextInput = ({
  horizontal,
  label,
  placeholder = '',
  helperText,
  defaultValue,
  id,
  type = 'text',
  readOnly = false,
  inputOptions,
  leftIcon,
  required = false,
  rightIcon,
  tooltipMessage,
}: TextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContextOrFallBack();

  const formError = errors[id];

  const Group = horizontal ? InputGroupHorizontal : InputGroup;

  return (
    <Group
      id={id}
      required={required}
      label={label}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
      center
      tooltipMessage={tooltipMessage}
    >
      <input
        data-testid={`input-${id}`}
        {...register(id, inputOptions)}
        type={type}
        name={id}
        id={id}
        readOnly={readOnly}
        className={cs('error', [leftIcon && 'pl-10', rightIcon && 'pr-10'])}
        placeholder={placeholder}
        aria-describedby={id}
        defaultValue={defaultValue}
      />
      {leftIcon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {leftIcon}
        </div>
      )}
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {rightIcon}
        </div>
      )}
    </Group>
  );
};
