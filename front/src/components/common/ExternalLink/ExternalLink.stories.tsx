import { Meta } from '@storybook/react';

import { Typography } from '../Typography';
import { ExternalLink } from './ExternalLink';

export default {
  title: 'Components/Common/ExternalLink',
  component: ExternalLink,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Basic link :</p>
    <br />
    <ExternalLink href="https://snowpact.com">
      <Typography>Test</Typography>
    </ExternalLink>
    <br />
  </div>
);
