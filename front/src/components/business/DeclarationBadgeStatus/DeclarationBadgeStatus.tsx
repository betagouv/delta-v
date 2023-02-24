import React from 'react';

import cs from 'classnames';

import { Typography } from '@/components/common/Typography';

export type DeclarationBadgeStatusProps = {
  status: DeclarationStatus;
};

export enum DeclarationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  VALIDATED = 'validated',
  PAID = 'paid',
  REFUSED = 'refused',
}

export const DeclarationBadgeStatus = ({ status }: DeclarationBadgeStatusProps) => {
  const setLabel = () => {
    switch (status) {
      case DeclarationStatus.DRAFT:
        return 'Brouillon';
      case DeclarationStatus.SUBMITTED:
        return 'Envoyé';
      case DeclarationStatus.VALIDATED:
        return 'Validé';
      case DeclarationStatus.PAID:
        return 'Payé';
      case DeclarationStatus.REFUSED:
        return 'Refusé';
      default:
        return '';
    }
  };
  const label = setLabel();
  return (
    <div
      className={cs({
        'h-8 border rounded-md px-2.5 w-fit flex items-center': true,
        'bg-[#FFE9C8]': status === DeclarationStatus.DRAFT,
        'bg-green-200': status === DeclarationStatus.SUBMITTED,
        'bg-green-300': status === DeclarationStatus.VALIDATED,
        'bg-green-400': status === DeclarationStatus.PAID,
        'bg-red-200': status === DeclarationStatus.REFUSED,
      })}
    >
      <Typography size="text-sm" color="black">
        {label}
      </Typography>
    </div>
  );
};
