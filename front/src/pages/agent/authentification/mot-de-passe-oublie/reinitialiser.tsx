import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
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
  password: string;
}

const schema = yup.object({
  password: yup.string().required('Le mot de passe esr requis'),
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
    },
    resolver: yupResolver(schema),
  });

  const { resetPassword, errorApi, successApi } = useStore(
    (state) => ({
      resetPassword: state.resetPassword,
      errorApi: state.user.appState.error,
      successApi: state.user.appState.success,
    }),
    shallow,
  );

  const onSubmit = async (data: FormForgetPasswordData) => {
    if (await resetPassword({ token: token as string, password: data.password })) {
      router.push(RoutingAuthentication.login);
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
          type="password"
          name="password"
          fullWidth={false}
          placeholder="Password"
          register={register('password')}
          error={errors?.password?.message}
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

export default ResetPasswordPage;
