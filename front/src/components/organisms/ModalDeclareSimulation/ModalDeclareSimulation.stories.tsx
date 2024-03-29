import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalDeclareSimulation } from './ModalDeclareSimulation';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Organisms/ModalDeclareSimulation',
  component: ModalDeclareSimulation,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalDeclareSimulation open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
