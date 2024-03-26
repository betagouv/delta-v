import React, { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { scroller } from 'react-scroll';

import { Accordions } from '@/components/atoms/Accordion';
import { useStore } from '@/stores/store';
import { CountryType } from '@/utils/country.util';

export interface PrepareMyTripProps {
  countryType: CountryType;
  border: boolean;
  linkId?: string;
}

export const PrepareMyTrip: React.FC<PrepareMyTripProps> = (props: PrepareMyTripProps) => {
  const [currentOpenId, setCurrentOpenId] = useState<string | undefined>(props.linkId);
  const { trackEvent } = useMatomo();
  const { getPrepareMyTripData } = useStore((state) => ({
    getPrepareMyTripData: state.getPrepareMyTripData,
  }));

  const prepareMyTripData = getPrepareMyTripData(props);

  useEffect(() => {
    if (props.linkId) {
      setCurrentOpenId(props.linkId);

      scroller.scrollTo(props.linkId, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
  }, [props.linkId]);

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
