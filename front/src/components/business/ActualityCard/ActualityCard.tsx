import React from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { Typography } from '@/components/common/Typography';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type ActualityCardProps = {
  title: string;
  creationDate: Date;
  content: string;
  tag?: string;
};

export const ActualityCard = ({ title, creationDate, content, tag }: ActualityCardProps) => {
  return (
    <div className={cs('grid rounded-xl bg-gray-100 p-5 grid-rows-[20px_35px_1fr] w-72 h-48')}>
      <div className="grid h-full w-full grid-cols-2">
        <Typography color="middle-gray" size="text-xs">
          {tag}
        </Typography>

        <Typography color="middle-gray" size="text-xs" textPosition="text-right">
          {dayjs(creationDate).format('DD/MM/YYYY')}
        </Typography>
      </div>
      <Typography weight="bold" size="text-xl" color="black" truncate>
        {title}
      </Typography>
      <div className="line-clamp-4">
        <Typography variant="paragraph" size="text-sm" color="black">
          {content}
        </Typography>
      </div>
    </div>
  );
};
