import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import shallow from 'zustand/shallow';

import { Button } from '@/components/common/Button';
import { TextLink } from '@/components/common/TextLink';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';

export interface FormForgetPasswordData {
  email: string;
}

const schema = yup.object({
  email: yup.string().required("L'email est requis").email("L'email n'est pas valide"),
});

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    formState: { isDirty, isValid },
  } = useForm<FormForgetPasswordData>({
    defaultValues: {
      email: undefined,
    },
    resolver: yupResolver(schema),
  });

  const { askResetPassword, errorApi, successApi } = useStore(
    (state) => ({
      askResetPassword: state.askResetPassword,
      errorApi: state.user.appState.error,
      successApi: state.user.appState.success,
    }),
    shallow,
  );

  const onSubmit = async (data: FormForgetPasswordData) => {
    await askResetPassword(data);
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
        <TextLink underline to={RoutingAuthentication.login}>
          se connecter
        </TextLink>
        {successApi && <div className="text-sm font-bold text-green-500">{successApi.message}</div>}
        {errorApi && <div className="text-sm font-bold text-red-500">{errorApi.message}</div>}
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
