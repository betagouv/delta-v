import { useRouter } from 'next/router';

import { useValidationEmailMutation } from '@/api/hooks/useAPIAuth';
import { ApiError } from '@/components/common/ApiError';
import { ApiSuccess } from '@/components/common/ApiSuccess';
import { Button } from '@/components/common/Button';
import { Typography } from '@/components/common/Typography';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';

const RegisterValidationPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const onSuccess = () => {
    router.push(RoutingAuthentication.login);
  };

  const validationEmailMutation = useValidationEmailMutation({ onSuccess });
  const apiError = validationEmailMutation.error;
  const { data: apiSuccess } = validationEmailMutation;

  const handleValidate = () => {
    router.push(`${RoutingAuthentication.resetPasswordChange}?token=${token}`);
  };

  return (
    <MainAuth
      withPadding={false}
      meta={
        <Meta
          title="Déclare Douanes - Réinitialisation du mot de passe"
          description="Page de réinitialisation du mot de passe"
        />
      }
    >
      <div className="my-auto flex flex-col items-center self-center px-10">
        <div className="flex flex-col pb-16 px-7">
          <Typography
            variant="h1"
            size="text-xl"
            weight="bold"
            textPosition="text-center"
            color="black"
          >
            Réinitialisation de votre mot de passe
          </Typography>
        </div>
        <div className="flex flex-col gap-5 max-w-xs">
          <Typography size="text-xs" color="black">
            Bonjour,
            <br />
            <br />
            Il semblerait que vous ayez oublié votre mot de passe, pas de panique !
            <br />
            <br />
            Pour en définir un nouveau, il vous suffit de cliquer sur ce lien :
          </Typography>
        </div>
        <div className="flex flex-col self-center items-center w-56 gap-2 mt-7">
          {apiError && <ApiError apiError={apiError} />}
          {apiSuccess && <ApiSuccess apiSuccess={apiSuccess} />}
          <Button onClick={handleValidate} fullWidth={true} type="submit" size="sm">
            Modifier mon mot de passe
          </Button>
          <Typography textPosition="text-center" color="primary" size="text-2xs">
            Attention, ce lien est actif XX heures
          </Typography>
        </div>
      </div>
    </MainAuth>
  );
};

export default RegisterValidationPage;
