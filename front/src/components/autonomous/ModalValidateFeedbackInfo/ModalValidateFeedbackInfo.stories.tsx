import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalValidateFeedbackInfo } from './ModalValidateFeedbackInfo';
import { Button } from '@/components/common/Button';

export default {
  title: 'Components/Business/ModalValidateFeedbackInfo',
  component: ModalValidateFeedbackInfo,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalValidateFeedbackInfo
        open={open}
        onClose={onClose}
        onClickToRedirect={() => console.log('click')}
      />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
