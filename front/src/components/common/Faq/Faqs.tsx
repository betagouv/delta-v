import React, { useState } from 'react';

import { Typography } from '../Typography';
import { Faq } from './Faq';

export interface FaqEntity {
  id: string;
  question: string;
  answer: string;
  images?: string[];
}

export interface FaqsProps {
  items: {
    title: string;
    faqs: FaqEntity[];
  }[];
  linkId?: string;
}

export const Faqs: React.FC<FaqsProps> = ({ items, linkId }: FaqsProps) => {
  const [currentOpenId, setCurrentOpenId] = useState(linkId);
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-lg sm:text-4xl">
        Vous trouverez ci-dessous les réponses aux questions les plus fréquentes
      </h2>
      {items.map((item) => (
        <div key={item.title}>
          <dl className="mt-6">
            <div className="mt-10 mb-3.5">
              <Typography color="light-gray" size="text-base">
                {item.title}
              </Typography>
            </div>
            <div className="border border-secondary-100" />
            {item.faqs.map((faq) => (
              <Faq
                key={faq.id}
                id={faq.id}
                answer={faq.answer}
                question={faq.question}
                open={currentOpenId === faq.id}
                setOpenId={(id: string) => setCurrentOpenId(id)}
              />
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
};
