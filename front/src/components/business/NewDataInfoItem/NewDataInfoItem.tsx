import React from 'react';

import { SvgNames } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';

export type NewDataInfoItemProps = {
  label: string;
  value: string;
  svgName?: SvgNames;
  isBold?: boolean;
};

export const NewDataInfoItem = ({ label, value, isBold = false }: NewDataInfoItemProps) => {
  return (
    <div className={`flex flex-col`}>
      <div className="ml-5 text-gray-500 text-[10px]">
        <Typography color="light-gray" size="text-xs">
          {label}
        </Typography>
      </div>
      <div className="px-5 py-3 border border-secondary-100 bg-white text-black rounded-full mt-[6px]">
        <Typography color="black" size="text-sm" weight={isBold ? 'bold' : 'normal'}>
          {value}
        </Typography>
      </div>
    </div>
  );
};
