import React, { useState } from 'react';

import { Meta } from '@storybook/react';

import { ModalValidateDeclaration } from './ModalValidateDeclaration';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Business/ModalValidateDeclaration',
  component: ModalValidateDeclaration,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalValidateDeclaration
        open={open}
        onClose={onClose}
        isLoading={false}
        onValidate={() => console.log('validate')}
        declarationId="123"
      />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
