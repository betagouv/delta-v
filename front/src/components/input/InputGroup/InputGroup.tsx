import React from 'react';

import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Comboboxes } from '../StandardInputs/Comboboxes';
import { Input } from '../StandardInputs/Input';
import { IRadioType, Radio } from '../StandardInputs/Radio';
import { IRadioCardType, RadioCard } from '../StandardInputs/RadioCard';
import { IOptions, Select } from '../StandardInputs/Select';
import { SimpleSelect } from '../StandardInputs/SimpleSelect';
import { TextArea } from '../StandardInputs/TextArea';
import { Toggle } from '../StandardInputs/Toggle';
import { SvgNames } from '@/components/common/SvgIcon';
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
  bigSize?: boolean;
  trailingIcon?: string;
  trailingSvgIcon?: SvgNames;
  leadingIcon?: string;
  trailingAddons?: string;
  leadingAddons?: string;
  control?: any;
  rules?: any;
  barGroupedRadio?: boolean;
  littleCard?: boolean;
  withBorder?: boolean;
  newLabel?: boolean;
  onTrailingIconClick?: () => void;
  onTrailingSvgIconClick?: () => void;
  onChange?: () => void;
  withListBoxEffect?: boolean;
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
  bigSize,
  trailingIcon,
  trailingSvgIcon,
  leadingIcon,
  trailingAddons,
  leadingAddons,
  register,
  control,
  rules,
  barGroupedRadio = false,
  littleCard = false,
  withBorder = false,
  newLabel = false,
  onTrailingIconClick,
  onTrailingSvgIconClick,
  withListBoxEffect = false,
  required,
}: IInputGroupProps) => {
  const inputDisabled = disabled || loading;

  return (
    <div>
      <>
        <>
          {label && (
            <label
              htmlFor={name}
              className={classNames({
                'mb-2 block text-sm font-bold': !newLabel,
                'mb-5 block text-sm font-normal': newLabel,
              })}
              data-testid="label-element"
            >
              {label}
              {required && <span className="text-primary-600">&nbsp;*</span>}
            </label>
          )}
          {type === 'select' && (
            <Select
              placeholder={placeholder}
              name={name}
              disabled={inputDisabled}
              options={options ?? []}
              error={error}
              control={control}
              rules={rules}
              fullWidth={fullWidth}
              withBorder={withBorder}
              withListBoxEffect={withListBoxEffect}
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
          {type === 'radio' && !barGroupedRadio && (
            <Radio
              id={name}
              name={name}
              disabled={inputDisabled}
              error={error}
              radioValues={radioValues ?? []}
              register={register}
            />
          )}
          {type === 'radio' && barGroupedRadio && (
            <div
              className={classNames({
                'bg-white rounded-full mt-2 flex h-10 gap-5 px-5 w-fit': true,
                'border border-error': error,
              })}
            >
              <Radio
                id={name}
                name={name}
                disabled={inputDisabled}
                error={error}
                radioValues={radioValues ?? []}
                register={register}
                newRadio
              />
            </div>
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
              bigSize={bigSize}
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
                trailingSvgIcon={trailingSvgIcon}
                withBorder={withBorder}
                onTrailingIconClick={onTrailingIconClick}
                onTrailingSvgIconClick={onTrailingSvgIconClick}
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
          <span className="px-3 flex mb-1.5" id="input-error">
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
