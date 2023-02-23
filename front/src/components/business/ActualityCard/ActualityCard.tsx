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
    <div
      className={cs(
        'grid rounded-xl bg-gray-100 p-[20px] grid-rows-[20px_35px_1fr] w-[288px] h-[187px]',
      )}
    >
      <div className="grid h-full w-full grid-cols-2">
        <Typography color="middle-gray" size="text-xs">
          {tag}
        </Typography>

        <span>
          <Typography color="middle-gray" size="text-xs" textPosition="text-right">
            {dayjs(creationDate).format('DD/MM/YYYY')}
          </Typography>
        </span>
      </div>
      <Typography weight="bold" size="text-xl" color="black" truncate>
        {title}
      </Typography>
      <div className="line-clamp-4">
        <Typography lineHeight="leading-tight" variant="paragraph" size="text-sm" color="black">
          {content}
        </Typography>
      </div>
    </div>
  );
};
