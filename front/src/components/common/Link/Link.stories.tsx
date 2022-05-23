import { Meta } from '@storybook/react';

import { Typography } from '../Typography';
import { Link } from './Link';

export default {
  title: 'Components/Common/Link',
  component: Link,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Basic link :</p>
    <br />
    <Link href="https://snowpact.com">
      <Typography>Test</Typography>
    </Link>
    <br />
  </div>
);
