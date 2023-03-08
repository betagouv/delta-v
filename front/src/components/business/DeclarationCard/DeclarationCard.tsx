import React from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { DataInfoItem } from '../DataInfoItem';
import { MeansOfTransport } from '@/stores/simulator/appState.store';
import { DeclarationStatus, getDeclarationStatusLabel } from '@/utils/declarationStatus.util';
import { getMeanOfTransport } from '@/utils/meansOfTransport.util';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type DeclarationCardProps = {
  id: string;
  date?: Date;
  firstName: string;
  lastName: string;
  transport: MeansOfTransport;
  status: DeclarationStatus;
};

export const DeclarationCard = ({
  id,
  date,
  firstName,
  lastName,
  transport,
  status,
}: DeclarationCardProps) => {
  const statusLabel = getDeclarationStatusLabel(status);
  const transportLabel = getMeanOfTransport(transport);
  return (
    <div className={cs('grid rounded-xl bg-gray-100 p-4 grid-rows-3 w-72 h-40')}>
      <div className="grid h-full w-full grid-cols-2">
        <DataInfoItem label="N° de quittance" value={id} size="text-xs" />
        <DataInfoItem
          label="Date de création"
          value={dayjs(date).format('DD/MM/YYYY')}
          size="text-xs"
        />
      </div>
      <div className="grid h-full w-full grid-cols-2">
        <DataInfoItem label="NOM Prénom" value={`${lastName} ${firstName}`} size="text-xs" />
        <DataInfoItem label="Moyen de transport" value={transportLabel} size="text-xs" />
      </div>
      <div className="h-full w-full">
        <DataInfoItem label="Statut" value={statusLabel} size="text-xs" />
      </div>
    </div>
  );
};
