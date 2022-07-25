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
    <div className="mx-auto max-w-3xl">
      <dl className="mt-6">
        <div className="border border-secondary-100" />
        {items.map((item) => (
          <Accordion
            key={item.id}
            id={item.id}
            answer={item.answer}
            question={item.question}
            open={currentOpenId === item.id}
            setOpenId={(id: string) => setOpenId?.(id)}
          />
        ))}
      </dl>
    </div>
  );
};
