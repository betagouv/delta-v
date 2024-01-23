import React from 'react';

import { SvgNames } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { TextSize } from '@/components/common/Typography/style/typography.style';

export type NewDataInfoItemProps = {
  label: string;
  value: string;
  svgName?: SvgNames;
  isBold?: boolean;
  size?: TextSize;
};

export const NewDataInfoItem = ({
  label,
  value,
  isBold = false,
  size = 'text-sm',
}: NewDataInfoItemProps) => {
  return (
    <div className={`flex flex-col flex-1`}>
      <div className="ml-5 text-gray-500 text-2xs">
        <Typography color="light-gray" size="text-3xs" transform="uppercase">
          {label}
        </Typography>
      </div>
      <div className="px-5 py-3 bg-white text-black rounded-full mt-[6px] flex flex-row justify-between">
        <Typography
          color="black"
          size={size}
          weight={isBold ? 'bold' : 'normal'}
          lineHeight="leading-none"
        >
          {value}
        </Typography>
      </div>
    </div>
  );
};
