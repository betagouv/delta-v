import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';

const NomenclaturePage = () => {
  return (
    <MainAgent
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      titleHeader="Nomenclature"
    >
      <div className="text-xl font-bold">This is page of nomenclature</div>
    </MainAgent>
  );
};

export default NomenclaturePage;
