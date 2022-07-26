import React from 'react';

import classNames from 'classnames';

import { Icon } from '../Icon';

export interface AccordionData {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export interface AccordionProps extends AccordionData {
  open?: boolean;
  setOpenId: (id: any) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  id,
  question,
  answer,
  open = false,
  setOpenId,
}: AccordionProps) => {
  return (
    <>
      <div className="py-3" id={id}>
        <button
          className="flex w-full flex-row items-start justify-between gap-4 text-left text-lg"
          onClick={() => {
            setOpenId(open ? undefined : id);
          }}
        >
          <span
            className={classNames({
              'text-secondary-800 text-base flex-1': true,
              'font-bold': open,
            })}
          >
            {question}
          </span>
          <div className="h-4 w-4">
            {open ? <Icon name="chevron-up" /> : <Icon name="chevron-down" />}
          </div>
        </button>
        <div
          className={classNames({
            'mt-2 pr-12 overflow-hidden transition-[max-height] ease-in-out duration-300': true,
            'max-h-0': !open,
            'max-h-[3000px]': open,
          })}
        >
          <p>{answer}</p>
        </div>
      </div>
      <div className="border border-secondary-100" />
    </>
  );
};
