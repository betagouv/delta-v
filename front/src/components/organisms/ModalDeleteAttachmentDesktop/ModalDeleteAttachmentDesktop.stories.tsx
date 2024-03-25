import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalDeleteAttachmentDesktop } from './ModalDeleteAttachmentDesktop';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Business/ModalDeleteAttachmentDesktop',
  component: ModalDeleteAttachmentDesktop,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalDeleteAttachmentDesktop open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
