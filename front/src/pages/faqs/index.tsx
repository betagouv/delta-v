import { useRouter } from 'next/router';

import { Header } from '@/components/business/header';
import { Search } from '@/components/business/search';
import { Faqs } from '@/components/common/Faq';
import { TitleHeader } from '@/components/common/TitleHeader';
import { Meta } from '@/layout/Meta';
import { FAQS_STORE } from '@/stores/faqs.store';
import { Main } from '@/templates/Main';

const FaqPage = () => {
  const router = useRouter();
  const linkId = router.query.id as string | undefined;
  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <div className="flex flex-col gap-6">
        <Header />
        <TitleHeader title="FAQ" icon="question" />
        <Search onSearch={() => []} withSearchIcon searchType="faq" />
        <Faqs items={FAQS_STORE} linkId={linkId} />
      </div>
    </Main>
  );
};

export default FaqPage;
