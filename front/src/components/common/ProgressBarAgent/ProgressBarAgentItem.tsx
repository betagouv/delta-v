import React from 'react';

import classNames from 'classnames';

import { Icon } from '../Icon';
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
        <Component href={link.to}>
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
            <p
              className={classNames({
                'ml-2 text-center text-2xs leading-[12px]': true,
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
