import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useResetPasswordMutation } from '@/api/hooks/useAPIAuth';
import { ApiError } from '@/components/atoms/ApiError';
import { Button } from '@/components/atoms/Button';
import { TitleHeaderAgent } from '@/components/atoms/TitleHeaderAgent';
import { Typography } from '@/components/atoms/Typography';
import {
  ConfirmPasswordInput,
  FormFieldData,
} from '@/components/input/custom/ConfirmPasswordInput';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';
import { passwordRegex } from '@/utils/regex';

export interface FormForgetPasswordData {
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

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const {
    handleSubmit,
    register,
    formState: { errors },
    formState: { isValid },
  } = useForm<FormForgetPasswordData>({
    defaultValues: {
      password: undefined,
      confirmPassword: undefined,
    },
    resolver: yupResolver(schema),
  });

  const [submitClickCount, setSubmitClickCount] = useState(0);

  const resetPasswordMutation = useResetPasswordMutation({
    onSuccess: () => {
      router.push(RoutingAuthentication.resetPasswordSuccess);
    },
  });
  const apiError = resetPasswordMutation.error ?? undefined;

  const onSubmit = async (data: FormForgetPasswordData) => {
    if (!apiError && isValid && data.password === data.confirmPassword) {
      resetPasswordMutation.mutate({
        token: token as string,
        password: data.password,
      });
    }
  };

  const handleSubmitClick = () => {
    setSubmitClickCount(submitClickCount + 1);
  };

  const [passwordFormFieldData, setPasswordFormFieldData] = useState<FormFieldData>({
    register: register('password'),
    error: errors.password,
  });
  const [confirmPasswordFormFieldData, setConfirmPasswordFormFieldData] = useState<FormFieldData>({
    register: register('confirmPassword'),
    error: errors.confirmPassword,
  });
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
    <MainAuth
      withPadding={false}
      meta={
        <Meta
          title="Déclare Douanes - Modification du mot de passe"
          description="Page de modification du mot de passe"
        />
      }
    >
      <TitleHeaderAgent
        colorClassnameOne="text-black"
        colorClassnameTwo="text-primary-600"
        title="Créer un nouveau mot de passe"
        bgColorClass="bg-white"
      ></TitleHeaderAgent>
      <section className="self-center w-full flex flex-col items-center px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col w-full">
          <div className="pb-10">
            <ConfirmPasswordInput
              password={passwordFormFieldData}
              confirmPassword={confirmPasswordFormFieldData}
              submitCount={submitClickCount}
            />
          </div>
          {apiError && <ApiError apiError={apiError} />}
          <div className="flex flex-col gap-4 w-40 self-center py-2">
            <Button fullWidth={true} type="submit" size="sm" onClick={handleSubmitClick}>
              Valider
            </Button>
          </div>
          <Typography color="black" size="text-2xs" textPosition="text-center">
            Champs obligatoires *
          </Typography>
        </form>
      </section>
    </MainAuth>
  );
};

export default ResetPasswordPage;
