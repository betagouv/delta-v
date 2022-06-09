import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { OnActionModal } from './OnActionModal';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/OnActionModal',
  component: OnActionModal,
} as Meta;

export const WithVariant = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <OnActionModal open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
