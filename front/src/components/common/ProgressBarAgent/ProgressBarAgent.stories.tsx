import React from 'react';

import { Meta } from '@storybook/react';

import { ProgressBarAgent } from '.';
import { ProgressLinkType } from '@/templates/DeclarationSteps';

export default {
  title: 'Molecules/ProgressBarAgent',
  component: ProgressBarAgent,
} as Meta;

const links: ProgressLinkType[] = [
  { name: 'Dashboard', to: '/', step: 1 },
  { name: 'ActivityReport', to: '/activity-report', step: 2 },
];

export const open = (): JSX.Element => {
  return (
    <div className="flex flex-row justify-between">
      <ProgressBarAgent links={links} stepNumber={1} />
    </div>
  );
};
