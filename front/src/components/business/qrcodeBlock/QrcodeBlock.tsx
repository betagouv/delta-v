import React from 'react';

import { QRCodeSVG } from 'qrcode.react';

import { Typography } from '@/components/common/Typography';
import { SimulatorRequest } from '@/stores/simulator/appState.store';

interface SummarySimulatorProps {
  simulatorRequest: SimulatorRequest;
}

export const QrcodeBlock: React.FC<SummarySimulatorProps> = ({
  simulatorRequest,
}: SummarySimulatorProps) => {
  const simulateDataStringified = JSON.stringify({
    age: simulatorRequest.age,
    meanOfTransport: simulatorRequest.meanOfTransport,
    country: simulatorRequest.country,
    border: simulatorRequest.border,
  });
  return (
    <div className="flex flex-row rounded-xl border border-secondary-600 p-4">
      <div className="h-16">
        <QRCodeSVG value={simulateDataStringified} />
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
