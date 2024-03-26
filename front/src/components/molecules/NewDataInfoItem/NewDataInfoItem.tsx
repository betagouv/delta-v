import React from 'react';

import { Typography } from '@/components/atoms/Typography';
import { TextSize } from '@/components/atoms/Typography/style/typography.style';
import { SvgNames } from '@/components/molecules/SvgIcon';

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
          desktopSize="text-xs"
          weight={isBold ? 'bold' : 'normal'}
          lineHeight="leading-none"
        >
          {value}
        </Typography>
      </div>
    </div>
  );
};
