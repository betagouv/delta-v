import React from 'react';

import { Typography } from '@/components/common/Typography';

export type ActualityCardProps = {
  title: string;
  creationDate: Date;
  content: string;
};

const options = { year: 'numeric', month: 'long', day: 'numeric' };

export const ActualityCard = ({ title, creationDate, content }: ActualityCardProps) => {
  return (
    <div className="grid h-[200px] w-[300px] grid-rows-[40px_30px_1fr] bg-gray-300 p-6">
      <span className="overflow-hidden text-ellipsis text-black">
        <Typography weight="bold" size="text-xl">
          {title}
        </Typography>
      </span>
      <Typography variant="paragraph" size="text-lg">
        {creationDate.toLocaleDateString(undefined, options)}
      </Typography>
      <span className="mt-3 overflow-hidden text-ellipsis">
        <Typography variant="paragraph" size="text-lg">
          {content}
        </Typography>
      </span>
    </div>
  );
};
