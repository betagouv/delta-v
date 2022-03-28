import React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '../StandardInputs/Input';
import { IOptions, Select } from '../StandardInputs/Select';
import { TextArea } from '../StandardInputs/TextArea';
import { Toggle } from '../StandardInputs/Toggle';

interface IRadioType {
  id: string;
  name: string;
  value: string;
}

export interface IErrorType {
  message: string;
  type?: string;
}

export interface IInputGroupProps {
  icon?: string;
  label?: string;
  placeholder?: string;
  name: string;
  options?: IOptions[];
  type:
    | 'text'
    | 'password'
    | 'number'
    | 'date'
    | 'datetime'
    | 'email'
    | 'tel'
    | 'select'
    | 'toggle'
    | 'checkbox'
    | 'textarea'
    | 'file';
  withSeparator?: boolean;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  radioValues?: IRadioType[];
  variant?: 'default' | 'rounded';
  error?: string;
  elementRef?: object;
  mobileColumn?: boolean;
  register?: UseFormRegisterReturn;
  rows?: number;
  specificClassName?: string;
  control?: any;
  rules?: any;
}

export const InputGroup: React.FC<IInputGroupProps> = ({
  label,
  placeholder,
  name,
  type,
  options,
  disabled,
  loading,
  error,
  rows,
  specificClassName,
  register,
  control,
  rules,
}: IInputGroupProps) => {
  return (
    <div>
      <div>
        <div>
          <label htmlFor={name} className={`block text-sm font-medium text-secondary-700`}>
            {label}
          </label>
          {type === 'select' && (
            <Select
              name={name}
              disabled={disabled}
              options={options ?? []}
              error={error}
              control={control}
              rules={rules}
            />
          )}
          {type === 'toggle' && (
            <Toggle name={name} disabled={disabled} error={error} control={control} rules={rules} />
          )}
          {type === 'textarea' && (
            <TextArea
              id={name}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              error={error}
              rows={rows}
              specificClassName={specificClassName}
              register={register}
            />
          )}
          {type !== 'select' && type !== 'textarea' && type !== 'toggle' && (
            <Input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              error={error}
              register={register}
            />
          )}
        </div>
        {loading && 'Loading'}
      </div>
      {error && (
        <p className="flex-row px-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputGroup;
