import React from 'react';

import { TextSize, Typography } from '@/components/common/Typography';

export type DataInfoItemProps = {
  label: string;
  value: string;
  isRequired?: boolean;
  size?: TextSize;
};

export const DataInfoItem = ({ label, value, isRequired, size }: DataInfoItemProps) => {
  return (
    <div>
      <Typography weight="bold" color="light-gray" size={size}>
        {label} {isRequired && ' *'}
      </Typography>
      <Typography color="black" size={size}>
        {value}
      </Typography>
    </div>
  );
};
