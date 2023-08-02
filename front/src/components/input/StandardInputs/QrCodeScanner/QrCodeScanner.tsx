import React, { useEffect, useRef } from 'react';

import { Skeleton } from '@/components/common/Skeleton';

export interface QrCodeScannerOptions {
  onError?: (err: any) => void;
  startCamera: (ref: HTMLVideoElement) => void;
  stopCamera: () => void;
  data?: string;
  scanningStarted?: boolean;
  delay?: number;
  height?: string;
  width?: string;
}
export const QrCodeScanner = ({
  height,
  width,
  startCamera,
  stopCamera,
  data,
  scanningStarted,
}: QrCodeScannerOptions) => {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video.current) {
      startCamera(video.current);
    } else {
      stopCamera();
    }
  }, [video.current]);

  return (
    <>
      {!data && (
        <video
          ref={video}
          width={width}
          height={height}
          className={scanningStarted ? 'border border-black rounded-md' : ''}
          id="qr-reader-video"
        ></video>
      )}
      {!scanningStarted && !data && (
        <div className="relative bottom-[176px] z-10 mb-[-176px]">
          <Skeleton height={height} width={width} />
        </div>
      )}
    </>
  );
};
