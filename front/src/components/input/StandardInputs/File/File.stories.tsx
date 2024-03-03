import { Meta } from '@storybook/react';

import { TextArea } from './File';

export default {
  title: 'Components/Input/StandardInputs/TextArea',
  component: TextArea,
} as Meta;

export const base = (): JSX.Element => (
  <div>
    <TextArea name="test" placeholder="Placeholder" />
  </div>
);
