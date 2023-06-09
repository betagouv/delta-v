import React from 'react';

import dayjs from 'dayjs';

import { DataInfoItem } from '../DataInfoItem';

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
    <div>
      <div className="grid h-full w-full grid-cols-2">
        <DataInfoItem label="NOM" value={lastName} size="text-sm" isRequired />
        <DataInfoItem label="Prénom" value={firstName} size="text-sm" isRequired />
      </div>
      <div className="flex flex-col justify-start gap-4 mt-4">
        <DataInfoItem label="Àge" value={age.toString()} size="text-sm" isRequired />
        <DataInfoItem label="Mail" value={email} size="text-sm" />
        <DataInfoItem label="Numéro de téléphone" value={phoneNumber} size="text-sm" />
        <DataInfoItem label="Adresse" value={address} size="text-sm" isRequired />
      </div>
      <div className="grid h-full w-full grid-cols-2 mt-4 gap-y-4">
        <DataInfoItem label="Code Postal" value={postalCode} size="text-sm" isRequired />
        <DataInfoItem label="Ville" value={city} size="text-sm" isRequired />
        <DataInfoItem label="Pays" value={'🇫🇷 France'} size="text-sm" isRequired />
      </div>
    </div>
  );
};
