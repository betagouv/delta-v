import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { DeleteModal } from './DeleteModal';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/DeleteModal',
  component: DeleteModal,
} as Meta;

export const WithVariant = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <DeleteModal open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
