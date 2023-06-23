import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useResetPasswordMutation } from '@/api/hooks/useAPIAuth';
import { ApiError } from '@/components/common/ApiError';
import { ApiSuccess } from '@/components/common/ApiSuccess';
import { Button } from '@/components/common/Button';
import { PasswordHelperText } from '@/components/common/PasswordHelperText/PasswordHelperText';
import { TitleHeaderAgent } from '@/components/common/TitleHeaderAgent';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';
import { getErrorFields } from '@/utils/errorFields';

export interface FormForgetPasswordData {
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  password: yup.string().required('Le mot de passe est requis'),
  confirmPassword: yup.string().required('Confirmez votre mot de passe'),
});

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const {
    handleSubmit,
    register,
    formState: { errors },
    formState: { isDirty, isValid },
  } = useForm<FormForgetPasswordData>({
    defaultValues: {
      password: undefined,
      confirmPassword: undefined,
    },
    resolver: yupResolver(schema),
  });

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  register('password', {
    onChange: (event: any) => {
      setPassword(event.target.value);
    },
  });

  register('confirmPassword', {
    onChange: (event: any) => {
      setConfirmPassword(event.target.value);
    },
  });

  const resetPasswordMutation = useResetPasswordMutation();
  const apiError = resetPasswordMutation.error ?? undefined;
  const { data: apiSuccess } = resetPasswordMutation;

  const onSubmit = async (data: FormForgetPasswordData) => {
    if (!apiError && isValid && data.password === data.confirmPassword) {
      resetPasswordMutation.mutate({
        token: token as string,
        password: data.password,
      });
      router.push(RoutingAuthentication.login);
    }
  };

  return (
    <MainAuth
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
      <section className="mt-12 flex flex-col items-center self-center">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-6 w-80">
          <div className="flex flex-col gap-1">
            <InputGroup
              label="Mon nouveau mot de passe *"
              type="password"
              name="password"
              fullWidth={true}
              placeholder="Nouveau mot de passe"
              register={register('password')}
              error={errors?.password?.message ?? getErrorFields('password', apiError)}
            />
            <div className="ml-3">
              <Typography color="light-gray" size="text-2xs">
                <PasswordHelperText password={password} />
              </Typography>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <InputGroup
              label="Confirmer le mot de passe *"
              type="password"
              name="confirmPassword"
              fullWidth={true}
              placeholder="Nouveau mot de passe"
              register={register('confirmPassword')}
              error={errors?.password?.message ?? getErrorFields('password', apiError)}
            />
            {password && confirmPassword && (
              <div className="ml-3">
                <Typography
                  color={password === confirmPassword ? 'success' : 'error'}
                  size="text-2xs"
                >
                  Les deux mots de passe doivent être identiques
                </Typography>
              </div>
            )}
          </div>

          {apiError && (
            <div className="ml-3">
              <ApiError apiError={apiError} />
            </div>
          )}
          {apiSuccess && (
            <div className="ml-3">
              <ApiSuccess apiSuccess={apiSuccess} />
            </div>
          )}
          <div className="flex flex-col gap-2 px-20 pt-8 pb-9">
            <Button fullWidth={true} type="submit" disabled={!isDirty || !isValid} size="sm">
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
