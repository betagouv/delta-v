import React from 'react';

import { Meta } from '@storybook/react';

import { Tooltip } from './Tooltip';

export default {
  title: 'Components/Atoms/Tooltip',
  component: Tooltip,
} as Meta;

export const Primary = (): JSX.Element => (
  <Tooltip message="tooltip text">
    <span>tooltip</span>
  </Tooltip>
);
