import { Meta } from '@storybook/react';

import { TextLink } from './TextLink';

export default {
  title: 'Components/Common/TextLink',
  component: TextLink,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <br />
    <TextLink to="https://snowpact.com">Simple text</TextLink>
    <br />
    <TextLink href="https://snowpact.com" underline>
      Simple text - underline
    </TextLink>
    <br />
    <TextLink href="https://snowpact.com" bold>
      Simple text - bold
    </TextLink>
    <br />
    <TextLink href="https://snowpact.com" withArrow>
      Simple text - with arrow
    </TextLink>
    <br />
  </div>
);
