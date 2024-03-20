import React from 'react';

import { SvgNames } from '@/components/common/SvgIcon';
import { TransportBadge } from '@/components/common/TransportBadge';
import { Typography } from '@/components/common/Typography';
import { TextSize } from '@/components/common/Typography/style/typography.style';

export type DataInfoItemProps = {
  label: string;
  labelSize?: TextSize;
  value: string | React.ReactNode;
  valueSize?: TextSize;
  isRequired?: boolean;
  svgName?: SvgNames;
  isBold?: boolean;
};

export const DataInfoItem = ({
  label,
  labelSize,
  value,
  valueSize,
  isRequired,
  svgName,
  isBold = false,
}: DataInfoItemProps) => {
  return (
    <div className={`flex ${svgName ? 'flex-row' : 'flex-col'}`}>
      <Typography
        weight="medium"
        color="black"
        size={labelSize}
        lineHeight="leading-loose"
        desktopSize="text-2xs"
        opacity="opacity-50"
      >
        {label} {isRequired && ' *'}
      </Typography>
      {svgName ? (
        <div className="mt-1 ml-2">
          <TransportBadge svgName={svgName} />
        </div>
      ) : (
        <Typography
          color="black"
          size={valueSize}
          weight={isBold ? 'bold' : 'normal'}
          lineHeight="leading-none"
          desktopSize="md:text-[14px]"
        >
          {value}
        </Typography>
      )}
    </div>
  );
};
