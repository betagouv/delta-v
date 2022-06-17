import { Meta } from '@storybook/react';

import { Header } from './Header';

export default {
  title: 'Components/Business/Header',
  component: Header,
} as Meta;

export const base = (): JSX.Element => (
  <div className="p-3">
    <p>Simple Header :</p>
    <br />
    <Header />
    <br />
    <p>With cart :</p>
    <br />
    <Header withCart />
    <br />
  </div>
);
