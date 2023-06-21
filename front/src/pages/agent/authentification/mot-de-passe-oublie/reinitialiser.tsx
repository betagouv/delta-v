import { useRouter } from 'next/router';

import { useValidationEmailMutation } from '@/api/hooks/useAPIAuth';
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
      meta={
        <Meta
          title="Déclare Douanes - Réinitialisation du mot de passe"
          description="Page de réinitialisation du mot de passe"
        />
      }
    >
      <div className="my-auto flex flex-col items-center self-center gap-8">
        <div className="pb-16">
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
          </Typography>
          <Typography size="text-xs" color="black">
            Il semblerait que vous ayez oublié votre mot de passe, pas de panique !
          </Typography>
          <Typography size="text-xs" color="black">
            Pour en définir un nouveau, il vous suffit de cliquer sur ce lien :
          </Typography>
        </div>
        <div className="w-50 flex flex-col self-center items-center gap-2 mt-6">
          {apiSuccess && (
            <Typography color="success" size="text-2xs">
              {apiSuccess.message}
            </Typography>
          )}
          {apiError && (
            <Typography color="error" size="text-2xs">
              {apiError.message}
            </Typography>
          )}
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
