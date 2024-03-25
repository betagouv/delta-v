import { Meta } from '@storybook/react';

import { TitleHeaderAgent } from './TitleHeaderAgent';

export default {
  title: 'Components/Common/TitleHeaderAgent',
  component: TitleHeaderAgent,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Basic TitleHeaderAgent horizontal :</p>
    <TitleHeaderAgent title="Simuler mes achats" />
    <br />
  </div>
);
