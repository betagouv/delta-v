import React, { useState } from 'react';

import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { Typography } from '../Typography';
import { DownModal } from './DownModal';
import { InputGroup } from '@/components/input/InputGroup';

export default {
  title: 'Components/Common/DownModal',
  component: DownModal,
} as Meta;

type FormValues = {
  comment: string;
};

export const DownModalWithTextArea = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const methods = useForm<FormValues>({
    defaultValues: {
      comment: '',
    },
  });
  const {
    register,
    formState: { errors },
  } = methods;

  const onClose = (): void => {
    setOpen(false);
  };

  return (
    <div>
      <DownModal
        title="Êtes-vous sur de vouloir quitter la simulation ?"
        open={open}
        onClose={onClose}
      >
        <div className="align-center w-5/6">
          <InputGroup
            type="textarea"
            rows={2}
            error={errors.comment?.message}
            placeholder="here..."
            register={register('comment', {
              required: true,
            })}
            name="comment"
          />
        </div>
      </DownModal>
      <button
        onClick={() => setOpen(true)}
        className="align-center mt-base ml-base items-center rounded-md bg-primary-500 p-small"
      >
        open Downmodal
      </button>
    </div>
  );
};

export const DownModalWithInput = (): JSX.Element => {
  const [open, setOpen] = useState(true);
  const methods = useForm<FormValues>({
    defaultValues: {
      comment: '',
    },
  });
  const {
    register,
    formState: { errors },
  } = methods;

  const onClose = (): void => {
    setOpen(false);
  };

  return (
    <div>
      <DownModal bgColor="bg-note" title="ajouter une note" open={open} onClose={onClose}>
        <div className="align-center w-5/6">
          <Typography variant="h3">rgdt</Typography>
          <InputGroup
            type="text"
            rows={2}
            error={errors.comment?.message}
            placeholder="here..."
            register={register('comment', {
              required: true,
            })}
            name="comment"
          />
        </div>
      </DownModal>
      <button
        onClick={() => setOpen(true)}
        className="align-center mt-base ml-base items-center rounded-md bg-primary-500 p-small"
      >
        open Downmodal
      </button>
    </div>
  );
};
