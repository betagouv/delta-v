import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';

import { ModalTokenExpire } from './ModalTokenExpire';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Components/Organisms/ModalTokenExpire',
  component: ModalTokenExpire,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);
  const [expirationTime, setExpirationTime] = useState(dayjs().add(10, 'minutes').unix());

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalTokenExpire
        open={open}
        onClose={onClose}
        isLoading={false}
        expirationTime={expirationTime}
        onRefresh={() => setExpirationTime(dayjs().add(10, 'minutes').unix())}
      />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
