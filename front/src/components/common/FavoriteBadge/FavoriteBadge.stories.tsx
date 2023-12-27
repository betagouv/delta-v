import { Meta } from '@storybook/react';

import { FavoriteBadge } from './FavoriteBadge';

export default {
  title: 'Components/Common/FavoriteBadge',
  component: FavoriteBadge,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Basic FavoriteBadge horizontal :</p>
    <br />
    <FavoriteBadge name="Ain" department="01" svgName="ain" fullWidth={true} />
    <br />
  </div>
);
