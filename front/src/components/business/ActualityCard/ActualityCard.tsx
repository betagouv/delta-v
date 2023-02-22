import React from 'react';

import dayjs from 'dayjs';

import { Typography } from '@/components/common/Typography';

const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

require('dayjs/locale/fr');

dayjs.locale('fr');

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

const maxTextLength = 150;
const millisecondsLimit = 432000000;

const splitDescription = (text: string) => {
  const sliceDescription = getValueOrEmpty(text).slice(0, maxTextLength);
  const lastSpacePosition = sliceDescription.lastIndexOf(' ');
  if (getValueOrEmpty(text).length > maxTextLength) {
    return `${getValueOrEmpty(text).slice(0, lastSpacePosition)}...`;
  }
  return text;
};

export const ActualityCard = ({ title, creationDate, content }: ActualityCardProps) => {
  const splitContent = splitDescription(content);
  return (
    <div className="grid h-[190px] w-[380px] grid-rows-[25px_40px_1fr] rounded-xl bg-gray-100 px-5 py-3">
      <div className="grid h-full w-full grid-cols-2">
        <span>
          <Typography color="middle-gray" size="text-sm">
            Nomenclature
          </Typography>
        </span>
        <span>
          <Typography color="middle-gray" size="text-sm" textPosition="text-right">
            {[
              new Date().getTime() - creationDate.getTime() < millisecondsLimit &&
                dayjs().to(dayjs(creationDate)),
              new Date().getTime() - creationDate.getTime() >= millisecondsLimit &&
                dayjs(creationDate).format('DD/MM/YYYY'),
            ]}
          </Typography>
        </span>
      </div>
      <Typography weight="bold" size="text-2xl" color="black" ellipsis>
        {title}
      </Typography>
      <span>
        <Typography variant="paragraph" size="text-base" color="black">
          {splitContent}
        </Typography>
      </span>
    </div>
  );
};
