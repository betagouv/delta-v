import { useRouter } from 'next/router';

import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';

const DeclarationSearch = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
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
      <div className="flex flex-1 flex-col gap-6">This is the page {id}</div>
    </MainAgent>
  );
};
export default DeclarationSearch;
