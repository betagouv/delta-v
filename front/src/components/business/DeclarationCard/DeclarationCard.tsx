import React, { useEffect, useRef } from 'react';

import dayjs from 'dayjs';

import { DataInfoItem } from '../DataInfoItem';
import { DeclarationBadgeStatus } from '../DeclarationBadgeStatus';
import { Button } from '@/components/common/Button';
import { MeansOfTransport } from '@/stores/simulator/appState.store';
import clsxm from '@/utils/clsxm';
import { DeclarationStatus } from '@/utils/declarationStatus.util';
import { getMeanOfTransport } from '@/utils/meansOfTransport.util';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type DeclarationCardProps = {
  id: string;
  publicId: string;
  date?: Date;
  firstName: string;
  lastName: string;
  transport: MeansOfTransport;
  status: DeclarationStatus;
  onClick: (id: string) => void;
  verificationButton?: boolean;
  verificationLink?: string;
  newLimit?: () => void;
  isLast?: boolean;
  responsive?: boolean;
};

export const DeclarationCard = ({
  id,
  publicId,
  date,
  firstName,
  lastName,
  transport,
  status,
  onClick,
  verificationButton,
  newLimit,
  isLast,
  responsive = false,
}: DeclarationCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry?.isIntersecting) {
        if (newLimit) newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  const transportLabel = getMeanOfTransport(transport);
  return (
    <div
      className="flex flex-col rounded-xl border border-gray-300 p-5 cursor-pointer"
      ref={cardRef}
      onClick={() => onClick(id)}
    >
      {verificationButton && (
        <span className="pb-2">
          <Button variant="outlined" color="card" size="2xs">
            Mes vérifications
          </Button>
        </span>
      )}
      <div
        className={clsxm({
          'grid w-full mb-4': true,
          'grid-cols-2': !responsive,
          'lg:grid-cols-2 ': responsive,
        })}
      >
        <DataInfoItem
          label="Numéro de déclaration"
          value={`${publicId.slice(0, 10)} ${publicId.slice(10)}`}
          labelSize="text-2xs"
          valueSize="text-sm"
        />
        <div
          className={clsxm({
            'flex lg:place-content-end': true,
            'flex-row-reverse': !responsive,
            'mt-4 lg:mt-0': responsive,
          })}
        >
          <DataInfoItem
            label="Date de déclaration"
            value={dayjs(date).format('DD/MM/YYYY')}
            labelSize="text-2xs"
            valueSize="text-sm"
          />
        </div>
      </div>
      <div
        className={clsxm({
          'grid w-full mb-4': true,
          'grid-cols-2': !responsive,
          'lg:grid-cols-2 ': responsive,
        })}
      >
        <DataInfoItem
          label="Nom Prénom"
          value={`${firstName} ${lastName}`}
          labelSize="text-2xs"
          valueSize="text-sm"
        />
        <div
          className={clsxm({
            'flex lg:place-content-end': true,
            'flex-row-reverse': !responsive,
            'mt-4 lg:mt-0': responsive,
          })}
        >
          <DataInfoItem
            label="Moyen de transport"
            value={transportLabel}
            labelSize="text-2xs"
            valueSize="text-sm"
          />
        </div>
      </div>
      <DataInfoItem
        label="Statut"
        value={
          <div className="pt-1 w-fit">
            <DeclarationBadgeStatus status={status} />
          </div>
        }
        labelSize="text-2xs"
        valueSize="text-sm"
      />
    </div>
  );
};
