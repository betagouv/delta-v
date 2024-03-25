import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalFavorites } from './ModalFavorites';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Organisms/ModalFavorites',
  component: ModalFavorites,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalFavorites open={open} onClose={onClose} onClickFavorite={() => console.log('click')} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
