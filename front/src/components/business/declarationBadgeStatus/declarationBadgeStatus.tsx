import React from 'react';

import cs from 'classnames';

import { Typography } from '@/components/common/Typography';

export type DeclarationBadgeStatusProps = {
  status: DeclarationStatus;
};

export enum DeclarationStatus {
  draft = 'draft',
  submitted = 'submitted',
  validated = 'validated',
  paid = 'paid',
  refused = 'refused',
}

export const declarationBadgeStatus = ({ status }: DeclarationBadgeStatusProps) => {
  return (
    <div
      className={cs('border rounded-lg px-4 py-2 w-fit', [
        status === 'draft' && 'bg-[#FFE9C8]',
        status === 'submitted' && 'bg-green-200',
        status === 'validated' && 'bg-green-200',
        status === 'paid' && 'bg-green-200',
        status === 'refused' && 'bg-red-200',
      ])}
    >
      <Typography size="text-xl">
        {[
          status === 'draft' && 'Brouillon',
          status === 'submitted' && 'Envoyé',
          status === 'validated' && 'Validé',
          status === 'paid' && 'Payé',
          status === 'refused' && 'Refusé',
        ]}
      </Typography>
    </div>
  );
};
