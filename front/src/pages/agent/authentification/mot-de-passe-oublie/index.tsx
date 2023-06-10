import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAskResetPasswordMutation } from '@/api/hooks/useAPIAuth';
import { Button } from '@/components/common/Button';
import { TextLink } from '@/components/common/TextLink';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';
import { getErrorFields } from '@/utils/errorFields';

export interface FormForgetPasswordData {
  email: string;
}

const schema = yup.object({
  email: yup.string().required("L'email est requis").email("L'email n'est pas valide"),
});

const AskResetPasswordPage = () => {
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

  const askResetPasswordMutation = useAskResetPasswordMutation();
  const apiError = askResetPasswordMutation.error?.response;
  const { data: apiSuccess } = askResetPasswordMutation;

  const onSubmit = async (data: FormForgetPasswordData) => {
    askResetPasswordMutation.mutate(data.email);
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
          error={errors?.email?.message ?? getErrorFields('email', apiError)}
        />
        <TextLink underline to={RoutingAuthentication.login}>
          se connecter
        </TextLink>
        {apiError && <div className="text-sm font-bold text-red-500">{apiError.data.message}</div>}
        {apiSuccess && <div className="text-sm font-bold text-green-500">{apiSuccess.message}</div>}
        <div>
          <Button fullWidth={false} type="submit" disabled={!isDirty || !isValid}>
            Valider
          </Button>
        </div>
      </form>
    </MainAuth>
  );
};

export default AskResetPasswordPage;
