import { Meta } from '@storybook/react';

import { QrcodeBlock } from './QrcodeBlock';
import { MeansOfTransport, SimulatorRequest } from '@/stores/simulator/appState.store';

export default {
  title: 'Components/Business/QrcodeBlock',
  component: QrcodeBlock,
} as Meta;

const simulatorRequest: SimulatorRequest = {
  age: 25,
  border: false,
  country: 'NA',
  meanOfTransport: MeansOfTransport.PLANE,
  shoppingProducts: [],
};
export const base = (): JSX.Element => (
  <div className="p-3">
    <br />
    <QrcodeBlock simulatorRequest={simulatorRequest} />
    <br />
  </div>
);
