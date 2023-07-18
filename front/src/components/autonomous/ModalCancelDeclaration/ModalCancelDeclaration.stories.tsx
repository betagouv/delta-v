import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalCancelDeclaration } from './ModalCancelDeclaration';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/ModalCancelDeclaration',
  component: ModalCancelDeclaration,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalCancelDeclaration open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
