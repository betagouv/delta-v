import React from 'react';

import Link from 'next/link';

import { ProgressBarAgentItemType } from '@/templates/DeclarationSteps';

export interface IProgressBarAgentProps {
  links: ProgressBarAgentItemType[];
  currentStep: number;
}

export interface IProgressBarAgentItemProps {
  link: ProgressBarAgentItemType;
  isActive?: boolean;
  isFutureStep?: boolean;
}

export const ProgressBarAgentItem: React.FC<IProgressBarAgentItemProps> = ({
  link,
  isActive,
  isFutureStep,
}) => {
  return (
    <div className="flex flex-col items-center">
      {isActive && (
        <>
          <p className="text-[8px] font-light text-indigo-600">{`Étape ${link.step}`}</p>
          <Link href={link.to}>
            <div className="flex max-w-[72px] flex-col items-center rounded-[20px] bg-primary-100 p-2 text-primary-600">
              <div className="flex flex-col items-center rounded-lg bg-white px-3 py-2 shadow-lg">
                {link.step}
              </div>
              <p className="mt-1 text-center text-[10px] font-[550] leading-[12px]">{link.name}</p>
            </div>
          </Link>
        </>
      )}
      {!isActive && !isFutureStep && (
        <>
          <p className="text-[8px] font-light text-green-400">{`Étape ${link.step}`}</p>
          <Link href={link.to}>
            <div className="flex flex-col items-center rounded-[20px] py-1">
              <div className="flex flex-col items-center rounded-lg bg-green-100 px-3 py-2 text-green-400 shadow-lg">
                {link.step}
              </div>
            </div>
          </Link>
        </>
      )}
      {!isActive && isFutureStep && (
        <>
          <div className="flex flex-col items-center">
            <p className="text-[8px] font-light text-gray-400">{`Étape ${link.step}`}</p>
            <div className="flex flex-col items-center rounded-[20px] py-2">
              <div className="flex flex-col items-center rounded-lg bg-gray-100 px-3 py-2 text-gray-400">
                {link.step}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
