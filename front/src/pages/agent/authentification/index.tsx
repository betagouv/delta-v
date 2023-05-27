import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import shallow from 'zustand/shallow';

import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { MainAuth } from '@/templates/MainAuth';

export interface FormLoginData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("L'email est requis").email("L'email n'est pas valide"),
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

  const { login, errorApiLogin } = useStore(
    (state) => ({
      login: state.login,
      errorApiLogin: state.user.appState.error,
    }),
    shallow,
  );
  const router = useRouter();

  const onSubmit = async (data: FormLoginData) => {
    if (await login(data)) {
      router.push('/agent');
    }
  };

  return (
    <MainAuth
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-6">
        <InputGroup
          type="email"
          name="adult"
          fullWidth={false}
          placeholder="Email"
          register={register('email')}
          error={errors?.email?.message}
        />
        <InputGroup
          type="password"
          name="adult"
          fullWidth={false}
          placeholder="Mot de passe"
          register={register('password')}
          error={errors?.password?.message}
        />
        {errorApiLogin && (
          <div className="text-sm font-bold text-red-500">{errorApiLogin.message}</div>
        )}
        <div>
          <Button fullWidth={false} type="submit" disabled={!isDirty || !isValid}>
            Valider
          </Button>
        </div>
      </form>
    </MainAuth>
  );
};

export default LoginPage;
