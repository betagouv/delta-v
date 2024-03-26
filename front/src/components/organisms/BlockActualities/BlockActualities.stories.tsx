import { Meta } from '@storybook/react';

import { BlockActualities } from './BlockActualities';

export default {
  title: 'Components/Organisms/BlockActualities',
  component: BlockActualities,
} as Meta;

export const withVariant = (): JSX.Element => {
  return <BlockActualities />;
};
