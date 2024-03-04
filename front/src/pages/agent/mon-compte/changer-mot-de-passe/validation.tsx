import { useRouter } from 'next/router';

import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Button } from '@/components/common/Button';
import { TitleHeaderAgent } from '@/components/common/TitleHeaderAgent';
import { Typography } from '@/components/common/Typography';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { RoutingAgent } from '@/utils/const';

const ResetLinkSentPage = () => {
  const router = useRouter();

  const onHomeClick = () => {
    router.push(`${RoutingAgent.home}?mode=tools`);
  };

  return (
    <AgentRoute>
      <MainAgent meta={<Meta title="Déclare Douane" description="Modification du mot de passe." />}>
        <TitleHeaderAgent
          title="Modifier mon mot de passe"
          bgColorClass="bg-white"
          switchWordPosition={1}
          colorClassnameOne="text-black"
          colorClassnameTwo="text-primary-600"
          titleWidthClassname="w-[220px]"
        />
        <section className="justify-center absolute my-auto h-3/4 flex flex-col items-center w-full px-10 ">
          <div className="my-auto flex flex-col items-center self-center">
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
      </MainAgent>
    </AgentRoute>
  );
};

export default ResetLinkSentPage;
