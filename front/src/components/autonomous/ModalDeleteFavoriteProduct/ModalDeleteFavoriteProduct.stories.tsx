import React from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalDeleteFavoriteProduct } from './ModalDeleteFavoriteProduct';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/ModalDeleteFavoriteProduct',
  component: ModalDeleteFavoriteProduct,
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
