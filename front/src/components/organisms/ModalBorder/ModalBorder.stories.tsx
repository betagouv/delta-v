import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalBorder } from './ModalBorder';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Organisms/ModalBorder',
  component: ModalBorder,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalBorder open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
