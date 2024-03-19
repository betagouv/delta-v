import React from 'react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

export type ProgressBarAgentItemType = {
  name: string;
  to: string;
  stepNumber: number;
};

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
      <div className="flex flex-row items-center justify-center">
        <Icon
          // eslint-disable-next-line no-nested-ternary
          name={isActive ? 'circle-check' : isFutureStep ? 'circle-empty' : 'circle-full'}
          size="base"
        />
        <Typography
          textPosition="text-center"
          size="text-2xs"
          desktopSize="text-sm"
          color={isActive ? 'primary' : 'black'}
          weight={!isFutureStep ? 'bold' : 'normal'}
        >
          <span className="ml-2">{link.name}</span>
        </Typography>
      </div>
    </div>
  );
};
