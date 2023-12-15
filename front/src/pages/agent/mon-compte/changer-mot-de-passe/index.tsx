import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useChangePasswordMutation } from '@/api/hooks/useAPIAuth';
import { ApiError } from '@/components/common/ApiError';
import { Button } from '@/components/common/Button';
import { PasswordHelperText } from '@/components/common/PasswordHelperText';
import { TitleHeaderAgent } from '@/components/common/TitleHeaderAgent';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAgent } from '@/utils/const';
import { getErrorFields } from '@/utils/errorFields';
import { getStringOrUndefined } from '@/utils/string';

export interface ChangePasswordFormData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  oldPassword: yup.string().required('Le mot de passe est requis'),
  password: yup.string().required('Le mot de passe est requis'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Les deux mots de passe doivent être identiques')
    .required('Le mot de passe est requis'),
});

const ChangePasswordPage = () => {
  const {
    watch,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    register,
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      oldPassword: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const [isCurrentStepOne, setIsCurrentStepOne] = useState<boolean>(true);
  const onOldPasswordSubmit = () => {
    setIsCurrentStepOne(false);
  };

  const password = getStringOrUndefined(watch('password'));
  const confirmPassword = getStringOrUndefined(watch('confirmPassword'));

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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [submitClickCount, setSubmitClickCount] = useState(0);

  const handleReturnFromStepTwo = () => {
    setIsCurrentStepOne(true);
    setSubmitClickCount(0);
  };

  const confirmPasswordError = submitClickCount > 0 ? errors?.confirmPassword?.message : undefined;

  return (
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
                  type={!oldPasswordVisible ? 'password' : 'text'}
                  name="oldPassword"
                  fullWidth={true}
                  placeholder="Ancien mot de passe"
                  register={register('oldPassword')}
                  error={errors?.oldPassword?.message ?? getErrorFields('password', apiError)}
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
              <div className="flex flex-col gap-1 pb-12">
                <InputGroup
                  label="Mon nouveau mot de passe"
                  type={!passwordVisible ? 'password' : 'text'}
                  name="password"
                  fullWidth={true}
                  placeholder="Nouveau mot de passe"
                  register={register('password')}
                  error={getErrorFields('password', apiError)}
                  trailingSvgIcon={!passwordVisible ? 'visibilityOff' : 'visibilityOn'}
                  onTrailingSvgIconClick={() => setPasswordVisible(!passwordVisible)}
                  withBorder
                  required
                />
                <div className="ml-3  leading-none">
                  <Typography color="light-gray" size="text-3xs">
                    <PasswordHelperText password={password ?? ''} />
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <InputGroup
                  label="Confirmer le mot de passe"
                  type={!confirmPasswordVisible ? 'password' : 'text'}
                  name="confirmPassword"
                  fullWidth={true}
                  placeholder="Nouveau mot de passe"
                  register={register('confirmPassword')}
                  error={confirmPasswordError ?? getErrorFields('password', apiError)}
                  trailingSvgIcon={!confirmPasswordVisible ? 'visibilityOff' : 'visibilityOn'}
                  onTrailingSvgIconClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  withBorder
                  required
                />
              </div>
              <div className="pt-10 pb-2 flex">{apiError && <ApiError apiError={apiError} />}</div>
              <div className="flex flex-col gap-4 w-40 self-center pb-2">
                <Button
                  fullWidth={true}
                  type="submit"
                  disabled={
                    !isDirty ||
                    !isValid ||
                    !password ||
                    !confirmPassword ||
                    (submitClickCount > 0 && password !== confirmPassword)
                  }
                  size="sm"
                  onClick={() => setSubmitClickCount(submitClickCount + 1)}
                >
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
  );
};

export default ChangePasswordPage;
