import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '@/components/common/Button';
import { TextLink } from '@/components/common/TextLink';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';
import { getErrorFields } from '@/utils/errorFields';

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

  const { resetPassword } = useStore((state) => ({
    resetPassword: state.resetPassword,
  }));
  const [apiResponseSuccess, setApiResponseSuccess] = useState<AxiosResponse<any, any> | null>(
    null,
  );
  const [apiResponseError, setApiResponseError] = useState<AxiosResponse<any, any> | null>(null);

  const onSubmit = async (data: FormForgetPasswordData) => {
    const { success, response } = await resetPassword({
      token: token as string,
      password: data.password,
    });
    if (success) {
      setApiResponseSuccess(response);
      setApiResponseError(null);
    } else if (success === false) {
      setApiResponseError(response);
      setApiResponseSuccess(null);
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
          error={errors?.password?.message ?? getErrorFields('password', apiResponseError)}
        />
        <TextLink underline to={RoutingAuthentication.login}>
          se connecter
        </TextLink>
        {apiResponseError && (
          <div className="text-sm font-bold text-red-500">{apiResponseError.data.message}</div>
        )}
        {apiResponseSuccess && (
          <div className="text-sm font-bold text-green-500">{apiResponseSuccess.data.message}</div>
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

export default ResetPasswordPage;
