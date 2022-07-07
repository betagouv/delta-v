import { UnderConstruction } from '@/components/business/underConstruction';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
    >
      <UnderConstruction />
    </Main>
  );
};

export default index;
