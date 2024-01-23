import React from 'react';

import NextLink from 'next/link';

import { TitleAgent } from '../TitleAgent';
import { Typography } from '../Typography';
import { ActualityResponse } from '@/api/lib/actualities';
import { ActualityCard } from '@/components/business/ActualityCard';

export interface BlockActualitiesProps {
  isLoading?: boolean;
  actualities?: ActualityResponse[];
}

export const BlockActualities: React.FC<BlockActualitiesProps> = ({
  isLoading,
  actualities,
}: BlockActualitiesProps) => {
  return (
    <div className="flex flex-col justify-start gap-[30px]">
      <TitleAgent
        title="Actualités douanières"
        textPosition="text-left"
        size="text-3xl"
        fontFamily="marianne"
      />
      {!isLoading && actualities && actualities.length > 0 ? (
        <>
          <div className="grid-cols-3 grid items-start gap-10">
            {actualities &&
              actualities?.map((actuality) => (
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
        </>
      ) : (
        <Typography size="text-xs" color="light-gray" italic>
          Pas d’actualité
        </Typography>
      )}
    </div>
  );
};
