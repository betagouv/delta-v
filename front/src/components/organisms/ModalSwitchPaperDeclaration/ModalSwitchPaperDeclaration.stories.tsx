import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalSwitchPaperDeclaration } from './ModalSwitchPaperDeclaration';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Business/ModalSwitchPaperDeclaration',
  component: ModalSwitchPaperDeclaration,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalSwitchPaperDeclaration
        open={open}
        onClose={onClose}
        isLoading={false}
        onSwitchPaperDeclaration={() => console.log('error')}
      />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
