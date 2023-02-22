import React from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { Typography } from '@/components/common/Typography';

require('dayjs/locale/fr');

dayjs.locale('fr');

type ActualityCardSize = 'small' | 'medium' | 'large';

export type ActualityCardProps = {
  title: string;
  creationDate: Date;
  content: string;
  tag?: string;
  variant?: ActualityCardSize;
  highlight?: string;
};

export const ActualityCard = ({
  variant = 'medium',
  title,
  creationDate,
  content,
  tag,
  highlight,
}: ActualityCardProps) => {
  const setMaxTextLength = () => {
    switch (variant) {
      case 'small':
        return 70;
      case 'medium':
        return 170;
      case 'large':
        return 170;
      default:
        return 100;
    }
  };

  const maxTextLength = setMaxTextLength();

  const getValueOrEmpty = (text: string) => {
    if (!text) {
      return '';
    }
    return text;
  };

  const splitDescription = (text: string) => {
    const sliceDescription = getValueOrEmpty(text).slice(0, maxTextLength);
    const lastSpacePosition = sliceDescription.lastIndexOf(' ');
    if (getValueOrEmpty(text).length > maxTextLength) {
      return `${getValueOrEmpty(text).slice(0, lastSpacePosition)}...`;
    }
    return text;
  };

  const splitContent = splitDescription(content);
  return (
    <div
      className={cs('grid rounded-xl bg-gray-100 p-[20px]', [
        variant === 'small' && 'grid-rows-[20px_35px_1fr] w-[288px] h-[132px]',
        variant === 'medium' && 'grid-rows-[20px_35px_1fr] w-[288px] h-[187px]',
        variant === 'large' && 'grid-rows-[30px_35px_28px_1fr] w-[370px] h-[206px]',
      ])}
    >
      <div className="grid h-full w-full grid-cols-2">
        {[
          variant !== 'large' && (
            <Typography color="middle-gray" size="text-xs">
              {tag}
            </Typography>
          ),
          variant === 'large' && (
            <span>
              <Typography color="black" size="text-sm">
                {highlight}
              </Typography>
            </span>
          ),
        ]}
        <span>
          <Typography color="middle-gray" size="text-xs" textPosition="text-right">
            {dayjs(creationDate).format('DD/MM/YYYY')}
          </Typography>
        </span>
      </div>
      <Typography
        weight="bold"
        size={variant === 'large' ? 'text-2xl' : 'text-xl'}
        color="black"
        truncate
      >
        {title}
      </Typography>
      {variant === 'large' && (
        <Typography color="middle-gray" size="text-xs">
          {tag}
        </Typography>
      )}

      <Typography lineHeight="leading-tight" variant="paragraph" size="text-sm" color="black">
        {splitContent}
      </Typography>
    </div>
  );
};
