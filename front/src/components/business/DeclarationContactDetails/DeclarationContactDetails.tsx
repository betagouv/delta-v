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
    <div className="flex flex-col bg-secondary-bg px-4 py-7">
      <Typography size="text-base" weight="bold" color="black">
        Coordonnées
      </Typography>
      <div className="mt-[30px] selection:flex flex-row gap-4 w-full">
        <NewDataInfoItem label="Nom" value={lastName} />
        <NewDataInfoItem label="Prénom" value={firstName} />
      </div>
      <div className="mt-[30px]">
        <NewDataInfoItem label="Adresse" value={address} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <NewDataInfoItem label="Code Postal" value={postalCode} />
        <NewDataInfoItem label="Ville" value={city} />
      </div>
      <div className="mt-[30px]">
        <div className="flex flex-col flex-1">
          <div className="px-5 py-3 bg-white text-black rounded-full mt-[6px] flex flex-row justify-between w-[281px] items-center">
            <Typography color="black" size="text-xs" weight="normal" lineHeight="leading-none">
              L’usager a-t-il plus de 18 ans ?
            </Typography>
            <Typography size="text-sm" weight="normal" lineHeight="leading-none">
              {age >= 18 ? 'Oui' : 'Non'}
            </Typography>
          </div>
        </div>
      </div>
      <div className="mt-[30px]">
        <NewDataInfoItem label="Adresse Mail" value={email} />
      </div>
      <div className="mt-[30px]">
        <NewDataInfoItem label="Numéro de téléphone" value={phoneNumber} />
      </div>
    </div>
  );
};
