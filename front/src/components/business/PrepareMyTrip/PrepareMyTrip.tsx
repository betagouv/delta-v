import React, { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';

import { Buying } from './PrepareMyTripData/Buying';
import { ForbiddenGoods } from './PrepareMyTripData/ForbiddenGoods';
import { Money } from './PrepareMyTripData/Money';
import { ParticularGoods } from './PrepareMyTripData/ParticularGoods';
import { PrepareMyDocuments } from './PrepareMyTripData/PrepareMyDocuments';
import { WhenDeclare } from './PrepareMyTripData/WhenDeclare';
import { Accordions } from '@/components/common/Accordion';
import { CountryType } from '@/utils/country.util';

export interface PrepareMyTripProps {
  countryType: CountryType;
  border: boolean;
}

export const PrepareMyTrip: React.FC<PrepareMyTripProps> = (props: PrepareMyTripProps) => {
  const [currentOpenId, setCurrentOpenId] = useState<string | undefined>();
  const { trackEvent } = useMatomo();

  const prepareMyTripData = [
    ...PrepareMyDocuments,
    ...WhenDeclare,
    ...Buying(props),
    ...ParticularGoods,
    ...ForbiddenGoods,
    ...Money,
  ];

  useEffect(() => {
    if (currentOpenId) {
      prepareMyTripData.forEach((data) => {
        if (data.id === currentOpenId) {
          trackEvent({
            category: 'user-action',
            action: 'open-prepare-my-trip',
            name: data.question,
          });
        }
      });
    }
  }, [currentOpenId]);
  return (
    <Accordions
      items={prepareMyTripData}
      currentOpenId={currentOpenId}
      setOpenId={(id: string) => setCurrentOpenId(id)}
    />
  );
};
