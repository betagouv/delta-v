import { Meta } from '@storybook/react';

import { BlockHistoricDeclarations } from './BlockHistoricDeclarations';

export default {
  title: 'Components/Organisms/BlockHistoricDeclarations',
  component: BlockHistoricDeclarations,
} as Meta;

export const withVariant = (): JSX.Element => {
  return (
    <div className="p-3">
      <BlockHistoricDeclarations />
    </div>
  );
};
