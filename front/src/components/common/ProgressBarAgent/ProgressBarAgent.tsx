import React, { Fragment } from 'react';

import cs from 'classnames';

import { ProgressBarAgentItem } from './ProgressBarAgentItem';
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

const RenderProgress = (
  link: ProgressBarAgentItemType,
  isActive: boolean,
  isFutureStep: boolean,
) => {
  return (
    <Fragment key={link.name}>
      {link.step > 1 && (
        <div
          key={`progress-bar-${link.step}`}
          className={cs({
            'float-left mt-[43px] h-[2px] w-[100%] flex-1 md:mt-[40px] lg:mt-[45px': true,
            'bg-gradient-to-l from-primary-100 to-green-100': isActive,
            'bg-gray-100': !isActive && isFutureStep,
            'bg-green-100': !isActive && !isFutureStep,
          })}
        />
      )}
      <ProgressBarAgentItem link={link} isActive={isActive} isFutureStep={isFutureStep} />
    </Fragment>
  );
};

export const ProgressBarAgent: React.FC<IProgressBarAgentProps> = ({
  links,
  currentStep,
}: IProgressBarAgentProps) => {
  return (
    <nav className="flex flex-row justify-between">
      {links.map((link) => {
        const isFutureStep = link.step > currentStep;
        const isActive = link.step === currentStep;
        return RenderProgress(link, isActive, isFutureStep);
      })}
    </nav>
  );
};
