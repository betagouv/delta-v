import React from 'react';

import dayjs from 'dayjs';

import { NewDataInfoItem } from '../NewDataInfoItem';
import { Typography } from '@/components/common/Typography';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type DeclarationContactDetailsProps = {
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
};

export const DeclarationContactDetails = ({
  firstName,
  lastName,
  age,
  phoneNumber,
  email,
  address,
  postalCode,
  city,
}: DeclarationContactDetailsProps) => {
  return (
    <div className="flex flex-col bg-secondary-bg px-4 py-7 gap-[30px] md:px-10">
      <Typography size="text-base" weight="bold" color="black">
        Coordonnées
      </Typography>
      <div className="flex flex-col gap-[30px] w-[228px] md:flex-row md:gap-4 md:w-full">
        <NewDataInfoItem label="Nom" value={lastName} />
        <NewDataInfoItem label="Prénom" value={firstName} />
      </div>
      <NewDataInfoItem label="Adresse" value={address} />
      <div className="grid gap-[30px] md:grid-cols-[152px_1fr] md:gap-4">
        <div className="w-[152px]">
          <NewDataInfoItem label="Code Postal" value={postalCode} />
        </div>
        <div className="w-[223px] md:w-full">
          <NewDataInfoItem label="Ville" value={city} />
        </div>
      </div>
      <div className="px-5 py-3 bg-white text-black rounded-full mt-[6px] flex flex-row justify-between w-[300px] md:w-[251px] items-center">
        <Typography
          color="black"
          size="text-sm"
          weight="normal"
          lineHeight="leading-none"
          desktopSize="text-xs"
        >
          L’usager a-t-il plus de 18 ans ?
        </Typography>
        <Typography size="text-sm" weight="bold" lineHeight="leading-none" desktopSize="text-xs">
          {age >= 18 ? 'Oui' : 'Non'}
        </Typography>
      </div>
      <div className="w-full md:w-[340px]">
        <NewDataInfoItem label="Adresse Mail" value={email} />
      </div>
      <div className="w-[152px] md:w-[230px]">
        <NewDataInfoItem label="Numéro de téléphone" value={phoneNumber} />
      </div>
    </div>
  );
};
