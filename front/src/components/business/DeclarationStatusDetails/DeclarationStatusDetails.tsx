import React from 'react';

import dayjs from 'dayjs';

import { DataInfoItem } from '../DataInfoItem';
import { DeclarationStatus, getDeclarationStatusLabel } from '@/utils/declarationStatus.util';

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
    <div>
      <div className="grid h-full w-full grid-cols-2">
        <DataInfoItem
          label="Numéro de quittance"
          value={`${declarationId.slice(0, 10)} ${declarationId.slice(10, declarationId.length)}`}
          size="text-sm"
        />
        <DataInfoItem
          label="Date de déclaration"
          value={dayjs(date).format('DD/MM/YYYY')}
          size="text-sm"
        />
        <DataInfoItem
          label="Status"
          value={getDeclarationStatusLabel(status)}
          size="text-sm"
          isBold
        />
      </div>
    </div>
  );
};
