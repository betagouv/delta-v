import React from 'react';

import dayjs from 'dayjs';

import { DataInfoItem } from '../../atoms/DataInfoItem';
import { MeansOfTransport } from '@/stores/declaration/appState.store';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type DeclarationTravelDetailsProps = {
  country: string;
  transport: MeansOfTransport;
  journeyId?: string;
};

export const DeclarationTravelDetails = ({
  country,
  transport,
  journeyId,
}: DeclarationTravelDetailsProps) => {
  return (
    <div className="grid h-full w-full grid-cols-2 gap-y-4">
      <DataInfoItem
        label="Pays"
        value={country}
        labelSize="text-sm"
        valueSize="text-sm"
        isRequired
      />
      <DataInfoItem label="Transport" value={transport} svgName={transport} isRequired />
      {journeyId && (
        <DataInfoItem
          label="Numero de vol"
          value={journeyId}
          labelSize="text-sm"
          valueSize="text-sm"
        />
      )}
    </div>
  );
};
