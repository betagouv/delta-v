import { useRouter } from 'next/router';

import { Button } from '@/components/atoms/Button';
import { TitleHeaderAgent } from '@/components/atoms/TitleHeaderAgent';
import { Typography } from '@/components/atoms/Typography';
import { Meta } from '@/layout/Meta';
import { MainAuth } from '@/templates/MainAuth';
import { RoutingAuthentication } from '@/utils/const';

const ResetLinkSentPage = () => {
  const router = useRouter();

  const onHomeClick = () => {
    router.push(RoutingAuthentication.login);
  };

  return (
    <MainAuth
      withPadding={false}
      meta={
        <Meta
          title="Déclare Douanes - Réinitialisation du mot de passe"
          description="Réinitialisation du mot de passe réussie"
        />
      }
    >
      <TitleHeaderAgent
        title="Créer un nouveau mot de passe"
        bgColorClass="bg-white"
        switchWordPosition={1}
        colorClassnameOne="text-black"
        colorClassnameTwo="text-primary-600"
        onReturnClick={onHomeClick}
      />
      <section className="justify-center absolute my-auto h-3/4 flex flex-col items-center w-full px-10 ">
        <div className="my-auto flex flex-col items-center self-center px-10">
          <Typography
            variant="h1"
            size="text-xl"
            weight="bold"
            textPosition="text-center"
            color="black"
          >
            Mot de passe modifié !
          </Typography>
          <div className="flex flex-col pt-7 pb-14">
            <Typography textPosition="text-center" size="text-xs" color="black">
              Votre mot de passe a été modifié avec succès !
            </Typography>
          </div>
          <div className="w-40">
            <Button fullWidth={true} type="button" size="sm" onClick={onHomeClick}>
              Retour à l’accueil
            </Button>
          </div>
        </div>
      </section>
    </MainAuth>
  );
};

export default ResetLinkSentPage;
