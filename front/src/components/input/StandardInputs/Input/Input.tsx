import React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import { Icon } from '@/components/common/Icon';
import { SvgIcon, SvgNames } from '@/components/common/SvgIcon';

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
  trailingSvgIcon?: SvgNames;
  leadingIcon?: string;
  trailingAddons?: string;
  leadingAddons?: string;
  register?: UseFormRegisterReturn;
  autoFocus?: boolean;
  onClick?: () => void;
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
  trailingSvgIcon,
  leadingIcon,
  trailingAddons,
  leadingAddons,
  register,
  autoFocus = false,
  onClick = () => {},
}: IInputOptions) => {
  let parentClassName = 'mt-1 relative';
  if (fullWidth) {
    parentClassName += ' w-full';
  } else {
    parentClassName += ' w-fit';
  }
  let className =
    'block w-full border-secondary-300 px-4 py-2 border border-solid text-base rounded-full focus:outline-none focus:ring-transparent focus:border-secondary-300 placeholder:italic placeholder:text-secondary-400 placeholder:font-light';
  if (error) {
    className += ' border-red-300 text-red-900 placeholder-red-300 focus:border-red-500';
  }

  if (trailingIcon || trailingAddons || trailingSvgIcon) {
    className += ' pr-11';
  }
  if (leadingIcon || leadingAddons) {
    className += ' pl-11';
  }
  return (
    <div className={parentClassName} onClick={onClick}>
      {leadingIcon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex h-full w-9 items-center pl-4">
          <Icon name={leadingIcon} />
        </div>
      )}
      {leadingAddons && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex h-full w-9 items-center pl-4">
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
        step={0.01}
        {...register}
        autoFocus={autoFocus}
      />
      {trailingIcon && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center pr-4">
          <Icon name={trailingIcon} />
        </div>
      )}
      {trailingSvgIcon && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center pr-4">
          <SvgIcon name={trailingSvgIcon} />
        </div>
      )}
      {trailingAddons && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex h-full items-center pr-4">
          {trailingAddons}
        </div>
      )}
    </div>
  );
};

export default Input;
