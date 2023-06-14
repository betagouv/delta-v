import React from 'react';

import { Typography } from '../Typography';

export interface TitleAgentProps {
  title: string;
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

export const TitleAgent: React.FC<TitleAgentProps> = ({ title }: TitleAgentProps) => {
  const titleSplit = title.split(/(?<=^\S+)\s/);
  return (
    <Typography weight="bold" variant="h1" tag="h2" color="black" size="text-xl">
      <span className="text-primary-600">{titleSplit[0]}</span> {titleSplit[1]}
    </Typography>
  );
};
