import React, { useEffect, useState } from 'react';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

export interface FaqProps {
  id: string;
  question: string;
  answer: string;
  linkId?: string;
}

export const Faq: React.FC<FaqProps> = ({ id, question, answer, linkId }: FaqProps) => {
  const idChosen = linkId === id;
  const [keyOfOpenDisclosure, setKeyOfOpenDisclosure] = useState(false);

  useEffect(() => {
    setKeyOfOpenDisclosure(idChosen);
  }, [idChosen]);
  const checkOpen = (disclosure: boolean, open: boolean): boolean => {
    if (disclosure) {
      return !open;
    }
    return open;
  };

  return (
    <Disclosure as="div" key={id} className="pt-6" id={id}>
      {({ open }) => (
        <>
          <dt className="text-lg">
            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
              <span
                className={classNames({
                  'text-gray-900 text-base': true,
                  'font-bold': checkOpen(keyOfOpenDisclosure, open),
                })}
              >
                {question}
              </span>
              <div>
                <ChevronDownIcon
                  className={classNames(
                    checkOpen(keyOfOpenDisclosure, open) ? '-rotate-180' : 'rotate-0',
                    'h-6 w-6 transform',
                  )}
                  aria-hidden="true"
                />
              </div>
            </Disclosure.Button>
          </dt>
          <Transition show={checkOpen(keyOfOpenDisclosure, open)}>
            <Disclosure.Panel as="dd" className="mt-2 pr-12">
              <p className="text-sm">{answer}</p>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};
