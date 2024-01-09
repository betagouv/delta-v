/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { PasswordHelperText } from '@/components/common/PasswordHelperText';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';

export interface PasswordInputProps {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  submitCount: number;
  fullWidth?: boolean;
  placeholder?: string;
  error?: FieldError;
  withBorder?: boolean;
  required?: boolean;
  customErrorHelperText?: boolean;
}

const getStringError = (customError?: boolean, fieldError?: FieldError) => {
  if (customError) {
    return fieldError ? '' : undefined;
  }
  return fieldError?.message ?? undefined;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  id,
  register,
  submitCount,
  fullWidth = true,
  placeholder,
  error,
  withBorder = true,
  required = true,
  customErrorHelperText = false,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [typedPassword, setTypedPassword] = useState('');

  useEffect(() => {
    if (submitCount > 0) {
      setShowPasswordError(true);
    }
  }, [submitCount]);

  register.onChange = async ({ target: { value } }) => {
    setShowPasswordError(false);
    setTypedPassword(value);
  };

  const passwordError = showPasswordError
    ? getStringError(!!customErrorHelperText, error)
    : undefined;

  return (
    <div className="flex flex-col gap-1">
      <InputGroup
        label={label}
        type={passwordVisible ? 'text' : 'password'}
        name={id}
        fullWidth={fullWidth}
        placeholder={placeholder}
        register={register}
        error={passwordError}
        trailingSvgIcon={!passwordVisible ? 'visibilityOff' : 'visibilityOn'}
        onTrailingSvgIconClick={() => setPasswordVisible(!passwordVisible)}
        withBorder={withBorder}
        required={required}
      />
      {customErrorHelperText && (
        <div className="ml-[20px] leading-none">
          <Typography color={showPasswordError ? 'error' : 'light-gray'} size="text-3xs">
            <PasswordHelperText password={typedPassword ?? ''} />
          </Typography>
        </div>
      )}
    </div>
  );
};
