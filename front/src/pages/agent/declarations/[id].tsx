import { useRouter } from 'next/router';

import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';

const QuittanceSearch = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withHeader
        titleHeader="Quittance"
      >
        <div className="text-xl font-bold">This is the page {id}</div>
      </MainAgent>
    </AgentRoute>
  );
};
export default simulator(QuittanceSearch);
