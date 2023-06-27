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
    <div className={cs('flex flex-col rounded-xl border border-gray-300 p-5 gap-4 w-72 md:w-80')}>
      <div className="grid grid-cols-2">
        {tag && (
          <Button variant="outlined" color="card" size="2xs">
            {tag}
          </Button>
        )}
        <Typography color="middle-gray" size="text-2xs" textPosition="text-right">
          {dayjs(creationDate).format('DD/MM/YYYY')}
        </Typography>
      </div>
      <div className="line-clamp-3 md:line-clamp-2">
        <Typography weight="bold" size="text-xl" color="black">
          {title}
        </Typography>
      </div>
      <div className="line-clamp-4">
        <Typography variant="paragraph" size="text-sm" color="black">
          {content}
        </Typography>
      </div>
    </div>
  );
};
