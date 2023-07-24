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
    <div className="flex flex-col gap-5">
      <div className="grid h-full w-full grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Typography
            size="text-3xs"
            color="light-gray"
            transform="uppercase"
            lineHeight="leading-none"
          >
            Numéro de déclaration
          </Typography>
          <Typography size="text-lg" weight="bold" lineHeight="leading-none">
            {declarationId.slice(0, 10)}
          </Typography>
        </div>
        <div className="flex flex-col gap-1.5">
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
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography
          size="text-3xs"
          color="light-gray"
          transform="uppercase"
          lineHeight="leading-none"
        >
          Status
        </Typography>
        <DeclarationBadgeStatus status={status} />
      </div>
    </div>
  );
};
