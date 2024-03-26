import React, { useRef } from 'react';

import ReactToPrint from 'react-to-print';

import { SummaryDeclaration } from './SummaryDeclaration';
import { Button } from '@/components/atoms/Button';
import { DeclarationResponse } from '@/stores/declaration/appState.store';

interface SummaryDeclarationProps {
  declarationResponse: DeclarationResponse;
}

export const SummaryDeclarationExport: React.FC<SummaryDeclarationProps> = ({
  declarationResponse,
}: SummaryDeclarationProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const pageStyle = `
  @page {
    size: 2.5in 4in
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
        <div ref={componentRef} className="p-4 m-auto">
          <SummaryDeclaration declarationResponse={declarationResponse} />
        </div>
      </div>
    </>
  );
};
