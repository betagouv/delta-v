import React, { useState } from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { ModalResumeSimulator } from './ModalResumeSimulator';
import { Button } from '@/components/common/Button';
import { SIMULATOR_EMPTY_STATE } from '@/stores/simulator/appState.store';

export default {
  title: 'Components/Business/ModalResumeSimulator',
  component: ModalResumeSimulator,
} as Meta;

export const Base = () => {
  const [open, setOpen] = useState(false);

  const onClose = (): void => {
    setOpen(false);
  };
  return (
    <>
      <ModalResumeSimulator
        open={open}
        onClose={onClose}
        simulatorRequest={SIMULATOR_EMPTY_STATE.simulatorRequest}
      />
      <Button onClick={() => setOpen(true)}>Open</Button>
    </>
  );
};
