import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { ModalUnderConstruction } from '@/components/organisms/ModalUnderConstruction';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { Routing } from '@/utils/const';

const Declaration = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const router = useRouter();

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withTitle
        withPadding
        titleHeader="Declaration"
        isMobile={isMobile}
      >
        {/* {isMobile ? <DeclarationPageMobile /> : <DeclarationPageDesktop />} */}
        <ModalUnderConstruction
          open={true}
          onClose={() => {
            router.push(Routing.home);
          }}
        />
      </MainAgent>
    </AgentRoute>
  );
};

export default Declaration;
