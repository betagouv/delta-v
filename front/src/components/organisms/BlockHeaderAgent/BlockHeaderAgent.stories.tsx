import { useState } from 'react';

import { Meta } from '@storybook/react';

import { BlockHeaderAgent } from './BlockHeaderAgent';

export default {
  title: 'Components/Organisms/BlockHeaderAgent',
  component: BlockHeaderAgent,
} as Meta;

export const withVariant = (): JSX.Element => {
  const [value, setValue] = useState('');
  return (
    <div className="p-3">
      <p>Basic BlockHeaderAgent horizontal :</p>
      <br />
      <BlockHeaderAgent
        onChangeSearch={(searchValue) => setValue(searchValue)}
        onSearchAll={() => console.log('click')}
        searchValue={value}
      />
      <br />
    </div>
  );
};
