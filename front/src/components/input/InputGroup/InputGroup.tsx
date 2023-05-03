import React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import { Comboboxes } from '../StandardInputs/Comboboxes';
import { Input } from '../StandardInputs/Input';
import { IRadioType, Radio } from '../StandardInputs/Radio';
import { IRadioCardType, RadioCard } from '../StandardInputs/RadioCard';
import { IOptions, Select } from '../StandardInputs/Select';
import { SimpleSelect } from '../StandardInputs/SimpleSelect';
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
    | 'simple-select'
    | 'select'
    | 'toggle'
    | 'radio'
    | 'radioCard'
    | 'checkbox'
    | 'textarea'
    | 'comboboxes'
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
  trailingIcon?: string;
  leadingIcon?: string;
  trailingAddons?: string;
  leadingAddons?: string;
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
  trailingIcon,
  leadingIcon,
  trailingAddons,
  leadingAddons,
  register,
  control,
  rules,
}: IInputGroupProps) => {
  console.log('🚀 ~ file: InputGroup.tsx:87 ~ error:', error);
  const inputDisabled = disabled || loading;
  return (
    <div>
      <>
        <>
          <label
            htmlFor={name}
            className={`mb-4 block text-base font-bold`}
            data-testid="label-element"
          >
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
          {type === 'comboboxes' && (
            <Comboboxes
              name={name}
              disabled={inputDisabled}
              options={options ?? []}
              error={error}
              control={control}
              rules={rules}
              fullWidth={fullWidth}
              placeholder={placeholder}
              trailingIcon={trailingIcon}
            />
          )}
          {type === 'simple-select' && (
            <SimpleSelect
              name={name}
              disabled={inputDisabled}
              options={options ?? []}
              error={error}
              control={control}
              register={register}
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
            type !== 'simple-select' &&
            type !== 'comboboxes' &&
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
                leadingAddons={leadingAddons}
                trailingAddons={trailingAddons}
                leadingIcon={leadingIcon}
                trailingIcon={trailingIcon}
              />
            )}
        </>
        {loading && 'Loading'}
      </>
      {error && (
        <div data-testid="error-element" className="flex pl-2 text-sm text-red-600">
          <div className="flex h-3 w-3 self-center">
            <Icon name="error" />
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
