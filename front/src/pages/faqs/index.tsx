import { useState } from 'react';

import { useRouter } from 'next/router';

import { ModalUnderConstruction } from '@/components/autonomous/ModalUnderConstruction';
import { Search } from '@/components/business/search';
import { Faqs } from '@/components/common/Faq';
import { Meta } from '@/layout/Meta';
import { FAQS_STORE } from '@/stores/faqs.store';
import { Main } from '@/templates/Main';

const FaqPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
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
        <div onClick={() => setOpenModal(true)}>
          <Search onSearch={() => []} withSearchIcon searchType="faq" disabled />
        </div>
        <Faqs items={FAQS_STORE} linkId={linkId} />
      </div>

      <ModalUnderConstruction open={openModal} onClose={() => setOpenModal(false)} />
    </Main>
  );
};

export default FaqPage;
