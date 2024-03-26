import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { OnActionModal } from './OnActionModal';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Organisms/OnActionModal',
  component: OnActionModal,
} as Meta;

export const WithVariant = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <OnActionModal open={open} onSuccess={onClose} onReject={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
