import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { PasswordInput } from '@/components/input/custom/PasswordInput';

export interface FormFieldData {
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export interface ConfirmPasswordInputProps {
  password: FormFieldData;
  confirmPassword: FormFieldData;
  submitCount: number;
}

export const ConfirmPasswordInput: React.FC<ConfirmPasswordInputProps> = ({
  password,
  confirmPassword,
  submitCount,
}) => {
  return (
    <div className="flex flex-col gap-12">
      <PasswordInput
        label="Mon nouveau mot de passe"
        id="password"
        register={password.register}
        submitCount={submitCount}
        placeholder="Nouveau mot de passe"
        error={password.error}
        customErrorHelperText
      />
      <PasswordInput
        label="Confirmer le mot de passe"
        id="confirmPassword"
        register={confirmPassword.register}
        submitCount={submitCount}
        placeholder="Nouveau mot de passe"
        error={confirmPassword.error}
      />
    </div>
  );
};
