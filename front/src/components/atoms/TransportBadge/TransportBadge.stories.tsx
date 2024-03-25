import { Meta } from '@storybook/react';

import { TransportBadge } from './TransportBadge';

export default {
  title: 'Components/Atoms/TransportBadge',
  component: TransportBadge,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Basic TransportBadge horizontal :</p>
    <br />
    <TransportBadge svgName="luggages" />
    <br />
    <p>Basic TransportBadge horizontal with click :</p>
    <br />
    <TransportBadge
      svgName="train"
      // eslint-disable-next-line no-alert
      onClick={() => alert('clicked')}
    />
  </div>
);
