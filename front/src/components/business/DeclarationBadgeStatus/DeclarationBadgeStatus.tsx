import React from 'react';

import cs from 'classnames';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
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
    <div className={cs('h-5 rounded-md px-3 py-1 w-fit flex items-center gap-1', color)}>
      <Icon name={icon} size="xs" color="white" />
      <Typography size="text-2xs" color="white">
        {label}
      </Typography>
    </div>
  );
};
