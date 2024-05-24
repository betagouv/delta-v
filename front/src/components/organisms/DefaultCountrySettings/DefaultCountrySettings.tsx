import React from 'react';

import { RemoveCountryButton } from '../RemoveCountryButton';
import { Typography } from '@/components/atoms/Typography';
import { Switch } from '@/components/molecules/Switch';

interface DefaultCountrySettingsProps {
  defaultCountryLabel?: string;
  onOpenRemoveDefaultModal: () => void;
  onOpenSelectCountryModal: () => void;
  onShowSetDefaultCountry: () => void;
  onHideSetDefaultCountry: () => void;
  displaySetDefaultCountry: boolean;
}

export const DefaultCountrySettings = ({
  defaultCountryLabel,
  onOpenRemoveDefaultModal,
  onOpenSelectCountryModal,
  displaySetDefaultCountry,
  onShowSetDefaultCountry,
  onHideSetDefaultCountry,
}: DefaultCountrySettingsProps) => {
  return (
    <section className="my-auto h-3/4 flex flex-col w-full ">
      <Typography color="black" desktopSize="text-sm" size="text-sm">
        Pays de provenance par défaut :
      </Typography>
      <div className="flex items-center justify-between h-16">
        {defaultCountryLabel ? (
          <RemoveCountryButton
            countryLabel={defaultCountryLabel}
            isDefaultCountry
            onClick={onOpenRemoveDefaultModal}
          />
        ) : (
          <Typography desktopSize="text-xs" size="text-xs" color="middle-gray" italic>
            Pas de pays par défaut
          </Typography>
        )}
        <div className="flex cursor-pointer w-fit" onClick={onOpenSelectCountryModal}>
          <Typography
            desktopSize="text-xs"
            size="text-xs"
            weight="bold"
            color="primary"
            colorGradient="400"
            underline
          >
            {defaultCountryLabel ? 'Modifier' : 'Ajouter'}
          </Typography>
        </div>
      </div>
      <div className="flex items-center justify-between h-16 md:pt-0 pt-10">
        <Typography color="black" desktopSize="text-sm" size="text-sm">
          Pop in de sélection de pays par défaut
        </Typography>
        <div className="relative flex flex-col justify-center items-center gap-1 md:-right-5">
          <Switch
            leftLabel="Active"
            rightLabel="Off"
            active={displaySetDefaultCountry ? 'left' : 'right'}
            onLeftToggle={onShowSetDefaultCountry}
            onRightToggle={onHideSetDefaultCountry}
          />
        </div>
      </div>
    </section>
  );
};
