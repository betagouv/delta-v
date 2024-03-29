import React from 'react';

import cs from 'classnames';

import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import {
  DeclarationStatus,
  getDeclarationStatusColor,
  getDeclarationStatusIcon,
  getDeclarationStatusLabel,
} from '@/utils/declarationStatus.util';

export type DeclarationBadgeStatusProps = {
  status: DeclarationStatus;
};

export const DeclarationBadgeStatus = ({ status }: DeclarationBadgeStatusProps) => {
  const label = getDeclarationStatusLabel(status);
  const color = getDeclarationStatusColor(status);
  const icon = getDeclarationStatusIcon(status);
  return (
    <div className={cs('min-h-[24px] rounded-md px-2.5 w-fit flex items-center gap-[6px]', color)}>
      {icon && (
        <div className="flex">
          <Icon name={icon} size="sm" color="white" />
        </div>
      )}
      <Typography size="text-2xs" color="white" weight="bold">
        {label}
      </Typography>
    </div>
  );
};
