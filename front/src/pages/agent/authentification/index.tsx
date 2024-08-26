import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAskEmailValidationMutation, useLoginMutation } from '@/api/hooks/useAPIAuth';
import { initiateAgentConnectRequest } from '@/api/lib/auth';
import { AgentConnectButton } from '@/components/atoms/AgentConnectButton';
import { ApiError } from '@/components/atoms/ApiError';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { TextLink } from '@/components/atoms/TextLink';
import { Typography } from '@/components/atoms/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { SvgIcon } from '@/components/molecules/SvgIcon';
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

  const [isBadCredentialError, setIsBadCredentialError] = useState(false);
  const [showFormError, setShowFormError] = useState(false);

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

  useEffect(() => {
    if (apiError?.statusCode === 401) {
      setIsBadCredentialError(true);
    }
  }, [apiError]);

  const onFormChange = () => {
    if (showFormError) {
      setShowFormError(false);
    }
  };

  const handleAgentConnectClick = () => {
    initiateAgentConnectRequest();
  };

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
      <section className="justify-center absolute my-auto h-3/4 flex flex-col items-center w-full px-10">
        <div className="mb-16 h-20">
          <SvgIcon name="logoAgent" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
          onChange={onFormChange}
        >
          <Typography variant="h1" size="text-xl" weight="bold" textPosition="text-center">
            Se connecter
          </Typography>
          <div className="flex flex-col gap-2 mt-5">
            <InputGroup
              type="text"
              name="email"
              fullWidth={true}
              placeholder="Email"
              register={register('email')}
              error={
                showFormError
                  ? errors?.email?.message ?? getErrorFields('email', apiError, true)
                  : undefined
              }
              withBorder
              preventErrorShift
            />
            <InputGroup
              type={!passwordVisible ? 'password' : 'text'}
              name="password"
              fullWidth={true}
              placeholder="Mot de passe"
              register={register('password')}
              error={
                showFormError
                  ? errors?.password?.message ?? getErrorFields('password', apiError, true)
                  : undefined
              }
              trailingSvgIcon={!passwordVisible ? 'visibilityOff' : 'visibilityOn'}
              onTrailingSvgIconClick={() => setPasswordVisible(!passwordVisible)}
              withBorder
              preventErrorShift
            />
          </div>
          <TextLink underline to={RoutingAuthentication.forgetPassword}>
            <Typography size="text-2xs">Mot de passe oublié ?</Typography>
          </TextLink>
          <AgentConnectButton onClick={handleAgentConnectClick} />
          <div className="mt-5 flex flex-col items-center gap-2">
            {!isBadCredentialError && apiError?.message && (
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
              <Button
                fullWidth={true}
                type="submit"
                disabled={!isDirty || !isValid}
                size="sm"
                onClick={() => setShowFormError(true)}
              >
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
