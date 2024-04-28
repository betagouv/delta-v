import { useState } from 'react';

import { RegisterOptions, useFormContext } from 'react-hook-form';

import { InputGroup } from '../../helper/InputGroup';
import { Icon } from '@/components/atoms/Icon';
import clsxm from '@/utils/clsxm';

export type PasswordInputProps = {
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
} & React.ComponentPropsWithoutRef<'input'>;

export const PasswordInput = ({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  validation,
  ...rest
}: PasswordInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const formError = errors[id];

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <InputGroup
      id={id}
      label={label}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
      noErrorIcon
    >
      <input
        {...register(id, validation)}
        {...rest}
        type={showPassword ? 'text' : 'password'}
        name={id}
        id={id}
        readOnly={readOnly}
        className={clsxm(formError && 'error')}
        placeholder={placeholder}
        aria-describedby={id}
      />

      <button
        onClick={togglePassword}
        type="button"
        className="absolute inset-y-0 right-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none focus:ring focus:ring-primary-500"
      >
        {showPassword ? <Icon name="visibilityOff" /> : <Icon name="visibilityOn" />}
      </button>
    </InputGroup>
  );
};
