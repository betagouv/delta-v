import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalSearchProduct } from './ModalSearchProduct';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Organisms/ModalSearchProduct',
  component: ModalSearchProduct,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalSearchProduct open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
