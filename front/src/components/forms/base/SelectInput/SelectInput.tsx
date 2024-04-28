import * as React from 'react';

import { RegisterOptions, useFormContext } from 'react-hook-form';

import { InputGroup } from '../../helper/InputGroup';
import clsxm from '@/utils/clsxm';

export type SelectInputProps = {
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  readOnly?: boolean;
  validation?: RegisterOptions;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'select'>;

export const SelectInput = ({
  label,
  helperText,
  id,
  placeholder,
  readOnly = false,
  children,
  validation,
  ...rest
}: SelectInputProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(id);
  const formError = errors[id];

  // Add disabled and selected attribute to option, will be used if readonly
  const readOnlyChildren = React.Children.map<React.ReactNode, React.ReactNode>(
    children,
    // eslint-disable-next-line consistent-return
    (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<SelectInputProps>, {
          disabled: child.props.value !== rest?.defaultValue,
        });
      }
    },
  );

  return (
    <InputGroup
      id={id}
      label={label}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
    >
      <select
        {...register(id, validation)}
        // defaultValue to value blank, will get overriden by ...rest if needed
        defaultValue=""
        {...rest}
        name={id}
        id={id}
        className={clsxm([
          formError && 'error',
          { 'text-gray-500': value === '' },
          'cursor-pointer',
        ])}
        aria-describedby={id}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {readOnly ? readOnlyChildren : children}
      </select>
    </InputGroup>
  );
};
