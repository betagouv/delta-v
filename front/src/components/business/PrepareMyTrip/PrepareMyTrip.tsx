import React, { useState } from 'react';

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

  return (
    <Accordions
      items={[
        ...PrepareMyDocuments,
        ...WhenDeclare,
        ...Buying(props),
        ...ParticularGoods,
        ...ForbiddenGoods,
        ...Money,
      ]}
      currentOpenId={currentOpenId}
      setOpenId={(id: string) => setCurrentOpenId(id)}
    />
  );
};
