import React, { useEffect, useState } from 'react';

import { scroller } from 'react-scroll';

import { Accordions } from '@/components/common/Accordion';
import { AccordionData } from '@/components/common/Accordion/Accordion';
import { Typography } from '@/components/common/Typography';

export interface FaqsProps {
  items: {
    title: string;
    faqs: AccordionData[];
  }[];
  linkId?: string;
}

export const Faqs: React.FC<FaqsProps> = ({ items, linkId }: FaqsProps) => {
  const [currentOpenId, setCurrentOpenId] = useState(linkId);

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
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-lg sm:text-4xl">
        Vous trouverez ci-dessous les réponses aux questions les plus fréquentes
      </h2>
      {items.map((item) => (
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
