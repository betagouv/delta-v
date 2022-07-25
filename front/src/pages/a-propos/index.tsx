import { About } from '@/components/business/About';
import { LegalMentions } from '@/components/business/About/AboutData/LegalMentions';
import { PersonalData } from '@/components/business/About/AboutData/PersonalData';
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
      titleValue="A propos"
      withHeader
      withTitle
    >
      <About items={[...LegalMentions, ...PersonalData]} />
    </Main>
  );
};

export default index;
