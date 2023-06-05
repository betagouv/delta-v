import { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

import { TextLink } from '@/components/common/TextLink';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const { validateEmail } = useStore((state) => ({
    validateEmail: state.validateEmail,
  }));
  const [apiResponseSuccess, setApiResponseSuccess] = useState<AxiosResponse<any, any> | null>(
    null,
  );
  const [apiResponseError, setApiResponseError] = useState<AxiosResponse<any, any> | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        const { success, response } = await validateEmail({ token: token as string });
        if (success) {
          setApiResponseSuccess(response);
          setApiResponseError(null);
        } else if (success === false) {
          setApiResponseError(response);
          setApiResponseSuccess(null);
        }
      }
    };
    validateToken();
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
      {apiResponseSuccess && (
        <div className="text-sm font-bold text-green-500">{apiResponseSuccess.data.message}</div>
      )}
      {apiResponseError && (
        <div className="text-sm font-bold text-red-500">{apiResponseError.data.message}</div>
      )}
      <TextLink underline to={RoutingAuthentication.login}>
        se connecter
      </TextLink>
    </MainAuth>
  );
};

export default ResetPasswordPage;
