import React from 'react';

import { render } from '@testing-library/react';

import { QrCodeScanner } from './QrCodeScanner';

describe('QrCodeScanner', () => {
  const onScanMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render QR code scanner', async () => {
    const wrapper = render(<QrCodeScanner onScan={onScanMock} />);
    const video = wrapper.container.querySelector('#qr-reader-video');

    expect(video).toBeVisible();
  });
});
