import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalDeclareSimulation } from './ModalDeclareSimulation';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/ModalDeclareSimulation',
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
