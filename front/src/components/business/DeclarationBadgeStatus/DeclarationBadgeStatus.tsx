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
      className={cs('h-[30px] border rounded-md px-[10px] w-fit flex items-center', [
        status === DeclarationStatus.DRAFT && 'bg-[#FFE9C8]',
        status === DeclarationStatus.SUBMITTED && 'bg-green-200',
        status === DeclarationStatus.VALIDATED && 'bg-green-200',
        status === DeclarationStatus.PAID && 'bg-green-200',
        status === DeclarationStatus.REFUSED && 'bg-red-200',
      ])}
    >
      <Typography size="text-sm" color="black">
        {label}
      </Typography>
    </div>
  );
};
