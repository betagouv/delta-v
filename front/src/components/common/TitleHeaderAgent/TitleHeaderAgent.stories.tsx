import { Meta } from '@storybook/react';

import { TitleHeader } from './TitleHeaderAgent';

export default {
  title: 'Components/Common/TitleHeader',
  component: TitleHeader,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Basic TitleHeader horizontal :</p>
    <TitleHeader title="Simuler mes achats" icon="calculator" />
    <br />
  </div>
);
