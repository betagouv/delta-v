import React, { useEffect, useState } from 'react';

import { scroller } from 'react-scroll';

import { Accordions } from '@/components/atoms/Accordion';
import { AccordionData } from '@/components/atoms/Accordion/Accordion';

export interface AboutProps {
  items: AccordionData[];
  linkId?: string;
}

export const About: React.FC<AboutProps> = ({ items, linkId }: AboutProps) => {
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
    <Accordions
      items={items}
      currentOpenId={currentOpenId}
      setOpenId={(id: string) => setCurrentOpenId(id)}
    />
  );
};
