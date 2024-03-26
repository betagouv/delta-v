import React from 'react';

import { QRCodeSVG } from 'qrcode.react';

import { Typography } from '@/components/atoms/Typography';

interface SummarySimulatorProps {}

export const QrcodeBlock: React.FC<SummarySimulatorProps> = () => {
  return (
    <div className="flex flex-row rounded-xl border border-secondary-600 p-4">
      <div className="h-16 w-16">
        <QRCodeSVG value="https://www.douane.gouv.fr/" size={64} />
      </div>
      <div className="ml-4 flex flex-col gap-2">
        <Typography color="secondary" weight="bold">
          Mon récapitulatif
        </Typography>
        <Typography color="secondary" lineHeight="leading-tight">
          Générer le QR code <br />
          pour vérification
        </Typography>
      </div>
    </div>
  );
};
