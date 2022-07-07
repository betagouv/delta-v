import { Meta } from '@storybook/react';

import { UnderConstruction } from './UnderConstruction';

export default {
  title: 'Components/Business/UnderConstruction',
  component: UnderConstruction,
} as Meta;

export const base = (): JSX.Element => (
  <div className="p-3">
    <br />
    <UnderConstruction />
    <br />
  </div>
);
