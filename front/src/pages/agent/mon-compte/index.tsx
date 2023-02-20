import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';

const MyAccountPage = () => {
  return (
    <MainAgent
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      titleHeader="Mon compte"
    >
      <div className="text-xl font-bold">This is page of account</div>
    </MainAgent>
  );
};

export default MyAccountPage;
