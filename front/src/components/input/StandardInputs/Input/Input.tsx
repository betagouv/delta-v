import React from 'react';

import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

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
  withBorder?: boolean;
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
  withBorder = true,
  onClick = () => {},
}: IInputOptions) => {
  let parentClassName = 'relative';
  if (fullWidth) {
    parentClassName += ' w-full';
  } else {
    parentClassName += ' w-fit';
  }
  const className = twMerge(
    classNames({
      'border-0 focus:outline-none focus:ring-0 text-xs block w-full px-5 py-3 border-solid rounded-full focus:outline-none focus:ring-transparent placeholder:italic placeholder:text-secondary-400 placeholder:font-light':
        true,
      'border border-secondary-300 focus:border-secondary-300 ': withBorder,
      'text-red-900 placeholder-red-300': error,
      'border border-red-300 focus:border-red-500': withBorder && error,
      'pr-11': trailingIcon || trailingAddons || trailingSvgIcon,
      'pl-11': leadingIcon || leadingAddons,
    }),
  );

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
      {type === 'number' && (
        <input
          data-testid="input-element"
          id={id ?? name}
          name={name}
          placeholder={placeholder}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          value={value}
          className={className}
          step={0.01}
          {...register}
          autoFocus={autoFocus}
        />
      )}
      {type !== 'number' && (
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
      )}

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
