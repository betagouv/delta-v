import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { CategoryProductMobile } from './CategoryProductMobile';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/CategoryProductMobile',
  component: CategoryProductMobile,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <CategoryProductMobile open={open} onClose={onClose} />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
