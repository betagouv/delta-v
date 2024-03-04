import { Meta } from '@storybook/react';

import { File } from './File';

export default {
  title: 'Components/Input/StandardInputs/File',
  component: File,
} as Meta;

export const base = (): JSX.Element => (
  <div>
    <File name="test" />
  </div>
);
