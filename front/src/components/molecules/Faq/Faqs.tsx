import React, { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { scroller } from 'react-scroll';

import { Accordions } from '@/components/atoms/Accordion';
import { Typography } from '@/components/atoms/Typography';
import { BlocElements } from '@/staticData';

export interface FaqsProps {
  faqData: BlocElements[];
  linkId?: string;
}

export const Faqs: React.FC<FaqsProps> = ({ linkId, faqData }: FaqsProps) => {
  const [currentOpenId, setCurrentOpenId] = useState(linkId);
  const { trackEvent } = useMatomo();

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
      faqData.forEach((bloc) => {
        bloc.elements.forEach((element) => {
          if (element.id === currentOpenId) {
            trackEvent({ category: 'user-action', action: 'open-faq', name: element.question });
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
      {faqData.map((bloc) => (
        <div key={bloc.title}>
          <dl className="mt-6">
            <div className="mt-10 mb-4">
              <Typography color="light-gray" size="text-base">
                {bloc.title}
              </Typography>
            </div>

            <Accordions
              items={bloc.elements}
              currentOpenId={currentOpenId}
              setOpenId={(id: string) => setCurrentOpenId(id)}
            />
          </dl>
        </div>
      ))}
    </div>
  );
};
