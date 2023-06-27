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
    validationEmailMutation.mutate(token as string);
  };

  return (
    <MainAuth
      withPadding={false}
      meta={
        <Meta
          title="Déclare Douanes - Activation de compte Agent"
          description="Page de validation de la création d'un compte agent des douanes"
        />
      }
    >
      <div className="my-auto flex flex-col items-center self-center">
        <div className="flex flex-col pb-16">
          <Typography
            variant="h1"
            size="text-xl"
            weight="bold"
            textPosition="text-center"
            color="black"
          >
            Création de votre compte
          </Typography>
          <Typography
            variant="h1"
            size="text-xl"
            weight="bold"
            textPosition="text-center"
            color="primary"
          >
            Déclare Douane Agent
          </Typography>
        </div>
        <div className="flex flex-col gap-5 max-w-xs">
          <Typography size="text-xs" color="black">
            Bonjour,
            <br />
            <br />
            Vous venez de créer votre compte Déclare Douane Agent.
            <br />
            <br />
            Pour activer celui-ci, il vous suffit de cliquer sur le lien ci-dessous et profiter de
            l’application dès à présent !
          </Typography>
        </div>
        <div className="flex flex-col self-center items-center w-48 gap-2 mt-7">
          {apiError && <ApiError apiError={apiError} />}
          {apiSuccess && <ApiSuccess apiSuccess={apiSuccess} />}
          <Button onClick={handleValidate} fullWidth={true} type="submit" size="sm">
            J'active mon compte
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
