import { Meta } from '@storybook/react';

import { Typography } from '../Typography';
import { LinkWithIcon } from './LinkWithIcon';

export default {
  title: 'Components/Common/LinkWithIcon',
  component: LinkWithIcon,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Basic LinkWithIcon :</p>
    <br />
    <LinkWithIcon href="https://snowpact.com" name="Snowpact" svgName="categoryVetements">
      <Typography>Test</Typography>
    </LinkWithIcon>
    <br />
  </div>
);
