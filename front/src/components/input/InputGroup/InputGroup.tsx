import React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '../StandardInputs/Input';
import { IRadioType, Radio } from '../StandardInputs/Radio';
import { IRadioCardType, RadioCard } from '../StandardInputs/RadioCard';
import { IOptions, Select } from '../StandardInputs/Select';
import { TextArea } from '../StandardInputs/TextArea';
import { Toggle } from '../StandardInputs/Toggle';
import { Icon } from '@/components/common/Icon';

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
    | 'radio'
    | 'radioCard'
    | 'checkbox'
    | 'textarea'
    | 'file';
  withSeparator?: boolean;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  radioValues?: IRadioType[];
  radioCardValues?: IRadioCardType[];
  variant?: 'default' | 'rounded';
  error?: string;
  elementRef?: object;
  mobileColumn?: boolean;
  register?: UseFormRegisterReturn;
  rows?: number;
  specificClassName?: string;
  fullWidth?: boolean;
  control?: any;
  rules?: any;
}

export const InputGroup: React.FC<IInputGroupProps> = ({
  label,
  placeholder,
  name,
  type,
  options,
  radioValues,
  radioCardValues,
  disabled,
  loading,
  error,
  rows,
  specificClassName,
  fullWidth,
  register,
  control,
  rules,
}: IInputGroupProps) => {
  const inputDisabled = disabled || loading;
  return (
    <div>
      <div>
        <div>
          <label htmlFor={name} className={`block text-sm font-bold`} data-testid="label-element">
            {label}
          </label>
          {type === 'select' && (
            <Select
              name={name}
              disabled={inputDisabled}
              options={options ?? []}
              error={error}
              control={control}
              rules={rules}
              fullWidth={fullWidth}
            />
          )}
          {type === 'toggle' && (
            <Toggle
              name={name}
              disabled={inputDisabled}
              error={error}
              control={control}
              rules={rules}
            />
          )}
          {type === 'textarea' && (
            <TextArea
              id={name}
              name={name}
              placeholder={placeholder}
              disabled={inputDisabled}
              error={error}
              rows={rows}
              specificClassName={specificClassName}
              register={register}
            />
          )}
          {type === 'radio' && (
            <Radio
              id={name}
              name={name}
              disabled={inputDisabled}
              error={error}
              radioValues={radioValues ?? []}
              register={register}
            />
          )}
          {type === 'radioCard' && (
            <RadioCard
              id={name}
              name={name}
              disabled={inputDisabled}
              error={error}
              radioCardValues={radioCardValues ?? []}
              register={register}
              control={control}
            />
          )}
          {type !== 'select' &&
            type !== 'textarea' &&
            type !== 'toggle' &&
            type !== 'radio' &&
            type !== 'radioCard' && (
              <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={inputDisabled}
                error={error}
                register={register}
                fullWidth={fullWidth}
              />
            )}
        </div>
        {loading && 'Loading'}
      </div>
      {error && (
        <div data-testid="error-element" className="flex pl-2 text-sm text-red-600">
          <div className="flex h-3 w-3 self-center">
            <Icon name="cancel-circle" />
          </div>
          <p className="pl-1" id="email-error">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default InputGroup;
