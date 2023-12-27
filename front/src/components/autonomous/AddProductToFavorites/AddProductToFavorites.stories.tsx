import React from 'react';

import { Meta } from '@storybook/react';

import { AddProductToFavorites } from './AddProductToFavorites';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/AddProductToFavorites',
  component: AddProductToFavorites,
} as Meta;

export const Base = () => {
  return (
    <>
      <Button>Open</Button>
    </>
  );
};
