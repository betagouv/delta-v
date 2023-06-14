import React from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { Button } from '@/components/common/Button';
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
        'grid grid-rows-[20px_35px_1fr] rounded-xl border border-gray-300 px-5 py-4 gap-2',
      )}
    >
      <div className="grid h-full w-full grid-cols-2 pb-4">
        {tag && (
          <Button variant="outlined" color="card" size="2xs">
            {tag}
          </Button>
        )}
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
