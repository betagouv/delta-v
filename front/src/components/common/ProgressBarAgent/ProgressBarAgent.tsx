import React, { Fragment } from 'react';

import cs from 'classnames';

import { ProgressBarAgentItem } from './ProgressBarAgentItem';
import { ProgressBarAgentItemType } from '@/templates/DeclarationSteps';

export interface IProgressBarAgentProps {
  links: ProgressBarAgentItemType[];
  currentStep: number;
}

export interface IProgressBarAgentItemProps {
  step: ProgressBarAgentItemType;
  currentStep: number;
}

const RenderProgress = (step: ProgressBarAgentItemType, currentStep: number) => {
  const isFutureStep = step.stepNumber > currentStep;
  const isActive = step.stepNumber === currentStep;
  return (
    <Fragment key={step.name}>
      {step.stepNumber > 1 && (
        <div
          key={`progress-bar-${step.stepNumber}`}
          className={cs({
            'float-left mt-[43px] h-[2px] w-[100%] flex-1 md:mt-[40px] lg:mt-[45px': true,
            'bg-gradient-to-l from-primary-100 to-green-100': isActive,
            'bg-gray-100': !isActive && isFutureStep,
            'bg-green-100': !isActive && !isFutureStep,
          })}
        />
      )}
      <ProgressBarAgentItem link={step} isActive={isActive} isFutureStep={isFutureStep} />
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
        return RenderProgress(link, currentStep);
      })}
    </nav>
  );
};
