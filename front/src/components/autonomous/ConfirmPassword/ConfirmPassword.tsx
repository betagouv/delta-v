/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { PasswordHelperText } from '@/components/common/PasswordHelperText';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';

export interface FormFieldData {
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export interface ConfirmPasswordProps {
  password: FormFieldData;
  confirmPassword: FormFieldData;
  submitCount: number;
}

export const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({
  password,
  confirmPassword,
  submitCount,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
  const [typedPassword, setTypedPassword] = useState('');

  useEffect(() => {
    if (submitCount > 0) {
      setShowPasswordError(true);
      setShowConfirmPasswordError(true);
    }
  }, [submitCount]);

  confirmPassword.register.onChange = async () => {
    setShowConfirmPasswordError(false);
  };

  password.register.onChange = async ({ target: { value } }) => {
    setShowPasswordError(false);
    setTypedPassword(value);
  };

  const passwordError = showPasswordError && password.error ? '' : undefined;

  const confirmPasswordError = showConfirmPasswordError
    ? confirmPassword.error?.message
    : undefined;

  return (
    <>
      <div className="flex flex-col gap-1 pb-12">
        <InputGroup
          label="Mon nouveau mot de passe"
          type={passwordVisible ? 'text' : 'password'}
          name="password"
          fullWidth={true}
          placeholder="Nouveau mot de passe"
          register={password.register}
          error={passwordError}
          trailingSvgIcon={!passwordVisible ? 'visibilityOff' : 'visibilityOn'}
          onTrailingSvgIconClick={() => setPasswordVisible(!passwordVisible)}
          withBorder
          required
        />
        <div className="ml-[20px] leading-none">
          <Typography color={showPasswordError ? 'error' : 'light-gray'} size="text-3xs">
            <PasswordHelperText password={typedPassword ?? ''} />
          </Typography>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <InputGroup
          label="Confirmer le mot de passe"
          type={confirmPasswordVisible ? 'text' : 'password'}
          name="confirmPassword"
          fullWidth={true}
          placeholder="Nouveau mot de passe"
          register={confirmPassword.register}
          error={confirmPasswordError}
          trailingSvgIcon={!confirmPasswordVisible ? 'visibilityOff' : 'visibilityOn'}
          onTrailingSvgIconClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          withBorder
          required
        />
      </div>
    </>
  );
};
