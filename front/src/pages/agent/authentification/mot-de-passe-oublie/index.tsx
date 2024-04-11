import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAskResetPasswordMutation } from '@/api/hooks/useAPIAuth';
import { ApiError } from '@/components/atoms/ApiError';
import { Button } from '@/components/atoms/Button';
import { TitleHeaderAgent } from '@/components/atoms/TitleHeaderAgent';
import { Typography } from '@/components/atoms/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';
import { getErrorFields } from '@/utils/errorFields';

export interface FormForgetPasswordData {
  email: string;
}

const schema = yup.object({
  email: yup.string().required("L'email est requis").email('Mail invalide'),
});

const AskResetPasswordPage = () => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
    formState: { isDirty, isValid },
  } = useForm<FormForgetPasswordData>({
    defaultValues: {
      email: undefined,
    },
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const askResetPasswordMutation = useAskResetPasswordMutation({
    onSuccess: () => {
      const { email } = getValues();
      router.push(`${RoutingAuthentication.forgetPasswordLinkSent}?email=${email}`);
    },
  });

  const apiError = askResetPasswordMutation.error ?? undefined;

  const onSubmit = async (data: FormForgetPasswordData) => {
    askResetPasswordMutation.mutate(data.email);
  };

  const handleCancelClick = () => {
    router.push(RoutingAuthentication.login);
  };

  return (
    <MainAuth
      withPadding={false}
      meta={
        <Meta
          title="Déclare Douanes - Mot de passe oublié"
          description="Page de demande de création d'un nouveau mot de passe"
        />
      }
    >
      <TitleHeaderAgent
        title="Mot de passe oublié"
        bgColorClass="bg-white"
        switchWordPosition={3}
      />
      <section className="self-center w-full flex flex-col items-center px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col w-full">
          <InputGroup
            label="Saisissez votre adresse email"
            type="email"
            name="adult"
            fullWidth={true}
            placeholder="Email"
            register={register('email')}
            error={errors?.email?.message ?? getErrorFields('email', apiError)}
            withBorder
            required
          />
          <div className="pt-10 pb-2 flex">{apiError && <ApiError apiError={apiError} />}</div>
          <div className="flex flex-col gap-4 w-36 self-center">
            <Button fullWidth={true} type="submit" disabled={!isDirty || !isValid} size="sm">
              Envoyer
            </Button>
            <Button
              fullWidth={true}
              type="button"
              size="sm"
              variant="outlined"
              onClick={handleCancelClick}
            >
              Annuler
            </Button>
          </div>
        </form>
        <span className="absolute bottom-3.5 flex justify-center">
          <Typography color="black" size="text-2xs" textPosition="text-center">
            Champs obligatoires *
          </Typography>
        </span>
      </section>
    </MainAuth>
  );
};

export default AskResetPasswordPage;
