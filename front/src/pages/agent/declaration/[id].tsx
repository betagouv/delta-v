import { useRouter } from 'next/router';

import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { SummaryDeclarationAgent } from '@/components/organisms/SummaryDeclarationAgent';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { isUUIDRegex } from '@/utils/formatTools';

const DeclarationSearch = () => {
  const router = useRouter();
  const query = router.query as { id: string };
  const id = isUUIDRegex(query.id) ? query.id : '';

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
        titleHeader="Récapitulatif"
      >
        <SummaryDeclarationAgent declarationId={id} />
      </MainAgent>
    </AgentRoute>
  );
};
export default DeclarationSearch;
