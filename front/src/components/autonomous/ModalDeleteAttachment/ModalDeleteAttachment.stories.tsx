import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalDeleteAttachment } from './ModalDeleteAttachment';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/ModalDeleteAttachment',
  component: ModalDeleteAttachment,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalDeleteAttachment open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
