import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';

const ContactPage = () => {
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
        titleHeader="Contact"
      >
        <div className="text-xl font-bold">This is page of contact</div>
      </MainAgent>
    </AgentRoute>
  );
};

export default ContactPage;
