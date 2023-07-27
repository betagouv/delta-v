import React from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { AddProductToFavorites } from './AddProductToFavorites';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/AddProductToFavorites',
  component: AddProductToFavorites,
} as Meta;

export const Base = () => {
  // const [open, setOpen] = useState(false);

  // const onClose = (): void => {
  //   setOpen(false);
  // };
  return (
    <>
      <Button>Open</Button>
    </>
  );
};
