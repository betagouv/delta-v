import { useRouter } from 'next/router';

import { useAskResetPasswordMutation } from '@/api/hooks/useAPIAuth';
import { ApiError } from '@/components/common/ApiError';
import { TitleHeaderAgent } from '@/components/common/TitleHeaderAgent';
import { Typography } from '@/components/common/Typography';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';

export interface FormRegisterData {
  email: string;
  password: string;
}

const ResetLinkSentPage = () => {
  const router = useRouter();
  const { email } = router.query;

  const onSuccess = () => {
    router.push(RoutingAuthentication.login);
  };

  const resendEmailMutation = useAskResetPasswordMutation({ onSuccess });
  const apiError = resendEmailMutation.error ?? undefined;

  const handleResend = () => {
    if (typeof email === 'string') {
      resendEmailMutation.mutate(email);
    }
  };

  return (
    <MainAuth
      withPadding={false}
      meta={
        <Meta
          title="Déclare Douanes - Demande de modification du mot de passe"
          description="Page de demande de création d'un nouveau mot de passe"
        />
      }
    >
      <TitleHeaderAgent
        title="Mot de passe oublié"
        bgColorClass="bg-white"
        switchWordPosition={3}
      />

      <div className="my-auto flex flex-col items-center self-center px-10">
        <Typography
          variant="h1"
          size="text-xl"
          weight="bold"
          textPosition="text-center"
          color="black"
        >
          Email envoyé !
        </Typography>
        <div className="flex flex-col pt-7 pb-10">
          <Typography textPosition="text-center" size="text-xs" color="black">
            {`Un lien vient de vous être envoyé à l'adresse : `}
          </Typography>
          {email && (
            <Typography textPosition="text-center" size="text-xs" color="black" weight="bold">
              {email}
            </Typography>
          )}
          <br />
          <Typography textPosition="text-center" size="text-xs" color="black">
            Suivez le guide pour renouveler
            <br />
            votre mot de passe.
          </Typography>
          <br />
          {apiError?.message && (
            <div className="ml-3">
              <ApiError apiError={apiError} />
            </div>
          )}
          <Typography textPosition="text-center" color="primary" size="text-xs" underline>
            <span className="cursor-pointer" onClick={handleResend}>
              Renvoyer le lien
            </span>
          </Typography>
        </div>
      </div>
    </MainAuth>
  );
};

export default ResetLinkSentPage;
