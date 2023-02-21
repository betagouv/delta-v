import React from 'react';

import { Typography } from '@/components/common/Typography';

export type DataInfoItemProps = {
  label: string;
  value: string;
  isRequired?: boolean;
};

export const DataInfoItem = ({ label, value, isRequired }: DataInfoItemProps) => {
  return (
    <div>
      <Typography weight="bold" color="light-gray">
        {label} {isRequired && ' *'}
      </Typography>
      <Typography color="black">{value}</Typography>
    </div>
  );
};
