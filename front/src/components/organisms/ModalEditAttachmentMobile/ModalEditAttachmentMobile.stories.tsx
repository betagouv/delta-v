import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalEditAttachmentMobile } from './ModalEditAttachmentMobile';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Organisms/ModalEditAttachmentMobile',
  component: ModalEditAttachmentMobile,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalEditAttachmentMobile
        open={open}
        onClose={onClose}
        onFileChange={() => console.log('onFileChange')}
        register={() => console.log('register')}
      />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
