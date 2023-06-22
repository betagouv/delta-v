import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useLoginMutation } from '@/api/hooks/useAPIAuth';
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
import { getErrorFields, getErrorFields } from '@/utils/errorFields';

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
    formState: { errors },
    formState: { isDirty, isValid },
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

  const apiError = loginMutation.error ?? undefined;

  const onSubmit = async (data: FormLoginData) => {
    loginMutation.mutate(data);
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
      <section className="my-auto flex flex-col items-center self-center ">
        <div className="mb-14 h-14">
          <SvgIcon name="logoAgent" />
        </div>
        <Typography variant="h1" size="text-xl" weight="bold">
          Se connecter
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="w-60">
          <div className="flex flex-col gap-3">
            <InputGroup
              type="text"
              name="adult"
              fullWidth={true}
              placeholder="Email"
              register={register('email')}
              error={errors?.email?.message ?? getErrorFields('email', apiError)}
              error={errors?.email?.message ?? getErrorFields('email', apiError)}
            />
            <InputGroup
              type="password"
              name="adult"
              fullWidth={true}
              placeholder="Mot de passe"
              register={register('password')}
              error={errors?.password?.message ?? getErrorFields('password', apiError)}
            />
          </div>
          {apiError?.message && (
            <div className="ml-3">
              <ApiError apiError={apiError} />
            </div>
          )}
          <TextLink underline to={RoutingAuthentication.forgetPassword}>
            <Typography size="text-2xs">Mot de passe oublié ?</Typography>
          </TextLink>

          <div className="px-12 pt-4 pb-9">
            <Button fullWidth={true} type="submit" disabled={!isDirty || !isValid} size="sm">
              Valider
            </Button>
          </div>
        </form>
      </section>
      <section className="absolute bottom-0 flex h-1/4 w-full flex-col items-center justify-center gap-4 bg-secondary-100">
        <Typography color="black" weight="bold" size="text-xs">
          Vous n'avez pas de compte ?
        </Typography>
        <Link to={RoutingAuthentication.register}>
          <Button fullWidth={false} size="sm" variant="outlined">
            <Typography weight="bold" size="text-xs">
              Créer mon compte
            </Typography>
          </Button>
        </Link>
      </section>
    </MainAuth>
  );
};

export default LoginPage;
