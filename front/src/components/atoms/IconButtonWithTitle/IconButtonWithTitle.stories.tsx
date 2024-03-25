import { Meta } from '@storybook/react';

import { IconButtonWithTitle } from './IconButtonWithTitle';

export default {
  title: 'Components/Atoms/IconButtonWithTitle',
  component: IconButtonWithTitle,
} as Meta;

export const base = (): JSX.Element => (
  <div className="p-3">
    <IconButtonWithTitle
      title="Quittance"
      icon="chevron-left"
      onClick={() => console.log('click')}
    />
    <br />
  </div>
);
