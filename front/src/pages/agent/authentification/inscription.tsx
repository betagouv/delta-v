import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosResponse } from 'axios';
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

export interface FormRegisterData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("L'email est requis").email("L'email n'est pas valide"),
  password: yup.string().required('Le mot de passe est requis'),
});

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    formState: { isDirty, isValid },
  } = useForm<FormRegisterData>({
    defaultValues: {
      email: undefined,
      password: undefined,
    },
    resolver: yupResolver(schema),
  });

  const { registerAgent } = useStore((state) => ({
    registerAgent: state.register,
  }));
  const [apiResponseSuccess, setApiResponseSuccess] = useState<AxiosResponse<any, any> | null>(
    null,
  );
  const [apiResponseError, setApiResponseError] = useState<AxiosResponse<any, any> | null>(null);

  const onSubmit = async (data: FormRegisterData) => {
    const { success, response } = await registerAgent(data);
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
          type="email"
          name="adult"
          fullWidth={false}
          placeholder="Email"
          register={register('email')}
          error={errors?.email?.message ?? getErrorFields('email', apiResponseError)}
        />
        <InputGroup
          type="password"
          name="adult"
          fullWidth={false}
          placeholder="Mot de passe"
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

export default RegisterPage;
