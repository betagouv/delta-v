import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalResumeDeclaration } from './ModalResumeDeclaration';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Business/ModalResumeDeclaration',
  component: ModalResumeDeclaration,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalResumeDeclaration open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
