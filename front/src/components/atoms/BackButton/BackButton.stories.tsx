import { Meta } from '@storybook/react';

import { BackButton } from './BackButton';

export default {
  title: 'Components/Atoms/BackButton',
  component: BackButton,
} as Meta;

export const base = (): JSX.Element => (
  <div className="p-3">
    <BackButton />
    <br />
  </div>
);
