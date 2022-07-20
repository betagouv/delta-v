import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalMaximumAmount } from './ModalMaximumAmount';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/ModalMaximumAmount',
  component: ModalMaximumAmount,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalMaximumAmount open={open} onClose={onClose} productType="alcohol" country="US" />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
