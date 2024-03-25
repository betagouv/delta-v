import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalRejectedDeclaration } from './ModalRejectedDeclaration';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Business/ModalRejectedDeclaration',
  component: ModalRejectedDeclaration,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalRejectedDeclaration
        open={open}
        onClose={onClose}
        isLoading={false}
        onRejectedForError={() => console.log('error')}
        onRejectedForLitigation={() => console.log('ligitation')}
      />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
