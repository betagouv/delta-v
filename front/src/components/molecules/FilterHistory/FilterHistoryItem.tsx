import React from 'react';

import { Icon } from '@/components/atoms/Icon';
import { Link } from '@/components/atoms/Link';
import { Typography } from '@/components/atoms/Typography';
import { DeclarationStatus, getDeclarationStatusLabel } from '@/utils/declarationStatus.util';

export type FilterHistoryItemProps = {
  title: string;
  startDate: string;
  endDate: string;
  status: DeclarationStatus;
  to?: string;
};

export const FilterHistoryItem = ({
  title,
  startDate,
  endDate,
  status,
  to,
}: FilterHistoryItemProps) => {
  return (
    <Link to={to}>
      <div className="inline-flex items-center gap-2 text-primary-700">
        <Icon name="search" size="base" />
        <Typography color="middle-gray" size="text-xs">
          {startDate}
          {endDate}
        </Typography>
        <Typography color="black" size="text-xs">{`${title} ${getDeclarationStatusLabel(
          status,
        )}`}</Typography>
      </div>
    </Link>
  );
};
