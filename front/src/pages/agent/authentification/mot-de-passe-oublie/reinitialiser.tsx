import { useRouter } from 'next/router';

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';

const RegisterValidationPage = () => {
  const router = useRouter();
  const { token } = router.query;

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
      <div className="my-auto flex flex-col items-center self-center px-10 pt-4">
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
          <Button onClick={handleValidate} fullWidth={true} type="submit" size="sm">
            Modifier mon mot de passe
          </Button>
        </div>
      </div>
    </MainAuth>
  );
};

export default RegisterValidationPage;
