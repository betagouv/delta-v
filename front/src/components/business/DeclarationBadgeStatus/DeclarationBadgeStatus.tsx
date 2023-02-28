import React from 'react';

import cs from 'classnames';

import { Typography } from '@/components/common/Typography';
import { DeclarationStatus, getDeclarationStatusLabel } from '@/utils/declarationStatus.util';

export type DeclarationBadgeStatusProps = {
  status: DeclarationStatus;
};

export const DeclarationBadgeStatus = ({ status }: DeclarationBadgeStatusProps) => {
  const label = getDeclarationStatusLabel(status);
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
