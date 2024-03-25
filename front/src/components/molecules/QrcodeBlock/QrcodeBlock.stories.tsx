import { Meta } from '@storybook/react';

import { QrcodeBlock } from './QrcodeBlock';

export default {
  title: 'Components/Molecules/QrcodeBlock',
  component: QrcodeBlock,
} as Meta;

export const base = (): JSX.Element => (
  <div className="p-3">
    <br />
    <QrcodeBlock />
    <br />
  </div>
);
