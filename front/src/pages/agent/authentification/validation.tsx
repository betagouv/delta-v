import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

import { useAskEmailValidationMutation, useValidationEmailMutation } from '@/api/hooks/useAPIAuth';
import { ApiError } from '@/components/atoms/ApiError';
import { ApiSuccess } from '@/components/atoms/ApiSuccess';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';

const RegisterValidationPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const { email: emailFromToken } = jwtDecode<{ email: string }>(token as string);

  const onSuccess = () => {
    setTimeout(() => {
      router.push(RoutingAuthentication.login);
    }, 1000);
  };

  const validationEmailMutation = useValidationEmailMutation({ onSuccess });
  const apiError = validationEmailMutation.error;
  const isNotValidatedAccountError = apiError?.code === 'user-not-enabled-unauthorized';
  const { data: apiSuccess } = validationEmailMutation;

  const resendEmailMutation = useAskEmailValidationMutation({
    onSuccess: () => {
      router.push(`${RoutingAuthentication.registerSuccess}?email=${emailFromToken}`);
    },
  });

  const handleValidate = () => {
    validationEmailMutation.mutate(token as string);
  };

  const handleResend = () => {
    if (emailFromToken) {
      resendEmailMutation.mutate(emailFromToken);
    }
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
          <div className="pt-6 pb-2 flex">
            {apiError && (
              <>
                <ApiError apiError={apiError} />
                {isNotValidatedAccountError && (
                  <div className="my-2">
                    <Typography textPosition="text-center" color="primary" size="text-xs" underline>
                      <span className="cursor-pointer" onClick={handleResend}>
                        Renvoyer le lien
                      </span>
                    </Typography>
                  </div>
                )}
              </>
            )}
            {apiSuccess && <ApiSuccess apiSuccess={apiSuccess} />}
          </div>
        </div>
        <div className="flex flex-col self-center items-center w-48 gap-2">
          <Button onClick={handleValidate} fullWidth={true} type="submit" size="sm">
            J'active mon compte
          </Button>
        </div>
      </div>
    </MainAuth>
  );
};

export default RegisterValidationPage;
