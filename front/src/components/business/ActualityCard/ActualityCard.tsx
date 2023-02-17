import React from 'react';

import { Typography } from '@/components/common/Typography';

export type ActualityCardProps = {
  title: string;
  creationDate: Date;
  content: string;
};

export const getValueOrEmpty = (text: string) => {
  if (!text) {
    return '';
  }
  return text;
};

const maxTextLength = 50;

const splitDescription = (text: string) => {
  const sliceDescription = getValueOrEmpty(text).slice(0, maxTextLength);
  const lastSpacePosition = sliceDescription.lastIndexOf(' ');
  if (getValueOrEmpty(text).length > maxTextLength) {
    return `${getValueOrEmpty(text).slice(0, lastSpacePosition)}...`;
  }
  return text;
};

const options = { year: 'numeric', month: 'long', day: 'numeric' };

export const ActualityCard = ({ title, creationDate, content }: ActualityCardProps) => {
  const splitContent = splitDescription(content);
  return (
    <div className="grid h-[200px] w-[300px] grid-rows-[40px_30px_1fr] bg-gray-300 p-6">
      <Typography weight="bold" size="text-xl" ellipsis>
        {title}
      </Typography>

      <Typography variant="paragraph" size="text-lg">
        {creationDate.toLocaleDateString(undefined, options)}
      </Typography>
      <span className="mt-3 overflow-hidden text-ellipsis">
        <Typography variant="paragraph" size="text-lg">
          {splitContent}
        </Typography>
      </span>
    </div>
  );
};
