import React from 'react';

import { getEmojiFlag } from 'countries-list';
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
    <div className="flex flex-col bg-secondary-bg px-4 py-7 gap-4">
      <Typography size="text-base" weight="bold" color="black">
        Coordonnées
      </Typography>
      <NewDataInfoItem label="NOM" value={lastName} />
      <NewDataInfoItem label="Prénom" value={firstName} />
      <NewDataInfoItem label="Àge" value={age.toString()} />
      <NewDataInfoItem label="Mail" value={email} />
      <NewDataInfoItem label="Numéro de téléphone" value={phoneNumber} />
      <NewDataInfoItem label="Adresse" value={address} />
      <NewDataInfoItem label="Code Postal" value={postalCode} />
      <NewDataInfoItem label="Ville" value={city} />
      <NewDataInfoItem label="Pays" value={`${getEmojiFlag('FR')} France`} />
    </div>
  );
};
