import * as React from 'react';

import { RegisterOptions, useFormContext } from 'react-hook-form';

import { InputGroup } from '../../helper/InputGroup';
import clsxm from '@/utils/clsxm';

export type InputProps = {
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
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
  clearableArea?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

export const Input = ({
  label,
  placeholder = '',
  helperText,
  id,
  type = 'text',
  readOnly = false,
  clearableArea,
  validation,
  ...rest
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const formError = errors[id];

  return (
    <InputGroup
      id={id}
      label={label}
      clearableArea={clearableArea}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
    >
      <input
        {...register(id, validation)}
        {...rest}
        type={type}
        name={id}
        id={id}
        readOnly={readOnly}
        className={clsxm(formError && 'error', 'border-4 border-gray-200/70')}
        placeholder={placeholder}
        aria-describedby={id}
      />
    </InputGroup>
  );
};
