import React, { useRef } from 'react';

import ReactToPrint from 'react-to-print';

import { SummaryDeclaration } from '../SummaryDeclaration/SummaryDeclaration';
import { Button } from '@/components/common/Button';
import { DeclarationResponse } from '@/stores/declaration/appState.store';

interface SummaryDeclarationProps {
  declarationResponse: DeclarationResponse;
  qrCodeVersion?: boolean;
}

export const SummaryDeclarationExport: React.FC<SummaryDeclarationProps> = ({
  declarationResponse,
  qrCodeVersion = false,
}: SummaryDeclarationProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const nbProducts = declarationResponse?.products?.length ?? 0;
  const baseHeight = 100 + (nbProducts > 0 ? 20 : 0) + (nbProducts > 0 ? 20 : 0);
  const height = baseHeight + nbProducts * 28;
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
          <div className="mt-2">
            <Button fullWidth>Enregistrer la déclaration</Button>
          </div>
        )}
        content={() => componentRef.current}
        pageStyle={pageStyle}
      />
      <div className="hidden">
        <div ref={componentRef} className="p-0">
          <SummaryDeclaration
            declarationResponse={declarationResponse}
            qrCodeVersion={qrCodeVersion}
            hideDetails
          />
        </div>
      </div>
    </>
  );
};
