import { Meta } from '@storybook/react';

import { BackButton } from './BackButton';

export default {
  title: 'Components/Common/BackButton',
  component: BackButton,
} as Meta;

export const base = (): JSX.Element => (
  <div className="p-3">
    <BackButton />
    <br />
  </div>
);
