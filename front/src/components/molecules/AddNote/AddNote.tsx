import React from 'react';

import { Typography } from '@/components/atoms/Typography';

export type AddNoteProps = {
  onClick?: () => void;
};

export const AddNote = ({ onClick }: AddNoteProps) => {
  return (
    <div className={`flex cursor-pointer flex-row justify-between`}>
      <Typography weight="bold" color="light-gray" size="text-sm">
        Note
      </Typography>
      <Typography color="black" size="text-sm" onClick={onClick} weight="bold">
        + Ajouter une note
      </Typography>
    </div>
  );
};
