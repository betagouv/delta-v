import { useRouter } from 'next/router';

import { Search } from '@/components/business/search';
import { Faqs } from '@/components/common/Faq';
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
      titleValue="FAQ"
      titleIcon="question"
      withTitle
      withHeader
    >
      <div className="flex flex-col gap-6">
        <Search onSearch={() => []} withSearchIcon searchType="faq" />
        <Faqs items={FAQS_STORE} linkId={linkId} />
      </div>
    </Main>
  );
};

export default FaqPage;
