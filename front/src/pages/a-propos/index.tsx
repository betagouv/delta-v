import { useRouter } from 'next/router';

import { About } from '@/components/molecules/About';
import { LegalMentions } from '@/components/molecules/About/AboutData/LegalMentions';
import { PersonalData } from '@/components/molecules/About/AboutData/PersonalData';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const index = () => {
  const router = useRouter();
  const linkId = router.query.id as string | undefined;
  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      titleValue="À propos"
      withHeader
      withTitle
    >
      <div className="mt-5">
        <About items={[...LegalMentions, ...PersonalData]} linkId={linkId} />
      </div>
    </Main>
  );
};

export default index;
