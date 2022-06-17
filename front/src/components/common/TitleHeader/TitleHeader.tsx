import React from 'react';

import { SvgIcon, SvgNames } from '../SvgIcon';
import { Typography } from '../Typography';

export interface TitleHeaderProps {
  title: React.ReactNode;
  icon: SvgNames;
}

export const splitTitle = (item: string): string[] => {
  const titleSplit = item.split(' ');
  if (titleSplit.length === 1) {
    return [item];
  }
  const firstLine = item.substring(0, item.indexOf(' '));
  const secondLine = item.substring(item.indexOf(' ') + 1);
  return [firstLine, secondLine];
};

export const TitleHeader: React.FC<TitleHeaderProps> = ({ title, icon }: TitleHeaderProps) => {
  // const [firstLine, secondLine] = splitTitle(title);
  return (
    <div className="flex flex-row gap-2">
      <div className="h-14">
        <SvgIcon name={icon} />
      </div>
      <div className="mt-1">
        <Typography
          weight="bold"
          variant="h1"
          tag="h1"
          color="secondary"
          size="text-3xl"
          lineHeight="leading-tight"
        >
          {title}
        </Typography>
      </div>
    </div>
  );
};
