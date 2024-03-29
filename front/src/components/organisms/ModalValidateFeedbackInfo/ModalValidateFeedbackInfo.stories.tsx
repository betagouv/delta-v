import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalValidateFeedbackInfoMobile } from './ModalValidateFeedbackInfoMobile';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Organisms/ModalValidateFeedbackInfoMobile',
  component: ModalValidateFeedbackInfoMobile,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalValidateFeedbackInfoMobile
        open={open}
        onClose={onClose}
        onClickToRedirect={() => console.log('click')}
      />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
