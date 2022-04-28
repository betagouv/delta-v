import React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import { Icon } from '@/components/common/Icon';

export interface IInputOptions {
  placeholder?: string;
  id?: string;
  name: string;
  type:
    | 'text'
    | 'password'
    | 'number'
    | 'date'
    | 'datetime'
    | 'email'
    | 'tel'
    | 'file'
    | 'checkbox'
    | 'radio';
  disabled?: boolean;
  value?: string;
  error?: string;
  fullWidth?: boolean;
  trailingIcon?: string;
  leadingIcon?: string;
  trailingAddons?: string;
  leadingAddons?: string;
  register?: UseFormRegisterReturn;
}

export const Input: React.FC<IInputOptions> = ({
  placeholder,
  id,
  name,
  type,
  disabled,
  value,
  fullWidth,
  error,
  trailingIcon,
  leadingIcon,
  trailingAddons,
  leadingAddons,
  register,
}: IInputOptions) => {
  let parentClassName = 'w-full mt-1 relative';
  if (fullWidth) {
    parentClassName += ' max-w-full';
  } else {
    parentClassName += ' max-w-xs';
  }
  let className =
    'block w-full border-secondary-300 px-4 border border-solid sm:text-sm rounded-full focus:outline-none focus:ring-1 placeholder:italic placeholder:text-secondary-400 placeholder:font-light';
  if (error) {
    className +=
      ' border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500';
  } else {
    className += ' focus:ring-primary-600 focus:border-primary-600';
  }

  if (trailingIcon || trailingAddons) {
    className += ' pr-10';
  }
  if (leadingIcon || leadingAddons) {
    className += ' pl-10';
  }
  return (
    <div className={parentClassName}>
      {leadingIcon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex h-full w-9 items-center pl-3">
          <Icon name={leadingIcon} />
        </div>
      )}
      {leadingAddons && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex h-full w-9 items-center pl-3">
          {leadingAddons}
        </div>
      )}
      <input
        data-testid="input-element"
        id={id ?? name}
        name={name}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        value={value}
        className={className}
        {...register}
      />
      {trailingIcon && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center pr-3">
          <Icon name={trailingIcon} />
        </div>
      )}
      {trailingAddons && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center pr-3">
          {trailingAddons}
        </div>
      )}
    </div>
  );
};

export default Input;
