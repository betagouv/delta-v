import React, { useRef } from 'react';

import ReactToPrint from 'react-to-print';

import { SummarySimulator } from '../summarySimulator';
import { SvgIcon } from '@/components/common/SvgIcon';
import { SimulatorRequest, SimulatorResponse } from '@/stores/simulator/appState.store';

interface SummarySimulatorProps {
  simulatorRequest: SimulatorRequest;
  simulatorResponse?: SimulatorResponse;
  qrCodeVersion?: boolean;
}

export const SummaryExport: React.FC<SummarySimulatorProps> = ({
  simulatorRequest,
  simulatorResponse,
  qrCodeVersion = false,
}: SummarySimulatorProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const nbAmountProducts = simulatorResponse?.amountProducts?.length ?? 0;
  const nbValueProducts = simulatorResponse?.valueProducts?.length ?? 0;
  const baseHeight = 100 + (nbAmountProducts > 0 ? 20 : 0) + (nbValueProducts > 0 ? 20 : 0);
  const height = baseHeight + (nbAmountProducts + nbValueProducts) * 28;
  const pageStyle = `
  @page {
    size: 100mm ${height}mm;
    margin: 16px;
  }
`;

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <div className="mx-4 h-7 w-7">
            <SvgIcon name="download" />
          </div>
        )}
        content={() => componentRef.current}
        pageStyle={pageStyle}
      />
      <div className="hidden">
        <div ref={componentRef} className="p-0">
          <SummarySimulator
            simulatorRequest={simulatorRequest}
            simulatorResponse={simulatorResponse}
            qrCodeVersion={qrCodeVersion}
            hideDetails
          />
        </div>
      </div>
    </>
  );
};
