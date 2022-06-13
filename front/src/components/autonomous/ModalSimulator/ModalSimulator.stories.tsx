import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalSimulator } from './ModalSimulator';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/ModalSimulator',
  component: ModalSimulator,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalSimulator open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
