import { Meta } from '@storybook/react';

import { TextAreaContact } from './TextAreaContact';

export default {
  title: 'Components/Input/StandardInputs/TextAreaContact',
  component: TextAreaContact,
} as Meta;

export const base = (): JSX.Element => (
  <div>
    <TextAreaContact name="test" placeholder="Placeholder" />
  </div>
);
