import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalDeleteAttachmentMobile } from './ModalDeleteAttachmentMobile';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/ModalDeleteAttachmentMobile',
  component: ModalDeleteAttachmentMobile,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalDeleteAttachmentMobile open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
