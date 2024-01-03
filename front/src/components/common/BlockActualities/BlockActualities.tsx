import React from 'react';

import NextLink from 'next/link';

import { TitleAgent } from '../TitleAgent';
import { Typography } from '../Typography';
import { ActualityResponse } from '@/api/lib/actualities';
import { ActualityCard } from '@/components/business/ActualityCard';

export interface BlockActualitiesProps {
  isLoading?: boolean;
  data?: ActualityResponse[];
}

export const BlockActualities: React.FC<BlockActualitiesProps> = ({
  isLoading,
  data,
}: BlockActualitiesProps) => {
  return (
    <div className="flex flex-col justify-start gap-[30px]">
      <TitleAgent title="Actualités douanières" textPosition="text-left" size="text-3xl" />
      <div className="flex flex-row items-start gap-10">
        {!isLoading &&
          data &&
          data?.map((actuality) => (
            <ActualityCard
              {...actuality}
              key={actuality.id}
              creationDate={actuality.creationDate}
              content={actuality.content}
              tags={actuality.tags}
            />
          ))}
      </div>
      <div className="flex justify-center">
        <NextLink href="/agent/actualites">
          <div className="flex flex-row items-center gap-2 border border-primary-600 py-2 px-9 rounded-full">
            <Typography size="text-2xs" color="primary">
              Voir plus
            </Typography>
          </div>
        </NextLink>
      </div>
    </div>
  );
};
