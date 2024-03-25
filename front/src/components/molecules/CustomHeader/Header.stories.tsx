import { Meta } from '@storybook/react';

import { CustomHeader } from './CustomHeader';

export default {
  title: 'Components/Molecules/CustomHeader',
  component: CustomHeader,
} as Meta;

export const base = (): JSX.Element => (
  <div className="p-3">
    <p>Simple Header :</p>
    <br />
    <CustomHeader />
    <br />
    <p>With cart :</p>
    <br />
    <CustomHeader withCart />
    <br />
  </div>
);
