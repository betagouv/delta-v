import React from 'react';

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
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-lg sm:text-4xl">
        Vous trouverez ci-dessous les réponses aux questions les plus fréquentes
      </h2>
      {items.map((item) => (
        <div key={item.title}>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            <h2 className="mt-10 text-base font-medium text-disabled-text">{item.title}</h2>
            {item.faqs.map((faq) => (
              <Faq
                key={faq.id}
                id={faq.id}
                answer={faq.answer}
                question={faq.question}
                linkId={linkId}
              />
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
};
