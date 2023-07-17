import React from 'react';

import { Meta } from '@storybook/react';

import { Skeleton } from './Skeleton';

export default {
  title: 'Components/Common/Skeleton',
  component: Skeleton,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div style={{ background: 'lightgrey' }}>
    <Skeleton />
  </div>
);
