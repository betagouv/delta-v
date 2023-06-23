import React, { useEffect, useRef } from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { DataInfoItem } from '../DataInfoItem';
import { DeclarationBadgeStatus } from '../DeclarationBadgeStatus';
import { Button } from '@/components/common/Button';
import { MeansOfTransport } from '@/stores/simulator/appState.store';
import { DeclarationStatus } from '@/utils/declarationStatus.util';
import { getMeanOfTransport } from '@/utils/meansOfTransport.util';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type DeclarationCardProps = {
  id: string;
  date?: Date;
  firstName: string;
  lastName: string;
  transport: MeansOfTransport;
  status: DeclarationStatus;
  verificationButton?: boolean;
  verificationLink?: string;
  newLimit?: () => void;
  isLast?: boolean;
};

export const DeclarationCard = ({
  id,
  date,
  firstName,
  lastName,
  transport,
  status,
  verificationButton,
  newLimit,
  isLast,
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
      className={cs({
        'flex flex-col rounded-xl border border-gray-300 px-5 py-4 gap-1': true,
      })}
      ref={cardRef}
    >
      {verificationButton && (
        <span className="pb-1.5">
          <Button variant="outlined" color="card" size="2xs">
            Mes vérifications
          </Button>
        </span>
      )}
      <div className="grid w-full grid-cols-2">
        <DataInfoItem
          label="Numéro de déclaration"
          value={`${id.slice(0, 10)} ${id.slice(10)}`}
          labelSize="text-2xs"
          valueSize="text-sm"
        />
        <DataInfoItem
          label="Date de déclaration"
          value={dayjs(date).format('DD/MM/YYYY')}
          labelSize="text-2xs"
          valueSize="text-sm"
        />
      </div>
      <div className="grid w-full grid-cols-2">
        <DataInfoItem
          label="Nom Prénom"
          value={`${firstName} ${lastName}`}
          labelSize="text-2xs"
          valueSize="text-sm"
        />
        <DataInfoItem
          label="Moyen de transport"
          value={transportLabel}
          labelSize="text-2xs"
          valueSize="text-sm"
        />
      </div>
      <DataInfoItem
        label="Statut"
        value={<DeclarationBadgeStatus status={status} />}
        labelSize="text-2xs"
        valueSize="text-sm"
      />
    </div>
  );
};
