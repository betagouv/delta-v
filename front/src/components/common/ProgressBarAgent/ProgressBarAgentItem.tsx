import React from 'react';

import classNames from 'classnames';

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
  const Component = isFutureStep ? 'div' : 'a';
  return (
    <div className="flex flex-col items-center">
      <>
        <p
          className={classNames({
            'text-[8px] font-light': true,
            'text-indigo-600': isActive,
            'text-green-400': !isActive && !isFutureStep,
            'text-gray-400': !isActive && isFutureStep,
          })}
        >{`Étape ${link.stepNumber}`}</p>
        <Component href={link.to}>
          <div
            className={classNames({
              'flex flex-col items-center rounded-[20px]': true,
              'max-w-[72px] bg-primary-100 p-2 text-primary-600': isActive,
              'py-1 mt-2': !isActive && !isFutureStep,
              'py-2 mt-1': !isActive && isFutureStep,
            })}
          >
            <div
              className={classNames({
                'flex flex-col items-center rounded-lg px-3 py-2': true,
                ' bg-white shadow-lg': isActive,
                'bg-green-100 text-green-400 shadow-lg': !isActive && !isFutureStep,
                'bg-gray-100 text-gray-400': !isActive && isFutureStep,
              })}
            >
              {link.stepNumber}
            </div>
            <p
              className={classNames({
                'mt-1 text-center text-[10px] font-[550] leading-[12px]': true,
                hidden: !isActive,
              })}
            >
              {link.name}
            </p>
          </div>
        </Component>
      </>
    </div>
  );
};
