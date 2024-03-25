import React from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalAddFavoriteProduct } from './ModalAddFavoriteProduct';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Organisms/ModalAddFavoriteProduct',
  component: ModalAddFavoriteProduct,
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
