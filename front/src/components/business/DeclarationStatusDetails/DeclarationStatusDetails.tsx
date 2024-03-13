import React from 'react';

import dayjs from 'dayjs';

import { DeclarationBadgeStatus } from '../DeclarationBadgeStatus';
import { Typography } from '@/components/common/Typography';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type DeclarationStatusDetailsProps = {
  status: DeclarationStatus;
  declarationId: string;
  date: Date;
};

export const DeclarationStatusDetails = ({
  status,
  declarationId,
  date,
}: DeclarationStatusDetailsProps) => {
  return (
    <div className="flex flex-col px-4 mb-6 md:px-10 md:pt-10 md:mb-[30px]">
      <div className="grid grid-cols-2 ">
        <div className="grid grid-rows-2 gap-5">
          <div className="flex flex-col gap-[6px]">
            <Typography
              size="text-3xs"
              color="light-gray"
              transform="uppercase"
              lineHeight="leading-none"
            >
              Numéro de déclaration
            </Typography>
            <Typography
              size="text-lg"
              desktopSize="md:text-[26px]"
              weight="bold"
              lineHeight="leading-none"
            >
              {declarationId.slice(0, 10)}
            </Typography>
          </div>
          <div className="flex flex-col gap-[6px] ">
            <Typography
              size="text-3xs"
              color="light-gray"
              transform="uppercase"
              lineHeight="leading-none"
            >
              Statut
            </Typography>
            <DeclarationBadgeStatus status={status} />
          </div>
        </div>
        <div className="grid grid-rows-2 gap-5 ">
          <div className="hidden md:block" />
          <div className="flex flex-col gap-[6px] justify-self-end md:justify-self-start md:pl-9">
            <Typography
              size="text-3xs"
              color="light-gray"
              transform="uppercase"
              lineHeight="leading-none"
            >
              Date de la déclaration
            </Typography>
            <Typography size="text-2xs" color="black" lineHeight="leading-none">
              {dayjs(date).format('DD/MM/YYYY')}
            </Typography>
          </div>
          <div className="md:hidden block" />
        </div>
      </div>
    </div>
  );
};
