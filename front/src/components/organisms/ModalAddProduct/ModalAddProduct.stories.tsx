import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalAddProduct } from './ModalAddProduct';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Organisms/ModalAddProduct',
  component: ModalAddProduct,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalAddProduct open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
