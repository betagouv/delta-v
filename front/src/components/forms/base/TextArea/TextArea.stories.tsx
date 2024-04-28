import type { Meta } from '@storybook/react';

import { TextArea } from './TextArea';

export default {
  title: 'Components/Forms/Base/TextArea',
  component: TextArea,
} as Meta;

export const Examples = () => (
  <div>
    <TextArea
      label="Titre"
      id="a"
      placeholder="Contenu non modifiable"
      helperText="Texte d'aide"
      readOnly
    ></TextArea>
    <TextArea
      label="Titre"
      id="a"
      placeholder="Contenu modifiable"
      helperText="Texte d'aide"
    ></TextArea>
  </div>
);
