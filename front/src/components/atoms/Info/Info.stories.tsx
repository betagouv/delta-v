import { Meta } from '@storybook/react';

import { Info } from './Info';

export default {
  title: 'Components/Common/Info',
  component: Info,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Info :</p>
    <br />
    <Info> Test</Info>
    <br />
  </div>
);
