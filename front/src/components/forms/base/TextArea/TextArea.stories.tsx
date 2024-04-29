import type { Meta } from '@storybook/react';

import { TextArea } from '.';

export default {
  title: 'Components/Forms/Base/TextArea',
  component: TextArea,
  args: {
    label: 'Lorem ipsum dolor sit amet',
    id: 'TextArea id',
    placeholder: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    helperText: 'Consectetur adipiscing elit',
    readOnly: false,
  },
} as Meta;

export const Default = (args: any) => (
  <TextArea
    label="Lorem ipsum dolor sit amet"
    id="TextArea id"
    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    helperText="Consectetur adipiscing elit"
    readOnly={false}
    {...args}
  />
);
