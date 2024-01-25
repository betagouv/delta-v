import React, { useEffect, useRef } from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { Typography } from '@/components/common/Typography';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type ActualityCardProps = {
  title: string;
  creationDate: Date;
  content: string;
  tags?: string[];
  newLimit?: () => void;
  isLast?: boolean;
};

export const ActualityCard = ({
  title,
  creationDate,
  content,
  tags,
  newLimit,
  isLast,
}: ActualityCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry?.isIntersecting) {
        if (newLimit) newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  return (
    <div
      className={cs(
        'flex flex-col rounded-xl border border-gray-300 p-5 gap-4 w-full md:min-w-[250px]',
      )}
      ref={cardRef}
    >
      <div className="grid grid-cols-2">
        {tags && (
          <div className="flex flex-row gap-2">
            {tags.map((tag) => (
              <div className="border md:text-2xs text-sm border-secondary-300 rounded-full px-2.5 py-[5px] md:py-0">
                {tag}
              </div>
            ))}
          </div>
        )}
        <Typography
          color="middle-gray"
          size="text-xs"
          desktopSize="text-2xs"
          textPosition="text-right"
        >
          {dayjs(creationDate).format('DD/MM/YYYY')}
        </Typography>
      </div>
      <div className="line-clamp-3 md:line-clamp-2">
        <Typography weight="bold" size="text-xl" desktopSize="md:text-[22px]" color="black">
          {title}
        </Typography>
      </div>
      <div className="line-clamp-4">
        <Typography variant="paragraph" size="text-sm" desktopSize="text-xs" color="black">
          {content}
        </Typography>
      </div>
    </div>
  );
};
