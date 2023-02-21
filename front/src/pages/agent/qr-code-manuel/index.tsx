import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';

const ManualQRCodePage = () => {
  return (
    <MainAgent
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      titleHeader="Saisie manuelle de la quittance"
    >
      <div className="text-xl font-bold">This is page of qr code</div>
    </MainAgent>
  );
};

export default ManualQRCodePage;
