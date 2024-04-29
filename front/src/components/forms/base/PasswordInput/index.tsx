import React, { useState } from 'react';

import cs from 'classnames';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import { Icon } from '@/components/atoms/Icon';
import InputGroup from '@/components/forms/core/InputGroup';
import InputGroupHorizontal from '@/components/forms/core/InputGroupHorizontal';

export type PasswordInputProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Manual inputOptions using RHF, it is encouraged to use yup resolver instead */
  inputOptions?: RegisterOptions;
  horizontal?: boolean;
  tooltipMessage?: string;
};

export const PasswordInput = ({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  inputOptions,
  horizontal,
  tooltipMessage,
}: PasswordInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const formError = errors[id];

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const Group = horizontal ? InputGroupHorizontal : InputGroup;

  return (
    <Group
      id={id}
      label={label}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
      center
      tooltipMessage={tooltipMessage}
    >
      <input
        data-testid={`input-${id}`}
        {...register(id, inputOptions)}
        type={showPassword ? 'text' : 'password'}
        name={id}
        id={id}
        readOnly={readOnly}
        className={cs(formError && 'error')}
        placeholder={placeholder}
        aria-describedby={id}
      />

      <button
        onClick={togglePassword}
        tabIndex={-1}
        type="button"
        className="absolute inset-y-0 right-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none"
      >
        {showPassword ? <Icon name="visibilityOff" /> : <Icon name="visibilityOn" />}
      </button>
    </Group>
  );
};
