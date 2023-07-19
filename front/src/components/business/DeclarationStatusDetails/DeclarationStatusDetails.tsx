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
    <div className="grid h-full w-full grid-cols-2 gap-y-5">
      <div className="flex flex-col gap-2">
        <Typography size="text-2xs" color="light-gray" transform="uppercase">
          Numéro de déclaration
        </Typography>
        <Typography size="text-lg" weight="bold">
          {declarationId.slice(0, 10)}
        </Typography>
      </div>
      <div className="flex flex-col gap-2">
        <Typography size="text-2xs" color="light-gray" transform="uppercase">
          Date de la déclaration
        </Typography>
        <Typography size="text-sm" color="black">
          {dayjs(date).format('DD/MM/YYYY')}
        </Typography>
      </div>
      <div className="flex flex-col gap-2">
        <Typography size="text-2xs" color="light-gray" transform="uppercase">
          Status
        </Typography>
        <DeclarationBadgeStatus status={status} />
      </div>
    </div>
  );
};
