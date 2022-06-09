import { useRouter } from 'next/router';

import { BackButton } from '@/components/common/BackButton';
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
      <div className="flex flex-col gap-6 px-4 py-8">
        <BackButton />
        <TitleHeader title="FAQ" icon="question" />
        <Faqs items={FAQS_STORE} linkId={linkId} />
      </div>
    </Main>
  );
};

export default FaqPage;
