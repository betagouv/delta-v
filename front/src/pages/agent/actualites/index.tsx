import { useRouter } from 'next/router';

import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';

const ActualitiesPage = () => {
  const router = useRouter();
  return (
    <MainAgent
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      titleHeader="Actualités"
    >
      <div className="mt-6 flex flex-col gap-6">
        <li
          key={1}
          className="flex cursor-pointer flex-row items-center rounded-lg bg-gray-300 p-3"
          onClick={() => router.push('/agent/actualites/1')}
        >
          Page of first id
        </li>
        <li
          key={1}
          className="flex cursor-pointer flex-row items-center rounded-lg bg-gray-300 p-3"
          onClick={() => router.push('/agent/actualites/2')}
        >
          Page of second id
        </li>
      </div>
    </MainAgent>
  );
};

export default ActualitiesPage;
