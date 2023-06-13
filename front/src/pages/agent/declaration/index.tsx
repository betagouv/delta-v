import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';

const DeclarationPage = () => {
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
        titleHeader="Déclaration"
      >
        <div className="text-xl font-bold">This is page of declaration</div>
      </MainAgent>
    </AgentRoute>
  );
};

export default DeclarationPage;
