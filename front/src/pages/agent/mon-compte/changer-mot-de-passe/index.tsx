import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useChangePasswordMutation } from '@/api/hooks/useAPIAuth';
import { ConfirmPassword, FormFieldData } from '@/components/autonomous/ConfirmPassword';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { ApiError } from '@/components/common/ApiError';
import { Button } from '@/components/common/Button';
import { TitleHeaderAgent } from '@/components/common/TitleHeaderAgent';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAgent } from '@/utils/const';
import { getErrorFields } from '@/utils/errorFields';
import { passwordRegex } from '@/utils/regex';

export interface ChangePasswordFormData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  oldPassword: yup.string().required('Le mot de passe est requis'),
  password: yup
    .string()
    .matches(
      passwordRegex,
      'Le mot de passe doit contenir 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et 8 caractères minimum',
    )
    .required('Le mot de passe est requis'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Les deux mots de passe doivent être identiques')
    .required('Le mot de passe est requis'),
});

const ChangePasswordPage = () => {
  const reactForm = useForm<ChangePasswordFormData>({
    defaultValues: {
      oldPassword: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
    resolver: yupResolver(schema),
  });

  const {
    watch,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    register,
    getValues,
  } = reactForm;

  const router = useRouter();

  const [isCurrentStepOne, setIsCurrentStepOne] = useState<boolean>(true);
  const onOldPasswordSubmit = () => {
    setIsCurrentStepOne(false);
  };

  const changePasswordMutation = useChangePasswordMutation({
    onSuccess: () => {
      router.push(RoutingAgent.changePasswordSuccess);
    },
  });

  const apiError = changePasswordMutation.error ?? undefined;

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (!apiError && isValid && data.password === data.confirmPassword) {
      changePasswordMutation.mutate({
        oldPassword: data.oldPassword,
        newPassword: data.password,
      });
    }
  };

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [submitClickCount, setSubmitClickCount] = useState(0);
  const [submittedPassword, setSubmittedPassword] = useState<string | undefined>(undefined);
  const [submittedConfirmPassword, setSubmittedConfirmPassword] = useState<string | undefined>(
    undefined,
  );

  const handleReturnFromStepTwo = () => {
    setIsCurrentStepOne(true);
    setSubmitClickCount(0);
  };

  const handleSubmitClick = () => {
    setSubmitClickCount(submitClickCount + 1);
    setSubmittedPassword(getValues('password'));
    setSubmittedConfirmPassword(getValues('confirmPassword'));
  };

  const passwordFormFieldData: FormFieldData = {
    register: register('password'),
    error: errors.password,
    watchedValue: watch('password'),
    submittedValue: submittedPassword,
  };

  const confirmPasswordFormFieldData: FormFieldData = {
    register: register('confirmPassword'),
    error: errors.confirmPassword,
    watchedValue: watch('confirmPassword'),
    submittedValue: submittedConfirmPassword,
  };

  return (
    <AgentRoute>
      <MainAuth
        withPadding={false}
        meta={
          <Meta
            title="Déclare Douanes - Modification du mot de passe"
            description="Page de modification de mot de passe"
          />
        }
      >
        <TitleHeaderAgent
          title="Modifier mon mot de passe"
          bgColorClass="bg-white"
          switchWordPosition={1}
          colorClassnameOne="text-black"
          colorClassnameTwo="text-primary-600"
          onReturnClick={!isCurrentStepOne ? handleReturnFromStepTwo : undefined}
        />
        <section className="my-auto h-3/4 flex flex-col items-center w-full px-10 ">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
            {isCurrentStepOne && (
              <>
                <div className="my-2.5">
                  <InputGroup
                    type={oldPasswordVisible ? 'text' : 'password'}
                    name="oldPassword"
                    fullWidth={true}
                    placeholder="Ancien mot de passe"
                    register={register('oldPassword')}
                    error={errors?.oldPassword?.message ?? getErrorFields('oldPassword', apiError)}
                    trailingSvgIcon={!oldPasswordVisible ? 'visibilityOff' : 'visibilityOn'}
                    onTrailingSvgIconClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                    withBorder
                    label="Saisissez votre ancien mot de passe"
                  />
                </div>
                <div className="mt-5 flex flex-col items-center gap-2">
                  {apiError?.message && (
                    <div className="ml-3">
                      <ApiError apiError={apiError} />
                    </div>
                  )}
                  <div className="w-40 flex flex-col items-center gap-2">
                    <Button
                      fullWidth={true}
                      type="button"
                      disabled={!isDirty}
                      size="sm"
                      onClick={onOldPasswordSubmit}
                    >
                      Valider
                    </Button>
                    <Typography size="text-2xs" color="black" textPosition="text-center">
                      Champs obligatoires *
                    </Typography>
                  </div>
                </div>
              </>
            )}
            {!isCurrentStepOne && (
              <>
                <ConfirmPassword
                  password={passwordFormFieldData}
                  confirmPassword={confirmPasswordFormFieldData}
                  submitCount={submitClickCount}
                />
                <div className="pt-10 pb-2 flex">
                  <Typography color="error" size="text-2xs">
                    {getErrorFields('newPassword', apiError)}
                  </Typography>
                  {apiError && <ApiError apiError={apiError} />}
                </div>
                <div className="flex flex-col gap-4 w-40 self-center pb-2">
                  <Button fullWidth={true} type="submit" size="sm" onClick={handleSubmitClick}>
                    Valider
                  </Button>
                </div>
                <Typography color="black" size="text-2xs" textPosition="text-center">
                  Champs obligatoires *
                </Typography>
              </>
            )}
          </form>
        </section>
      </MainAuth>
    </AgentRoute>
  );
};

export default ChangePasswordPage;
