import React from 'react';

import classNames from 'classnames';

import { Icon } from '../Icon';
import { Typography } from '../Typography';
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
      <>
        <div>
          <div
            className={classNames({
              'flex flex-row items-center justify-center': true,
              'font-bold': isActive,
              'font-bold text-primary-600': !isActive && !isFutureStep,
              'font-medium': !isActive && isFutureStep,
            })}
          >
            <Icon
              // eslint-disable-next-line no-nested-ternary
              name={isActive ? 'circle-check' : isFutureStep ? 'circle-empty' : 'circle-full'}
              size="base"
            />
            <Typography textPosition="text-center" size="text-2xs" color="black">
              <span className="ml-2">{link.name}</span>
            </Typography>
          </div>
        </div>
      </>
    </div>
  );
};
