import { Meta } from '@storybook/react';
import React from 'react';

import { ProgressLinkType } from '@/components/templates/AppLayout';

import { ProgressBar } from '.';

export default {
  title: 'Molecules/ProgressBar',
  component: ProgressBar
} as Meta;

const links: ProgressLinkType[] = [
  { name: 'Dashboard', to: '/', icon: 'meter', step: 1 },
  { name: 'ActivityReport', to: '/activity-report', icon: 'drawer', step: 2 }
];

export const open = (): JSX.Element => {
  return (
    <div className="flex flex-row justify-between">
      <ProgressBar links={links} stepNumber={1} />
    </div>
  );
};
