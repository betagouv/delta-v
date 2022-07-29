import React from 'react';

import { Accordion, AccordionData } from './Accordion';

export interface AccordionsProps {
  items: AccordionData[];
  currentOpenId?: string;
  setOpenId?: (id: any) => void;
}

export const Accordions: React.FC<AccordionsProps> = ({
  items,
  currentOpenId,
  setOpenId,
}: AccordionsProps) => {
  return (
    <dl>
      <div className="border border-secondary-100" />
      {items.map((item) => (
        <Accordion
          key={item.id}
          {...item}
          open={currentOpenId === item.id}
          setOpenId={(id: string) => setOpenId?.(id)}
        />
      ))}
    </dl>
  );
};
