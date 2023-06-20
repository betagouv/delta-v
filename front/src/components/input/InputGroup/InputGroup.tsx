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
import { Typography } from '@/components/common/Typography';

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
  value?: string;
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
  helperText?: string;
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
  littleCard?: boolean;
  withBorder?: boolean;
  defaultValue?: string | number;
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
  helperText,
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
  littleCard = false,
  withBorder,
  defaultValue,
}: IInputGroupProps) => {
  const inputDisabled = disabled || loading;
  return (
    <div>
      <>
        <>
          {label && (
            <label
              htmlFor={name}
              className={`mb-4 block text-base font-bold`}
              data-testid="label-element"
            >
              {label}
            </label>
          )}
          {type === 'select' && (
            <Select
              name={name}
              disabled={inputDisabled}
              options={options ?? []}
              error={error}
              control={control}
              rules={rules}
              fullWidth={fullWidth}
              defaultValue={defaultValue}
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
              defaultValue={defaultValue}
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
              defaultValue={defaultValue}
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
              littleCard={littleCard}
              defaultValue={defaultValue}
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
                withBorder={withBorder}
              />
            )}
        </>
        {loading && 'Loading'}
      </>
      {helperText && (
        <div data-testid="helper-element" className="flex pl-2 pt-1">
          <span className="pl-1" id="input-error">
            <Typography size="text-2xs" color="light-gray">
              {helperText}
            </Typography>
          </span>
        </div>
      )}
      {error && (
        <div data-testid="error-element" className="flex pl-2 pt-1">
          <span className="pl-1" id="input-error">
            <Typography size="text-2xs" color="error">
              {error}
            </Typography>
          </span>
        </div>
      )}
    </div>
  );
};

export default InputGroup;
