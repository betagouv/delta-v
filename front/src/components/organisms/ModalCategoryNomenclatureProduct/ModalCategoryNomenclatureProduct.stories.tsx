import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalCategoryNomenclatureProduct } from './ModalCategoryNomenclatureProduct';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Organisms/ModalCategoryNomenclatureProduct',
  component: ModalCategoryNomenclatureProduct,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalCategoryNomenclatureProduct open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
