import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ConfirmPassword, FormFieldData } from './ConfirmPassword';
import { Button } from '@/components/common/Button';
import { passwordRegex } from '@/utils/regex';

export default {
  title: 'Components/Autonomous/ConfirmPassword',
  component: ConfirmPassword,
} as Meta;

export interface ChangePasswordFormData {
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  password: yup
    .string()
    .matches(
      passwordRegex,
      'Le mot de passe doit contenir 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et 8 caractères minimum',
    )
    .required('Le mot de passe est requis'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Les deux mots de passe doivent être identiques')
    .required('Le mot de passe est requis'),
});

export const Base = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      password: undefined,
      confirmPassword: undefined,
    },
    resolver: yupResolver(schema),
  });

  const [submitCount, setSubmitCount] = useState<number>(0);
  const [passwordFormFieldData, setPasswordFormFieldData] = useState<FormFieldData>({
    register: register('password'),
    error: errors.password,
  });
  const [confirmPasswordFormFieldData, setConfirmPasswordFormFieldData] = useState<FormFieldData>({
    register: register('confirmPassword'),
    error: errors.confirmPassword,
  });
  const handleSubmitClick = () => {
    setSubmitCount(submitCount + 1);
  };
  useEffect(() => {
    setPasswordFormFieldData({
      register: register('password'),
      error: errors.password,
    });
  }, [errors.password]);

  useEffect(() => {
    setConfirmPasswordFormFieldData({
      register: register('confirmPassword'),
      error: errors.confirmPassword,
    });
  }, [errors.confirmPassword]);
  return (
    <form onSubmit={handleSubmit(handleSubmitClick)} className="flex flex-col w-full">
      <ConfirmPassword
        password={passwordFormFieldData}
        confirmPassword={confirmPasswordFormFieldData}
        submitCount={submitCount}
      />
      <Button fullWidth={true} type="submit" size="sm" onClick={handleSubmitClick}>
        Valider
      </Button>
    </form>
  );
};
