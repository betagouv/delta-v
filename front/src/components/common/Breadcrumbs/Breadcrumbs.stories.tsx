import React from 'react';

import { Meta } from '@storybook/react';

import { Breadcrumbs } from '.';

export default {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
} as Meta;

export const open = (): JSX.Element => {
  return (
    <div className="flex flex-row justify-between">
      <Breadcrumbs categoryProducts={['A', 'B', 'C']} />
    </div>
  );
};
