import React, { useState } from 'react';

import { Meta } from '@storybook/react';

import { ModalPaidDeclaration } from './ModalPaidDeclaration';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/ModalPaidDeclaration',
  component: ModalPaidDeclaration,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalPaidDeclaration
        open={open}
        onClose={onClose}
        isLoading={false}
        onPaid={() => console.log('paid')}
        declarationId="123"
      />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
