import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useRegisterMutation } from '@/api/hooks/useAPIAuth';
import { ApiError } from '@/components/atoms/ApiError';
import { ApiSuccess } from '@/components/atoms/ApiSuccess';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { TitleHeaderAgent } from '@/components/atoms/TitleHeaderAgent';
import { Typography } from '@/components/atoms/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { PasswordHelperText } from '@/components/molecules/PasswordHelperText/PasswordHelperText';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';
import { getErrorFields } from '@/utils/errorFields';

export interface FormRegisterData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("L'email est requis").email('Mail invalide'),
  password: yup.string().required('Le mot de passe est requis'),
});

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
    formState: { isDirty, isValid },
  } = useForm<FormRegisterData>({
    defaultValues: {
      email: undefined,
      password: undefined,
    },
    resolver: yupResolver(schema),
  });

  const [password, setPassword] = useState<string>('');

  register('password', {
    onChange: (event: any) => {
      setPassword(event.target.value);
    },
  });

  const router = useRouter();

  const onSuccess = () => {
    const { email } = getValues();

    router.push(`${RoutingAuthentication.registerSuccess}?email=${email}`);
  };
  const registerMutation = useRegisterMutation({ onSuccess });

  const apiError = registerMutation.error ?? undefined;
  const { isLoading, data: apiSuccess } = registerMutation;

  const onSubmit = async (data: FormRegisterData) => {
    registerMutation.mutate(data);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <MainAuth
      bgColor="gray"
      withPadding={false}
      meta={
        <Meta
          title="Déclare Douanes - Inscription agent"
          description="Page de création d'un compte agent des douanes"
        />
      }
    >
      <TitleHeaderAgent title="Créer votre compte" bgColorClass="bg-white" />
      <section className="my-auto flex flex-col items-center self-center px-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Typography color="black">Saisissez vos coordonnées</Typography>
          </div>
          <InputGroup
            type="email"
            name="adult"
            fullWidth={true}
            placeholder="Email"
            register={register('email')}
            error={errors?.email?.message ?? getErrorFields('email', apiError)}
          />

          <div className="flex flex-col gap-1 pt-4">
            <InputGroup
              type={!passwordVisible ? 'password' : 'text'}
              name="adult"
              fullWidth={true}
              placeholder="Mot de passe"
              register={register('password')}
              error={errors?.password?.message ?? getErrorFields('password', apiError)}
              trailingSvgIcon={!passwordVisible ? 'visibilityOff' : 'visibilityOn'}
              onTrailingSvgIconClick={() => setPasswordVisible(!passwordVisible)}
            />
            <div className="ml-3 leading-none">
              <Typography color="light-gray" size="text-3xs">
                <PasswordHelperText password={password} />
              </Typography>
            </div>
          </div>
          <div className="pt-10 pb-2 flex">
            {apiError && <ApiError apiError={apiError} />}
            {apiSuccess && <ApiSuccess apiSuccess={apiSuccess} />}
          </div>
          <div className="flex flex-col gap-2 w-40 mx-auto">
            <Button
              fullWidth={true}
              type="submit"
              disabled={!isDirty || !isValid || isLoading}
              size="sm"
            >
              Créer mon compte
            </Button>
            <Typography color="black" size="text-2xs" textPosition="text-center">
              Champs obligatoires *
            </Typography>
          </div>
        </form>
        <span className="absolute bottom-12 flex justify-center gap-2">
          <Typography color="black" size="text-xs">
            Vous avez déjà un compte ?
          </Typography>
          <Typography color="primary" size="text-xs" underline>
            <Link href={RoutingAuthentication.login}>Se connecter</Link>
          </Typography>
        </span>
      </section>
    </MainAuth>
  );
};

export default RegisterPage;
