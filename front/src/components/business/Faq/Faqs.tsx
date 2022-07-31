import React, { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { scroller } from 'react-scroll';

import { Border } from './FaqData/Border';
import { Declaration } from './FaqData/Declaration';
import { Legal } from './FaqData/Legal';
import { Payment } from './FaqData/Payment';
import { Accordions } from '@/components/common/Accordion';
import { Typography } from '@/components/common/Typography';

export interface FaqsProps {
  linkId?: string;
}

export const Faqs: React.FC<FaqsProps> = ({ linkId }: FaqsProps) => {
  const [currentOpenId, setCurrentOpenId] = useState(linkId);
  const { trackEvent } = useMatomo();

  const FaqData = [
    { title: 'Déclaration', faqs: Declaration },
    { title: 'Passage frontière', faqs: Border },
    { title: 'Paiement', faqs: Payment },
    { title: 'Légal', faqs: Legal },
  ];

  useEffect(() => {
    if (linkId) {
      setCurrentOpenId(linkId);

      scroller.scrollTo(linkId, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
  }, [linkId]);

  useEffect(() => {
    if (currentOpenId) {
      FaqData.forEach((data) => {
        data.faqs.forEach((faq) => {
          if (faq.id === currentOpenId) {
            trackEvent({ category: 'user-action', action: 'open-faq', name: faq.question });
          }
        });
      });
    }
  }, [currentOpenId]);
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-lg sm:text-4xl">
        Vous trouverez ci-dessous les réponses aux questions les plus fréquentes
      </h2>
      {FaqData.map((item) => (
        <div key={item.title}>
          <dl className="mt-6">
            <div className="mt-10 mb-4">
              <Typography color="light-gray" size="text-base">
                {item.title}
              </Typography>
            </div>

            <Accordions
              items={item.faqs}
              currentOpenId={currentOpenId}
              setOpenId={(id: string) => setCurrentOpenId(id)}
            />
          </dl>
        </div>
      ))}
    </div>
  );
};
