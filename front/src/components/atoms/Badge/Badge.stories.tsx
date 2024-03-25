import { Meta } from '@storybook/react';

import { Badge } from './Badge';

export default {
  title: 'Components/Atoms/Badge',
  component: Badge,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Basic Badge horizontal :</p>
    <br />
    <Badge name="Ain" department="01" svgName="ain" fullWidth={true} />
    <br />
  </div>
);
