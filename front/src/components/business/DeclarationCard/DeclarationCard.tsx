import React from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { DeclarationStatus, setDeclarationStatusLabel } from '../DeclarationBadgeStatus';
import { Typography } from '@/components/common/Typography';
import { MeansOfTransport } from '@/stores/simulator/appState.store';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type DeclarationCardProps = {
  id?: string;
  date?: Date;
  firstName?: string;
  lastName?: string;
  transport: MeansOfTransport;
  status: DeclarationStatus;
};

export const setMeansOfTransportLabel = (transport: MeansOfTransport): string => {
  switch (transport) {
    case MeansOfTransport.BOAT:
      return 'Bateau';
    case MeansOfTransport.CAR:
      return 'Voiture';
    case MeansOfTransport.PLANE:
      return 'Avion';
    case MeansOfTransport.TRAIN:
      return 'Train';
    case MeansOfTransport.OTHER:
      return 'Autre';
    default:
      return '';
  }
};

export const DeclarationCard = ({
  id,
  date,
  firstName,
  lastName,
  transport,
  status,
}: DeclarationCardProps) => {
  const statusLabel = setDeclarationStatusLabel(status);
  const transportLabel = setMeansOfTransportLabel(transport);
  return (
    <div className={cs('grid rounded-xl bg-gray-100 p-5 grid-rows-3 w-72 h-40')}>
      <div className="grid h-full w-full grid-cols-2 grid-rows-[0.4fr_0.6fr]">
        <Typography color="middle-gray" size="text-2xs" weight="bold">
          Numéro de quittance
        </Typography>
        <Typography color="middle-gray" size="text-2xs" weight="bold">
          Date de création
        </Typography>
        <Typography color="black" size="text-xs">
          {id}
        </Typography>
        <Typography color="black" size="text-xs">
          {dayjs(date).format('DD/MM/YYYY')}
        </Typography>
      </div>
      <div className="grid h-full w-full grid-cols-2 grid-rows-[0.4fr_0.6fr]">
        <Typography color="middle-gray" size="text-2xs" weight="bold">
          Nom Prénom
        </Typography>
        <Typography color="middle-gray" size="text-2xs" weight="bold">
          Moyen de transport
        </Typography>
        <Typography color="black" size="text-xs" truncate>
          {lastName} {firstName}
        </Typography>
        <Typography color="black" size="text-xs">
          {transportLabel}
        </Typography>
      </div>
      <div className="grid h-full w-full grid-rows-[0.4fr_0.6fr]">
        <Typography color="middle-gray" size="text-2xs" weight="bold">
          Statut
        </Typography>
        <Typography color="black" size="text-xs">
          {statusLabel}
        </Typography>
      </div>
    </div>
  );
};
