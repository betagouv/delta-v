import { Meta } from '@storybook/react';

import { BackButtonWithTitle } from './BackButtonWithTitle';

export default {
  title: 'Components/Atoms/BackButtonWithTitle',
  component: BackButtonWithTitle,
} as Meta;

export const base = (): JSX.Element => (
  <div className="p-3">
    <BackButtonWithTitle title="Quittance" />
    <br />
  </div>
);
