import React from 'react';

import { Typography } from '../Typography';

export interface TitleAgentProps {
  title: string;
  switchWordPosition?: number;
  colorClassnameOne?: string;
  colorClassnameTwo?: string;
  textPosition?: 'text-left' | 'text-center' | 'text-right';
  size?: 'text-xl' | 'text-2xl' | 'text-3xl';
  fontFamily?: 'roboto' | 'marianne';
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

export const TitleAgent: React.FC<TitleAgentProps> = ({
  title,
  switchWordPosition = 1,
  colorClassnameOne = 'text-primary-600',
  colorClassnameTwo = 'text-black',
  textPosition = 'text-center',
  size = 'text-xl',
  fontFamily = 'roboto',
}: TitleAgentProps) => {
  const titleSplit = title.split(' ');
  const firstPart = titleSplit.slice(0, switchWordPosition).join(' ');
  const secondPart = titleSplit.slice(switchWordPosition).join(' ');

  return (
    <Typography
      weight="bold"
      variant="h1"
      tag="h2"
      size={size}
      textPosition={textPosition}
      family={fontFamily}
    >
      <span className={colorClassnameOne}>{firstPart}</span>
      &nbsp;
      <span className={colorClassnameTwo}>{secondPart}</span>
    </Typography>
  );
};
