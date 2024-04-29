import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalEditAttachmentDesktop } from './ModalEditAttachmentDesktop';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Organisms/ModalEditAttachmentDesktop',
  component: ModalEditAttachmentDesktop,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalEditAttachmentDesktop
        open={open}
        onClose={onClose}
        onFileChange={() => console.log('onFileChange')}
        register={() => console.log('register')}
      />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
