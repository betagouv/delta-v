import React from 'react';

import { Meta } from '@storybook/react';

import { ProgressBarAgent } from '.';
import { ProgressBarAgentItemType } from '@/templates/DeclarationAgentSteps';

export default {
  title: 'Molecules/ProgressBarAgent',
  component: ProgressBarAgent,
} as Meta;

const links: ProgressBarAgentItemType[] = [
  { name: 'Dashboard', to: '/', stepNumber: 1 },
  { name: 'ActivityReport', to: '/activity-report', stepNumber: 2 },
];

export const open = (): JSX.Element => {
  return (
    <div className="flex flex-row justify-between">
      <ProgressBarAgent links={links} currentStep={1} />
    </div>
  );
};
