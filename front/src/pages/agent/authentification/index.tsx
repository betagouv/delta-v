import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAskEmailValidationMutation, useLoginMutation } from '@/api/hooks/useAPIAuth';
import { ApiError } from '@/components/common/ApiError';
import { Button } from '@/components/common/Button';
import { Link } from '@/components/common/Link';
import { SvgIcon } from '@/components/common/SvgIcon';
import { TextLink } from '@/components/common/TextLink';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';
import { getErrorFields } from '@/utils/errorFields';

export interface FormLoginData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("L'email est requis"),
  password: yup.string().required('Le mot de passe est requis'),
});

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    getValues,
  } = useForm<FormLoginData>({
    defaultValues: {
      email: undefined,
      password: undefined,
    },
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const { setUserFromToken } = useStore((state) => ({
    setUserFromToken: state.setUserFromToken,
  }));

  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      setUserFromToken(data.accessToken, data.refreshToken);
      router.replace('/agent');
    },
  });

  const resendEmailMutation = useAskEmailValidationMutation({
    onSuccess: () => {
      router.push(`${RoutingAuthentication.registerSuccess}?email=${getValues('email')}`);
    },
  });

  const apiError = loginMutation.error ?? undefined;
  const isNotValidatedAccountError = apiError?.code === 'user-not-enabled-unauthorized';

  const onSubmit = async (data: FormLoginData) => {
    loginMutation.mutate(data);
  };

  const handleResend = () => {
    const email = getValues('email');
    if (email) {
      resendEmailMutation.mutate(email);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <MainAuth
      withPadding={false}
      meta={
        <Meta
          title="Déclare Douanes - Authentification agent"
          description="Page d'authentification d'un agent des douanes"
        />
      }
    >
      <section className="justify-center absolute my-auto h-3/4 flex flex-col items-center w-full px-10 ">
        <div className="mb-16 h-20">
          <SvgIcon name="logoAgent" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
          <Typography variant="h1" size="text-xl" weight="bold" textPosition="text-center">
            Se connecter
          </Typography>
          <div className="my-5">
            <InputGroup
              type="text"
              name="email"
              fullWidth={true}
              placeholder="Email"
              register={register('email')}
              error={errors?.email?.message ?? getErrorFields('email', apiError)}
              withBorder
            />
          </div>
          <div className="my-2.5">
            <InputGroup
              type={!passwordVisible ? 'password' : 'text'}
              name="password"
              fullWidth={true}
              placeholder="Mot de passe"
              register={register('password')}
              error={errors?.password?.message ?? getErrorFields('password', apiError)}
              trailingSvgIcon={!passwordVisible ? 'visibilityOff' : 'visibilityOn'}
              onTrailingSvgIconClick={() => setPasswordVisible(!passwordVisible)}
              withBorder
            />
          </div>
          <TextLink underline to={RoutingAuthentication.forgetPassword}>
            <Typography size="text-2xs">Mot de passe oublié ?</Typography>
          </TextLink>
          <div className="mt-5 flex flex-col items-center gap-2">
            {apiError?.message && (
              <>
                <div className="ml-3">
                  <ApiError apiError={apiError} />
                </div>
                {isNotValidatedAccountError && (
                  <div className="my-2">
                    <Typography textPosition="text-center" color="primary" size="text-xs" underline>
                      <span className="cursor-pointer" onClick={handleResend}>
                        Renvoyer le lien
                      </span>
                    </Typography>
                  </div>
                )}
              </>
            )}
            <div className="w-40 mb-2">
              <Button fullWidth={true} type="submit" disabled={!isDirty || !isValid} size="sm">
                Valider
              </Button>
            </div>
          </div>
        </form>
      </section>
      <section className="absolute bottom-0 flex h-1/4 w-full flex-col items-center justify-center gap-4 bg-secondary-bg">
        <Typography color="black" weight="bold" size="text-xs">
          Vous n'avez pas de compte ?
        </Typography>
        <Link to={RoutingAuthentication.register}>
          <div className="w-40">
            <Button fullWidth={true} size="sm" variant="outlinedBgWhite">
              Créer mon compte
            </Button>
          </div>
        </Link>
      </section>
    </MainAuth>
  );
};

export default LoginPage;
