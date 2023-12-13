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

  const resetPasswordMutation = useResetPasswordMutation({
    onSuccess: () => {
      setTimeout(() => {
        router.push(RoutingAuthentication.login);
      }, 1000);
    },
  });
  const apiError = resetPasswordMutation.error ?? undefined;
  const { data: apiSuccess } = resetPasswordMutation;

  const onSubmit = async (data: FormForgetPasswordData) => {
    if (!apiError && isValid && data.password === data.confirmPassword) {
      resetPasswordMutation.mutate({
        token: token as string,
        password: data.password,
      });
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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
          <div className="flex flex-col gap-1 pb-12">
            <InputGroup
              label="Mon nouveau mot de passe"
              type={!passwordVisible ? 'password' : 'text'}
              name="password"
              fullWidth={true}
              placeholder="Nouveau mot de passe"
              register={register('password')}
              error={errors?.password?.message ?? getErrorFields('password', apiError)}
              trailingSvgIcon={!passwordVisible ? 'visibilityOff' : 'visibilityOn'}
              onTrailingSvgIconClick={() => setPasswordVisible(!passwordVisible)}
              withBorder
              required
            />
            <div className="ml-3  leading-none">
              <Typography color="light-gray" size="text-3xs">
                <PasswordHelperText password={password} />
              </Typography>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <InputGroup
              label="Confirmer le mot de passe"
              type={!confirmPasswordVisible ? 'password' : 'text'}
              name="confirmPassword"
              fullWidth={true}
              placeholder="Nouveau mot de passe"
              register={register('confirmPassword')}
              error={errors?.password?.message ?? getErrorFields('password', apiError)}
              trailingSvgIcon={!confirmPasswordVisible ? 'visibilityOff' : 'visibilityOn'}
              onTrailingSvgIconClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              withBorder
              required
            />
            {password && confirmPassword && (
              <div className="ml-3">
                <Typography
                  color={password === confirmPassword ? 'success' : 'error'}
                  size="text-3xs"
                >
                  Les deux mots de passe doivent être identiques
                </Typography>
              </div>
            )}
          </div>
          <div className="pt-10 pb-2 flex">
            {apiError && <ApiError apiError={apiError} />}
            {apiSuccess && <ApiSuccess apiSuccess={apiSuccess} />}
          </div>
          <div className="flex flex-col gap-4 w-40 self-center pb-2">
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
