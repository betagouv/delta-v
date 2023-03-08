import React from 'react';

import { QrReader } from 'react-qr-reader';

export interface QrCodeScannerOptions {
  onScan: (data: any) => void;
  onError?: (err: any) => void;
  delay?: number;
  height?: string;
  width?: string;
}
export const QrCodeScanner = ({ onScan, height, width }: QrCodeScannerOptions) => {
  return (
    <QrReader
      constraints={{ facingMode: 'environment' }}
      onResult={(result) => {
        if (result) {
          onScan(result.getText());
        }
      }}
      videoStyle={{
        height,
        width,
        border: '1px solid #000',
        borderRadius: '10px',
      }}
      containerStyle={{
        height,
      }}
      videoId="qr-reader-video"
    />
  );
};
