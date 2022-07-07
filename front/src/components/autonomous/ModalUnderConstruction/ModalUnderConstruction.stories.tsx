import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalUnderConstruction } from './ModalUnderConstruction';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/ModalUnderConstruction',
  component: ModalUnderConstruction,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalUnderConstruction open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
