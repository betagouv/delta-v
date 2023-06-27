import React, { Fragment } from 'react';

import { Icon } from '../Icon';
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
        <div className="flex items-center">
          <Icon name="chevron-right" size="sm" />
        </div>
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
