import React from 'react';

import { SvgNames } from '@/components/common/SvgIcon';
import { TransportBadge } from '@/components/common/TransportBadge';
import { TextSize, Typography } from '@/components/common/Typography';

export type DataInfoItemProps = {
  label: string;
  value: string;
  isRequired?: boolean;
  size?: TextSize;
  svgName?: SvgNames;
  isBold?: boolean;
};

export const DataInfoItem = ({
  label,
  value,
  isRequired,
  size,
  svgName,
  isBold = false,
}: DataInfoItemProps) => {
  return (
    <div className={`flex ${svgName ? 'flex-row' : 'flex-col'}`}>
      <Typography weight="bold" color="light-gray" size={size}>
        {label} {isRequired && ' *'}
      </Typography>
      {svgName ? (
        <div className="mt-1 ml-2">
          <TransportBadge svgName={svgName} />
        </div>
      ) : (
        <Typography color="black" size={size} weight={isBold ? 'bold' : 'normal'}>
          {value}
        </Typography>
      )}
    </div>
  );
};
