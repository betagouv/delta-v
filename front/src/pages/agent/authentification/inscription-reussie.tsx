import { useRouter } from 'next/router';

import { useAskEmailValidationMutation } from '@/api/hooks/useAPIAuth';
import { Button } from '@/components/common/Button';
import { TitleHeaderAgent } from '@/components/common/TitleHeaderAgent';
import { Typography } from '@/components/common/Typography';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';

export interface FormRegisterData {
  email: string;
  password: string;
}

const RegisterSuccessPage = () => {
  const router = useRouter();
  const { email } = router.query;

  const resendEmailMutation = useAskEmailValidationMutation();

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
          title="Déclare Douanes - Inscription agent réussie"
          description="Page de création d'un compte agent des douanes"
        />
      }
    >
      <TitleHeaderAgent title="Créer votre compte" bgColorClass="bg-white"></TitleHeaderAgent>
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
            {`Un lien d’activation a été envoyé à l’adresse : `}
          </Typography>
          {email && (
            <Typography textPosition="text-center" size="text-xs" color="black" weight="bold">
              {email}
            </Typography>
          )}
          <br />
          <Typography textPosition="text-center" size="text-xs" color="black">
            Activez dès à présent votre compte à partir de votre mail !
          </Typography>
          <br />
          <Typography textPosition="text-center" color="primary" size="text-xs" underline>
            <span className="cursor-pointer" onClick={handleResend}>
              Renvoyer le lien
            </span>
          </Typography>
        </div>
        <div className="flex flex-col gap-5 w-48 mx-auto">
          <Button
            onClick={() => router.push(RoutingAuthentication.login)}
            fullWidth={true}
            type="submit"
            size="sm"
          >
            J’ai activé mon compte
          </Button>
        </div>
      </div>
    </MainAuth>
  );
};

export default RegisterSuccessPage;
