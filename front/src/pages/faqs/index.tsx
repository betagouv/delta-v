import { useState } from 'react';

import { useRouter } from 'next/router';

import { ModalUnderConstruction } from '@/components/autonomous/ModalUnderConstruction';
import { Faqs } from '@/components/business/Faq';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const FaqPage = () => {
  const { getFaqData } = useStore((state) => ({
    getFaqData: state.getFaqData,
  }));

  const [openModal, setOpenModal] = useState<boolean>(false);
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
      titleValue="FAQ"
      titleIcon="question"
      withTitle
      withHeader
    >
      <div className="flex flex-col gap-6">
        <Faqs linkId={linkId} faqData={getFaqData()} />
      </div>

      <ModalUnderConstruction open={openModal} onClose={() => setOpenModal(false)} />
    </Main>
  );
};

export default FaqPage;
