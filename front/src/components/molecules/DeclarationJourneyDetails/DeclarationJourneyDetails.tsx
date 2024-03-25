import React from 'react';

import dayjs from 'dayjs';

import { NewDataInfoItem } from '../NewDataInfoItem';
import { Typography } from '@/components/atoms/Typography';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type DeclarationJourneyDetailsProps = {
  country: string;
  transport: string;
  journeyId?: string;
};

export const DeclarationJourneyDetails = ({
  country,
  transport,
  journeyId,
}: DeclarationJourneyDetailsProps) => {
  return (
    <div className="flex flex-col bg-secondary-bg px-4 py-7 gap-[30px] md:px-10">
      <Typography size="text-base" weight="bold" color="black">
        Transport
      </Typography>
      <div className="grid grid-cols-2 gap-[30px]">
        <div className="flex flex-col gap-4">
          <NewDataInfoItem label="Pays d'achat" value={country} />
          {journeyId && <NewDataInfoItem label="Numéro de vol" value={journeyId} />}
        </div>
        <NewDataInfoItem label="Moyen de transport" value={transport} />
      </div>
    </div>
  );
};
