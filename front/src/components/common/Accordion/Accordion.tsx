import React from 'react';

import classNames from 'classnames';

import { Icon } from '../Icon';
import { SvgIcon, SvgNames } from '../SvgIcon';

export interface AccordionData {
  id: string;
  question: string;
  iconName?: SvgNames;
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
  iconName,
  open = false,
  setOpenId,
}: AccordionProps) => {
  return (
    <>
      <div className="py-3" id={id}>
        <button
          className="flex w-full flex-row items-start justify-between text-left text-lg"
          onClick={() => {
            setOpenId(open ? undefined : id);
          }}
        >
          {iconName && (
            <div className="mr-2 flex h-6 w-6 flex-row items-center">
              <SvgIcon name={iconName} />
            </div>
          )}
          <div
            className={classNames({
              'text-secondary-800 text-base flex-1 flex flex-row': true,
              'font-bold': open,
            })}
          >
            <span>{question}</span>
          </div>
          <div className="ml-4 h-4 w-4">
            {open ? (
              <Icon name="chevron-thin-up" size="xl" />
            ) : (
              <Icon name="chevron-thin-down" size="xl" />
            )}
          </div>
        </button>
        <div
          className={classNames({
            'mt-2 overflow-hidden transition-[max-height] ease-in-out duration-300': true,
            'max-h-0': !open,
            'max-h-[3000px]': open,
          })}
        >
          {answer}
        </div>
      </div>
      <div className="border border-secondary-100" />
    </>
  );
};
