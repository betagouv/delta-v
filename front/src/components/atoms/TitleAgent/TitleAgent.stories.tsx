import { Meta } from '@storybook/react';

import { TitleAgent } from './TitleAgent';

export default {
  title: 'Components/Atoms/TitleAgent',
  component: TitleAgent,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Basic TitleAgent horizontal :</p>
    <TitleAgent title="Simuler mes achats" />
    <br />
  </div>
);
