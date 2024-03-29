import React from 'react';

import { render } from '@testing-library/react';

import { QrCodeScanner } from './QrCodeScanner';

describe('QrCodeScanner', () => {
  const onStartCamera = jest.fn();
  const onStopCamera = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render QR code scanner', async () => {
    const wrapper = render(<QrCodeScanner startCamera={onStartCamera} stopCamera={onStopCamera} />);
    const video = wrapper.container.querySelector('#qr-reader-video');

    expect(video).toBeVisible();
  });
});
