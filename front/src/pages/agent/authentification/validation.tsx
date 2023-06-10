import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useValidationEmailMutation } from '@/api/hooks/useAPIAuth';
import { TextLink } from '@/components/common/TextLink';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const validationEmailMutation = useValidationEmailMutation();
  const apiError = validationEmailMutation.error?.response;
  const { data: apiSuccess } = validationEmailMutation;

  useEffect(() => {
    validationEmailMutation.mutate(token as string);
  }, [token]);

  return (
    <MainAuth
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      {apiSuccess && <div className="text-sm font-bold text-green-500">{apiSuccess.message}</div>}
      {apiError && <div className="text-sm font-bold text-red-500">{apiError.data.message}</div>}
      <TextLink underline to={RoutingAuthentication.login}>
        se connecter
      </TextLink>
    </MainAuth>
  );
};

export default ResetPasswordPage;
