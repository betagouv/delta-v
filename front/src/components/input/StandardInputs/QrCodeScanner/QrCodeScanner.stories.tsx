import { Meta } from '@storybook/react';

import { QrCodeScanner } from './QrCodeScanner';

export default {
  title: 'Components/Input/StandardInputs/QrCodeScanner',
  component: QrCodeScanner,
} as Meta;

export const base = (): JSX.Element => (
  <div>
    <QrCodeScanner onScan={(data) => console.log(data)} />
  </div>
);
