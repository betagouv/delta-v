import React from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { CategoryProductDesktop } from './CategoryProductDesktop';

export default {
  title: 'Components/Business/CategoryProductDesktop',
  component: CategoryProductDesktop,
} as Meta;

export const Base = () => {
  return (
    <>
      <CategoryProductDesktop />
    </>
  );
};
